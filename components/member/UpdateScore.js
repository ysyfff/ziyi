import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Button, Input, Modal, Table, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { score } from '../../db/db'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const UpdateScore = forwardRef((props, ref) => {

  useImperativeHandle(
    ref,
    () => ({
      addScore,
      editScore,
      delScore
    })
  )

  const { scoreVisible, setScoreVisible, handleSearch } = props;
  const [mode, setMode] = useState('add');
  const [editId, setEditId] = useState('');
  const [addKey, setAddKey] = useState(''); //添加的主键，主键是phone的值

  const [form] = Form.useForm();

  const closeScore = () => {
    setScoreVisible(false);
    form.resetFields();
  };

  const addScore = async ({ phone } = {}) => {
    setScoreVisible(true)
    setMode('add')
    setAddKey(phone)
  }

  const editScore = async ({ row } = {}) => {
    setMode('edit');
    setEditId(row.id)
    setScoreVisible(true)
    setAddKey(row.phone)

    form.setFieldsValue({
      desc: row.desc,
      money: row.money
    })
  }

  const saveScore = async () => {
    form.validateFields().then(async values => {
      if (values) {
        closeScore()

        if (mode === 'add') {
          await score.setItems({
            ...values,
            phone: addKey,
            addDate: new Date(),
            editDate: new Date()
          })
        } else {
          await score.editItems(editId, {
            ...values,
            phone: addKey,
            editDate: new Date()
          })
        }

        handleSearch()
      }
    })
  }

  const delScore = async (row) => {
    await score.delItems(row.id);
    handleSearch();
  }


  return (
    <Modal
      visible={scoreVisible}
      title={mode === 'add' ? "添加积分兑换" : '修改积分兑换'}
      okText="确定"
      cancelText="取消"
      onOk={saveScore}
      onCancel={closeScore}
    >
      <Form
        {...layout}
        name="score"
        form={form}
      >
        <Form.Item
          label="描述"
          name="desc"
          rules={[{ required: false, message: '请输入兑换内容' }]}
        >
          <Input placeholder="请输入兑换内容" />
        </Form.Item>
        <Form.Item
          label="使用积分"
          name="money"
          rules={[{ required: true, message: '请输入积分' },
          // { type: 'number', message: '只能输入数字' },
          { pattern: /^\d+(\.\d+)?$/g, message: '只能输入数字' }
          ]}
        >
          <Input placeholder="请输入积分" />
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default UpdateScore;