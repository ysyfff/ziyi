import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Button, Input, Modal, Table, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { member, spend } from '../../db/db'
import dayjs from 'dayjs'


const SpendList = (props) => {
  const { spendListVisible, setSpendListVisible, spendRef, spendListData, setSpendListData } = props;

  const [totalMount, setTotalMount] = useState(0)

  useEffect(() => {
    const v = spendListData?.reduce((acc, cur) => {
      acc = +acc + +cur.money
      return acc
    }, 0)
    // alert(v)
    setTotalMount(v)
  }, [JSON.stringify(spendListData)])

  const closeSpendList = () => {
    setSpendListData([]);
    setSpendListVisible(false)
  };

  const editSpend = ({ row } = {}) => {
    spendRef.current.editSpend({ row })
  };

  const columns = [
    {
      key: 'desc',
      dataIndex: 'desc',
      title: '描述'
    }, {
      key: 'money',
      dataIndex: 'money',
      title: '购物金额',
      render: (v) => `${v}元`
    }, {
      key: 'addDate',
      dataIndex: 'addDate',
      title: '添加日期',
      render: (v) => dayjs(v).format('YYYY-MM-DD HH:mm')
    }, {
      key: 'editDate',
      dataIndex: 'editDate',
      title: '修改日期',
      render: (v) => dayjs(v).format('YYYY-MM-DD HH:mm')
    }, {
      key: 'oper',
      title: '操作',
      render: (v, row) => {
        return (
          <>
            <a onClick={() => editSpend({ row })}>修改</a>
          </>
        )
      }
    }
  ]

  return (
    <>
      <Modal
        visible={spendListVisible}
        title={'查看购物记录'}
        okText="确定"
        cancelText="取消"
        width={700}
        onOk={closeSpendList}
        onCancel={closeSpendList}
      >
        共消费：{totalMount}元
        <Table
          rowKey="id"
          dataSource={spendListData}
          columns={columns}
          pagination={{
            showTotal: total => `总共${total}条`,
          }}
        ></Table>
      </Modal>

    </>
  )
}

export default SpendList;
