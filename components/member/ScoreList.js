import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Button, Input, Modal, Table, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { member } from '../../db/db'
import dayjs from 'dayjs'


const ScoreList = (props) => {
  const { scoreListVisible, setScoreListVisible, scoreRef, scoreListData, setScoreListData } = props;

  const closeScoreList = () => {
    setScoreListData([]);
    setScoreListVisible(false)
  };

  console.log(scoreListData, '9999')
  const editScore = ({ row } = {}) => {
    scoreRef.current.editScore({ row })
  };

  const columns = [
    {
      key: 'desc',
      dataIndex: 'desc',
      title: '描述'
    }, {
      key: 'money',
      dataIndex: 'money',
      title: '兑换金额',
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
            <a onClick={() => editScore({ row })}>修改</a>
          </>
        )
      }
    }
  ]

  return (
    <>
      <Modal
        visible={scoreListVisible}
        title={'查看兑换记录'}
        okText="确定"
        cancelText="取消"
        width={700}
        onOk={closeScoreList}
        onCancel={closeScoreList}
      >
        <Table
          rowKey="id"
          dataSource={scoreListData}
          columns={columns}
          pagination={{
            showTotal: total => `总共${total}条`,
          }}
        ></Table>
      </Modal>

    </>
  )
}

export default ScoreList;
