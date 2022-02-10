import React, { useEffect, useState } from 'react'
import { Table, Modal, Form, Input, Button, message } from 'antd'
import { stock, idb } from '../db/db'
import tGains from 'tsnow.npm/lib/tGains';
import buyCal from 'tsnow.npm/lib/buyCal';

const fixed0 = v => Number(v).toFixed(0);
const fixed2 = v => Number(v).toFixed(2);
const red = v => <span style={{ color: 'red' }}>{v}</span>;

const ListName = 'stock_yqx'
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Stock = props=>{

  const [data, setData] = useState([])
  const [visible, setVisible] = useState(false)
  const [editId, setEditId] = useState(null)
  const [mode, setMode]= useState('add')
  const [form] = Form.useForm();
  const [tgForm] = Form.useForm();
  const [bcForm] = Form.useForm();

  const [tgVisible, setTgVisible] = useState(false)
  const [bcVisible, setBcVisible] = useState(false)

  const [tGainResult, setTGainsResult] = useState([])
  const [buyCalResult, setBuyCalResult] = useState([])


  useEffect(() => {
    init()
  }, [])

  // 初始化数据库
  async function init() {
    await idb.createDatabase();
    getStock()
  }

  // 填充列表
  const getStock =async ()=>{
    const rst = await stock.getItems()
    
    setData(rst)
  }

  // 添加数据
  const addStock = ()=>{
    form.validateFields().then(async values=>{
      
      if(values){
        
        if(editId!=null){
          await stock.editItems(editId, values)
          message.success('编辑成功')
        }else{
          await stock.setItems(values)
          message.success('添加成功')
        }
        setVisible(false)
        getStock()
      }
    })
  }
  const closeStock = ()=>{
    setVisible(false)
  }

  // 编辑数据
  const editStock = (data)=>{
    setVisible(true)
    form.setFieldsValue({...data})
  }


  const columns = [
    {
    title: '名称',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: '均价',
    key: 'avgPrice',
    dataIndex: 'avgPrice'
  },
  {
    title: '数量',
    key: 'number',
    dataIndex: 'number'
  },
  {
    title: '成本',
    key: 'total',
    dataIndex: 'total',
    render: (v, row)=>{
      return Math.floor(row.avgPrice*row.number)

    }
  },
  {
    title: '操作',
    key: 'operation',
    dataIndex: 'operation',
    width: 200,
    render: (v, row)=>{
      console.log(row, 'gg')
      return (
        <div>
          <a style={{paddingRight: 8}} href='javascript: void 0' onClick={()=>{
            setBcVisible(true)
            setTimeout(()=>{
              bcForm.setFieldsValue({
                cost: row.avgPrice,
                number: row.number,
              })
            })
          }}>买入</a>
          <a style={{paddingRight: 8}} href='javascript: void 0' onClick={()=>{
            setTgVisible(true)
            setTimeout(()=>{
              tgForm.setFieldsValue({
                buy: row.avgPrice,
                number: row.number,
              })
            })
          }}>卖出</a>
          <a style={{paddingRight: 8}} href='javascript: void 0' onClick={()=>{
            setEditId(row.id)
            editStock(row)
            }}>编辑</a>
          <a href='javascript: void 0'>记录</a>
        </div>
      )
    }
  }
]

    const columnsTGains = [{ title: '卖总价', dataIndex: 'saleTotalFee', key: 'saleTotalFee', render: fixed0 },
        { title: '买总价', dataIndex: 'buyTotalFee', key: 'buyTotalFee', render: fixed0 },
        { title: '买费用', dataIndex: 'buyFee', key: 'buyFee', render: fixed2 },
        { title: '卖费用', dataIndex: 'saleFee', key: 'saleFee', render: fixed2 },
        { title: '总收益', dataIndex: 'gains', key: 'gains', render: v => red(fixed2(v)) },
        { title: '收益率', dataIndex: 'percentage', key: 'percentage', render: (v) => red(fixed2(v) + '%') },
    ];

    const columnsBuyCal = [
        { title: '买入后', dataIndex: 'newAvg', key: 'newAvg', render: red },
        { title: '买入前', dataIndex: 'avg', key: 'avg' },
        { title: '涨幅', dataIndex: 'newAvgToAvg', key: 'newAvgToAvg', render: (v, row) => (<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {red(v + '%')}
            <div style={{ fontSize: 12, transform: 'scale(0.8)', marginTop: -6 }}>{row.newAvg}→{row.avg}</div>
        </div>) },
        { title: '增数量', dataIndex: 'addedNum', key: 'addedNum', render: (v) => red(fixed0(v)) },
        { title: '总数量', dataIndex: 'totalNum', key: 'totalNum' },

    ];

  return (
    <div style={{margin: 10}}>
      <div style={{margin: 10, marginRight: 0,display: 'flex', justifyContent: 'flex-end'}}>

        <Button type="primary" onClick={()=>{setVisible(true); setEditId(null)}}>添加</Button>
      </div>
      <Table dataSource={data} columns={columns}/>

      {/* 添加股票 */}
      <Modal
        visible={visible}
        title={mode === 'add' ? "添加股票" : '修改股票'}
        okText="确定"
        cancelText="取消"
        onOk={addStock}
        onCancel={closeStock}
      >
      <Form
        {...layout}
        name="member"
        form={form}
      >
        <Form.Item
          label="股票名"
          name="name"
          rules={[{ required: true, message: '请输入股票名' }]}
        >
          <Input placeholder="请输入股票名" />
        </Form.Item>
        <Form.Item
          label="均价"
          name="avgPrice"
          rules={[{ required: true, message: '请输入会均价' },
            ]}
        >
          <Input placeholder="请输入均价" />
        </Form.Item>
        <Form.Item
            label="数量"
            name="number"
            rules={[{ required: true, message: '请输入数量' }]}
          >
            <Input placeholder="请输入数量" />
          </Form.Item>
      </Form>
      </Modal>

      {/* 卖操作计算 */}
      <Modal
        visible={tgVisible}
        title="收益计算"
        onCancel={()=>setTgVisible(false)}
        onOk={()=>setTgVisible(false)}
      >
        <Form
          name='tgForm'
          form={tgForm}
          onValuesChange={(values, allValues)=>{
            if(values.sale){
              setTGainsResult([tGains(allValues)]);
              
            }
          }}
        >
          <Form.Item label='购买价格' name='buy'>
            <Input   disabled/>
          </Form.Item>
          <Form.Item label='购买数量' name='number'>
            <Input  disabled />
          </Form.Item>
          <Form.Item label='卖出价格' name='sale'>
            <Input placeholder='请输入卖出价格'/>
          </Form.Item>

        </Form>
        <Table columns={columnsTGains} dataSource={tGainResult} bordered={true} size="small" pagination={false} />
      </Modal>
      {/* 买操作计算 */}
      <Modal
        visible={bcVisible}
        onOk={null}
        title='购买成本计算'
        onCancel={()=>setBcVisible(false)}
        onOk={()=>setBcVisible(false) }
      >
        <Form
          name='bgForm'
          form={bcForm}
          onValuesChange={(values, allValues)=>{
            if(values.now && allValues.money || values.money && allValues.now){
              setBuyCalResult(
                [buyCal(allValues)]
              )
            }
          }}
        >
          <Form.Item label='平均成本' name='cost'>
            <Input   disabled/>
          </Form.Item>
          <Form.Item label='购买数量' name='number'>
            <Input  disabled />
          </Form.Item>
          <Form.Item label='现在价格' name='now'>
            <Input placeholder='请输入现在价格'/>
          </Form.Item>
          <Form.Item label='购买金额' name='money'>
            <Input placeholder='请输入购买金额'/>
          </Form.Item>
        </Form>
        <Table columns={columnsBuyCal} dataSource={buyCalResult} bordered={true} size="small" pagination={false} />
      </Modal>
    </div>
  )
}

export default Stock;