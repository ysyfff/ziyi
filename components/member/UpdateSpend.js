import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Button, Input, Modal, Table, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { spend } from '../../db/db'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const UpdateSpend = forwardRef((props, ref) => {

  useImperativeHandle(
    ref,
    () => ({
      addSpend,
      editSpend,
      delSpend
    })
  )

  const { spendVisible, setSpendVisible, handleSearch } = props;
  const [mode, setMode] = useState('add');
  const [editId, setEditId] = useState('');
  const [addKey, setAddKey] = useState(''); //添加的主键，主键是phone的值

  const [form] = Form.useForm();

  const closeSpend = useCallback(() => {
    setSpendVisible(false);
    form.resetFields();
  }, []);

  const addSpend = useCallback(async ({phone}={}) => {
    console.log(phone, 'gg')
    setSpendVisible(true)
    setMode('add')
    setAddKey(phone)
  },[addKey]);

  const editSpend = useCallback(async ({row}={}) => {
    setMode('edit');
    setEditId(row.id)
    setSpendVisible(true)
    setAddKey(row.phone)

    form.setFieldsValue({
      desc: row.desc,
      money: row.money
    })
  }, [])

  const saveSpend = useCallback(async () => {
    form.validateFields().then(async values => {
      if (values) {
        closeSpend()

        if (mode === 'add') {
          await spend.setItems({
            ...values,
            phone: addKey,
            addDate: new Date(),
            editDate: new Date()
          })
        } else {
          await spend.editItems(editId, {
            ...values,
            phone: addKey,
            editDate: new Date()
          })
        }

        handleSearch({noResetPage: true})
      }
    })
  }, [editId, addKey]);

  const delSpend = useCallback(async (row) => {
    await spend.delItems(row.id);
    handleSearch({ noResetPage: true });
  }, []);


  return (
    <Modal
      visible={spendVisible}
      title={mode === 'add' ? "添加购物" : '修改购物'}
      okText="确定"
      cancelText="取消"
      onOk={saveSpend}
      onCancel={closeSpend}
    >
      <Form
        {...layout}
        name="spend"
        form={form}
      >
        <Form.Item
          label="描述"
          name="desc"
          rules={[{ required: false, message: '请输入购物内容' }]}
        >
          <Input placeholder="请输入购物内容" />
        </Form.Item>
        <Form.Item
          label="购物金额"
          name="money"
          rules={[{ required: true, message: '请输入购物金额' },
            // { type: 'number', message: '只能输入数字' },
            { pattern: /^\d+(\.\d+)?$/g, message: '只能输入数字' }
          ]}
        >
          <Input placeholder="请输入购物金额" />
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default UpdateSpend;