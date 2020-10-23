import { openDB } from 'idb';

export default class IDB {
  constructor({ name, version } = {}) {
    this.db = null;
    this.cacheData = null;
    this.name = name;
    this.version = version;
    this.stores = [];
  }

  // 先存储，待创建完成后，setItems
  transfer = async ({ db, storeName } = {}) => {
    // 如果存在，先读取数据，内存缓存，待创建完成后，恢复数据

    this.cacheData = await this.getItems({ storeName, db });
    db.deleteObjectStore(storeName);
  }

  // 从transfer中恢复数据
  recovery = async ({ db, storeName } = {}) => {

    await this.setItems({ storeName, values: this.cacheData, db });
  }


  addStore = ({ storeName, keepData, updated, createStore } = {}) => {
    this.stores.push({ storeName, keepData, updated, createStore });
  }

  // 判断store是否存在
  existStore = ({ db, storeName } = {}) => {
    db = db || this.db
    if (db) {
      return db.objectStoreNames.contains(storeName)
    }
    return false;
  }

  // 创建表格
  createDatabase = async () => {
    this.db = await openDB(this.name, this.version, {
      upgrade: async (db, oldVersion, newVersion, transaction) => {
        await Promise.all(this.stores.map(async obj => {
          const { storeName, keepData, updated, createStore } = obj;

          if (this.existStore({ db, storeName })) {
            // 如果更新版本需要updated，则更新之，否则do nothing
            if (updated) {
              if (keepData) { // 如果保留数据，转移数据，创建store，回复数据
                // 这里一定要用oldVersion打开oldDB，来读取之前的数据
                const oldDb = await openDB(this.name, oldVersion)
                await this.transfer({ db: oldDb, storeName });
                createStore({ db });
                await this.recovery({ db, storeName });
              } else { // 如果不保存数据，直接删除
                db.deleteObjectStore(storeName);
                createStore({ db });
              }
            }
          } else {
            createStore({ db })
          }
        }));
      }
    })
  }

  setItems = async ({ storeName, values, db } = {}) => {
    db = db || this.db;

    if (db && this.existStore({ db, storeName })) {

      if (Object.prototype.toString.call(values) === '[object Object]') {
        // 单个增加
        db.add(storeName, values)
      } else {
        // 多个增加
        const tx = db.transaction(storeName, 'readwrite');
        const arr = values.map(item => {
          return tx.store.add(item);
        })
        arr.push(tx.done)
        await Promise.all(arr)
      }
    }
  }

  editItems = async ({ key, values, db, storeName } = {}) => {
    db = db || this.db;

    if (db && this.existStore({ db, storeName })) {//判断是否存在store
      const store = db.transaction(storeName, 'readwrite').objectStore(storeName);
      const _data = await store.get(key)
      Object.keys(values).map(k => {
        if (_data[k] !== values[k]) {
          _data[k] = values[k]
        }
      })
      store.put(_data)
    }
  }

  /**
   * 
   * @param {index} 注意index不能是kepPath的值，否则会抛错
   */
  getFromIndex = async ({ store, key, index, fuzzy } = {}) => {
    const _index = store.index(index);
    // _index.get(key) 默认只能获取第一个元素，如果有多个元素需要使用cursor
    // return await _index.get(key);

    let cursor;

    cursor = await _index.openCursor();
    const _values = [];
    while (cursor) {
      if (key) {
        if (fuzzy) {
          if (cursor.value[index].indexOf(key) > -1) {
            _values.push(cursor.value);
          }
        } else {
          if (cursor.value[index] === key) {
            _values.push(cursor.value);
          }
        }
      } else {
        _values.push(cursor.value)
      }

      cursor = await cursor.continue()
    }
    return _values
  }
  // 返回数组的结构
  getItems = async ({ storeName, key, db, index, fuzzy, sorted } = {}) => {
    db = db || this.db;

    if (db && this.existStore({ db, storeName })) {//判断是否存在store
      const store = db.transaction(storeName).objectStore(storeName);
      let rst;
      if (key) {
        if (index) {
          let _values = []
          if (Object.prototype.toString.call(index) === '[object Array]') {
            const __values = await Promise.all(index.map(async item => {
              return await this.getFromIndex({ store, key, index: item, fuzzy })
            }))
            _values = __values.flat()
          } else {
            _values = await this.getFromIndex({ store, key, index, fuzzy })
          }
          rst = _values;
        } else {
          rst = [await store.get(key)]
        }
      } else {
        rst = await db.getAll(storeName)
      }
      if(sorted && typeof sorted === 'function'){
        rst.sort(sorted)
      }
      return rst;
    }
  }

  delItems = async ({ storeName, key, db } = {}) => {
    db = db || this.db;

    if (db && this.existStore({ db, storeName })) {//判断是否存在store
      const store = db.transaction(storeName, 'readwrite').objectStore(storeName);
      await store.delete(key);
    }
  }

  getStoreInstance = ({ storeName } = {}) => {
    return {
      setItems: async (values) => {
        return await this.setItems({ storeName, values })
      },
      getItems: async (key, { index, fuzzy = false, sorted } = {}) => {
        return await this.getItems({ storeName, key, index, fuzzy, sorted })
      },
      editItems: async (key, values) => {
        return await this.editItems({ key, storeName, values })
      },
      delItems: async (key) => {
        return await this.delItems({ key, storeName })
      }
    }
  }
}

const idb = new IDB({ version: 23, name: 'ziyi' })

idb.addStore({
  storeName: 'member',
  keepData: true,
  updated: false,
  createStore: ({ db }) => {

    const store = db.createObjectStore('member', {
      keyPath: 'id',
      autoIncrement: true
    });
    store.createIndex('phone', 'phone', { unique: true });
    store.createIndex('name', 'name');
    store.createIndex('score', 'score');
    store.createIndex('hisotry', 'history');
  }
});

idb.addStore({
  storeName: 'spend',
  updated: false,
  createStore: ({ db }) => {
    const store = db.createObjectStore('spend', {
      keyPath: 'id',
      autoIncrement: true
    })

    store.createIndex('phone', 'phone');
    store.createIndex('desc', 'desc');
  }
});



const member = idb.getStoreInstance({ storeName: 'member' })
const spend = idb.getStoreInstance({ storeName: 'spend' })

export {
  member, spend, idb
}