import React, { useEffect, useState, memo, useCallback, useRef } from 'react';
import { Button, Input, Modal, Table, Form, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Block from '../components/Block'
import { member, spend, idb } from '../db/db'
import '../styles/member.less'
import UpdateMember from '../components/member/UpdateMember';
import UpdateSpend from '../components/member/UpdateSpend';
import SpendList from '../components/member/SpendList';
import dayjs from 'dayjs';
const { Search } = Input;


const spendListObject = {};

const sortedById = (a, b) => {
  return b.id - a.id;
}

const Member = memo((props) => {

  // const [db, setDb] = useState(null);
  const [list, setList] = useState([]);
  const [memberVisible, setMemberVisible] = useState(false);
  const memberRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [totalMountVisible, setTotalMountVisible] = useState(false)
  const [totalMount, setTotalMount] = useState(0)

  const [spendVisible, setSpendVisible] = useState(false);
  const spendRef = useRef(null)

  const [spendListData, setSpendListData] = useState([])
  const [spendListVisible, setSpendListVisible] = useState(false)

  const [spendPhone, setSpendPhone] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0)
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = useCallback(async (value) => {
    setLoading(true)
    if (value === undefined) {
      value = searchValue;
    } else {
      setSearchValue(value)
    }
    let list = []
    if (value) {
      list = await member.getItems(value, {
        index: ['name', 'phone'], fuzzy: true,
        sorted: sortedById
      })
    } else {
      list = await member.getItems(null, {
        sorted: sortedById
      }) || [];
    }

    await getSpendList({ list })
  }, [searchValue]);

  const getSpendList = useCallback(async ({ list } = {}) => {

    await Promise.all(list.map(async item => {
      const v = await spend.getItems(item.phone, {
        index: 'phone', sorted: sortedById
      })
      // 以phone的维度缓存spendList
      spendListObject[item.phone] = v;
      return v;
    }))
    console.log('spendListObject:', spendListObject)

    const tmpList = list.map(item => {
      return {
        ...item,
        spendTotal: spendListObject[item.phone].length,
        money: spendListObject[item.phone].reduce((acc, curr) => {
          acc = +acc + +curr.money;
          return acc;
        }, 0)
      }
    })

    const _totalMount = tmpList.reduce((acc, curr) => {
      acc = +acc + +curr.money;
      return acc;
    }, 0)
    setTotalMount(_totalMount)
    setLoading(false)
    setCurrentPage(1);
    setTotal(tmpList.length);
    setList(tmpList)


  }, [])


  useEffect(() => {
    init()
  }, [])

  async function init() {
    // await member.createTable();
    // await spend.createTable();
    await idb.createDatabase();
    handleSearch()
  }


  const seeHistory = useCallback((phone) => {
    setSpendPhone(phone);
    setSpendListVisible(true);
    setSpendListData(spendListObject[phone])
  });


  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '姓名'
    },
    {
      key: 'phone',
      dataIndex: 'phone',
      title: '电话'
    },
    {
      key: 'money',
      dataIndex: 'money',
      title: '消费总金额',
      render: (v) => `${v}元`
    },
    {
      key: 'spendTotal',
      dataIndex: 'spendTotal',
      title: '消费次数',
      render: (v) => `${v}次`
    },
    // {
    //   key: 'score',
    //   dataIndex: 'score',
    //   title: '积分',
    //   render: (v) => {
    //     return v || 0
    //   }
    // },
    {
      key: 'spending',
      dataIndex: 'spending',
      title: '消费记录',
      render: (v, row) => {
        return (
          <>
            <Button type="link" onClick={() => seeHistory(row.phone)}>查看</Button>
          </>
        )
      }
    },
    {
      key: 'addDate',
      dataIndex: 'addDate',
      title: '添加日期',
      render: (v) => dayjs(v).format('YYYY-MM-DD HH:mm')
    }, {
      key: 'editDate',
      dataIndex: 'editDate',
      title: '修改日期',
      render: (v) => dayjs(v).format('YYYY-MM-DD HH:mm')
    },
    {
      key: 'oper',
      dataIndex: 'oper',
      title: '操作',
      render: (v, row) => {

        return (
          <div className="oper">
            <a onClick={() => {
              memberRef.current.editMember(row)
            }
            }>修改</a>
            {/* <a onClick={() => delMember(row)}>删除</a> */}
            <a onClick={() => {
              spendRef.current.addSpend({ phone: row.phone });
            }}>添加消费</a>
          </div>
        )
      }
    }
  ]

  return (
    <div>
      <Search
        placeholder="查找会员"
        size="large"
        allowClear={true}
        onSearch={handleSearch}
        style={{ width: '100%' }}
      ></Search>
      <Block>
        <Row align="middle">
          <Col span={18}>
            <Button type="primary" onClick={() => memberRef.current.addMember()}>添加会员</Button>
          </Col>
          <Col span={6}>
            <div style={{ textAlign: 'right', fontWeight: 'bold' }} onClick={() => setTotalMountVisible(!totalMountVisible)}>总收入
              {totalMountVisible && <span>: {totalMount}元</span>}
            </div>
          </Col>
        </Row>
      </Block>
      <Modal
        visible={spendVisible}
      >

      </Modal>
      <UpdateMember
        ref={memberRef}
        memberVisible={memberVisible}
        setMemberVisible={setMemberVisible}
        handleSearch={handleSearch}
      />
      <UpdateSpend
        ref={spendRef}
        spendVisible={spendVisible}
        setSpendVisible={setSpendVisible}
        handleSearch={async () => {
          await handleSearch();
          setSpendListData(spendListObject[spendPhone])
        }}
      />
      <SpendList
        spendListData={spendListData}
        setSpendListData={setSpendListData}
        spendListVisible={spendListVisible}
        setSpendListVisible={setSpendListVisible}
        spendRef={spendRef}
      ></SpendList>
      <Block>
        <Table
          loading={loading}
          rowKey="id"
          dataSource={list}
          columns={columns}
          pagination={{
            total,
            showTotal: total => `总共${total}条`,
            current: currentPage,
            onChange: page => {
              setCurrentPage(page)
            }
          }}
        />
      </Block>
    </div>
  )
});

export default Member;