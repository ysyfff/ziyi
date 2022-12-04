## 使用 antd

- <https://dev.to/burhanuday/using-ant-design-with-nextjs-custom-variables-for-ant-design-57m5>

## idb

- **database** 数据库，里面存放了 object store
- **object store** 类似 mysql 的 table
- **index** object store 的一种，用来组织数据，通过 name，age 等来获取 object store
- **transaction** 事务，一个或多个操作的 wrapper，保证数据库的完整性
- **cursor** 遍历多条就的机制

## Vercel

- https://vercel.com/dashboard

## 网站内容包含

- [会员][1]
- [钟表][2]

[1]: https://ziyi.vercel.app
[2]: https://ziyi.vercel.app/clock

## 最坑的坑

- 添加的時候偶尔会覆盖掉之前的数据，百思不得其解，认为是 indexedDB 的 bug
  - 最终发现是 useCallback 的问题，在修改完一条数据后，`setMode('edit')`下次新增的时候虽然执行了`setMode('add')`，但是由于 useCallback 中并无`[mode]`设置，导致一直认为 mode 是 edit
  - 但是呢，因祸得福，弄了 nas，docker,centos,mongodb 等学到了不少

## Log

- update body.overflow auto

## 发布

```js
yarn ver // 更新service-worker的版本
vercel
vercel --prod
```
