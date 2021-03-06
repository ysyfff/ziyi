import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Button, Input, Modal, Table, Form, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { member } from '../../db/db'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const UpdateMember = forwardRef((props, ref) => {

  useImperativeHandle(
    ref,
    ()=>({
      addMember,
      editMember,
      delMember
    })
  )

  const { memberVisible, setMemberVisible, handleSearch} = props;
  const [mode, setMode] = useState('add')
  const [editId, setEditId] = useState('');

  const [form] = Form.useForm();

  const closeMember = () => {
    setMemberVisible(false);
    form.resetFields();
  };

  const addMember = async () => {
    setMemberVisible(true)
    setMode('add')
  };

  const editMember = async (row) => {
    setMode('edit');
    setEditId(row.id)
    setMemberVisible(true)

    form.setFieldsValue({
      name: row.name,
      phone: row.phone
    })
  }

  const saveMember = async () => {
    form.validateFields().then(async values => {
      if (values) {
        closeMember()
        if (mode === 'add') {
          const v = await member.getItems(values.phone, {index: ['phone']})
          if(v && v.length){
            message.info(`已经存在电话为${values.phone}的用户`)
          }else{
            await member.setItems({
              ...values,
              addDate: new Date(),
              editDate: new Date()
            })
            handleSearch()

          }
          
        } else {
          await member.editItems(editId, {
            ...values,
            editDate: new Date()
          })
          handleSearch()
        }

      }
    })
  };

  const delMember = async (row) => {
    await member.delItems(row.id);
    handleSearch();
  }


  return (
    <Modal
      visible={memberVisible}
      title={mode === 'add' ? "添加会员" : '修改会员'}
      okText="确定"
      cancelText="取消"
      onOk={saveMember}
      onCancel={closeMember}
    >
      <Form
        {...layout}
        name="member"
        form={form}
      >
        <Form.Item
          label="会员姓名"
          name="name"
          rules={[{ required: true, message: '请输入会员的真实姓名' }]}
        >
          <Input placeholder="请输入会员的真实姓名" />
        </Form.Item>
        <Form.Item
          label="会员手机号"
          name="phone"
          rules={[{ required: true, message: '请输入会员的真实电话' },
            { pattern: /^\d{11}$/g, message: '请输入11位电话号码' }]}
        >
          <Input placeholder="请输入会员的真实电话" />
        </Form.Item>
        {/* <Form.Item
            label="会员积分"
            name="score"
            rules={[{ required: true, message: '请输入会员的积分' }]}
          >
            <Input placeholder="请输入会员的积分" />
          </Form.Item> */}
      </Form>
    </Modal>
  )
})

export default UpdateMember;