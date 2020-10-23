import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Button, Input, Modal, Table, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { member } from '../../db/db'
import dayjs from 'dayjs'


const SpendList = (props) => {
  const { spendListVisible, setSpendListVisible, spendRef, spendListData, setSpendListData } = props;

  const closeSpendList = useCallback(() => {
    setSpendListData([]);
    setSpendListVisible(false)
  }, []);

  const editSpend = useCallback(({row}={}) => {
    spendRef.current.editSpend({row})
  }, []);

  const columns = [
    {
      key: 'desc',
      dataIndex: 'desc',
      title: '描述'
    }, {
      key: 'money',
      dataIndex: 'money',
      title: '消费金额',
      render: (v) => `${v}元`
    }, {
      key: 'addDate',
      dataIndex: 'addDate',
      title: '添加日期',
      render: (v)=>dayjs(v).format('YYYY-MM-DD HH:mm')
    }, {
      key: 'editDate',
      dataIndex: 'editDate',
      title: '修改日期',
      render: (v) => dayjs(v).format('YYYY-MM-DD HH:mm')
    }, {
      key: 'oper',
      render: (v, row) => {
        return (
          <>
            <a onClick={() => editSpend({row})}>修改</a>
          </>
        )
      }
    }
  ]

  return (
    <>
      <Modal
        visible={spendListVisible}
        title={'查看消费记录'}
        okText="确定"
        cancelText="取消"
        width={700}
        onOk={closeSpendList}
        onCancel={closeSpendList}
      >
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