import React, { useEffect, useState } from 'react';
import nextSEO, { NextSeo } from 'next-seo';
import { Card, Divider, Input, Row, Col, Table } from 'antd';
import tGains from 'tsnow.npm/lib/tGains';
import buyCal from 'tsnow.npm/lib/buyCal';

const fixed0 = v => Number(v).toFixed(0);
const fixed2 = v => Number(v).toFixed(2);
const red = v => <span style={{ color: 'red' }}>{v}</span>;

const Cal = props => {
    const [buy, buySet] = useState('');
    const [sale, saleSet] = useState('');
    const [number, numberSet] = useState('');
    const [tGainResult, tGainResultSet] = useState([]);
    const [percentage, percentageSet] = useState('');

    const [cost, costSet] = useState('');
    const [now, nowSet] = useState('');
    const [money, moneySet] = useState('');
    const [number2, number2Set] = useState('');
    const [buyCalResult, buyCalResultSet] = useState([]);

    useEffect(() => {
        if (buy && sale && number) {
            console.log(tGains({ buy, sale, number }));
            tGainResultSet([tGains({ buy, sale, number })]);
        }
        if (buy && sale) {
            percentageSet(((sale - buy) / buy * 100).toFixed(2) + '%');
        }
    }, [buy, sale, number]);

    useEffect(() => {
        if (cost && now && money && number2) {
            console.log(buyCal({ cost, now, money, number: number2 }));
            buyCalResultSet([buyCal({ cost, now, money, number: number2 })]);
        }
    }, [cost, now, money, number2]);

    const columns = [{ title: '卖总价', dataIndex: 'saleTotalFee', key: 'saleTotalFee', render: fixed0 },
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
        <div style={{ padding: 20, paddingTop: '7vh' }}>
            <NextSeo title="股票计算"/>

            <Card title="做T收益计算">
                <Row gutter={[8, 8]} align="middle">
                    <Col>购买价格</Col>
                    <Col><Input value={buy} onChange={e => buySet(e.target.value)} placeholder="购买价格"/> </Col>
                </Row>
                <Row gutter={[8, 8]} align="middle">
                    <Col>购买数量</Col>
                    <Col><Input value={number} onChange={e => numberSet(e.target.value)} placeholder="购买数量"/></Col>
                </Row>
                <Row gutter={[8, 8]} align="middle">
                    <Col>卖出价格</Col>
                    <Col><Input value={sale} onChange={e => saleSet(e.target.value)} placeholder="卖出价格"/></Col>
                </Row>
                <div style={{ height: 20 }} />

                <Table pagination={false} dataSource={tGainResult} columns={columns} bordered={true} size="small" />
            </Card>
            <div style={{ height: 20 }} />
            <Card title="购买成本计算">
                <Row gutter={[8, 8]} align="middle">
                    <Col>平均成本</Col>
                    <Col><Input value={cost} onChange={e => costSet(e.target.value)} placeholder="平均成本"/></Col>
                </Row>
                <Row gutter={[8, 8]} align="middle">
                    <Col>购买数量</Col>
                    <Col><Input value={number2} onChange={e => number2Set(e.target.value)} placeholder="购买数量"/></Col>
                </Row>
                <Row gutter={[8, 8]} align="middle">
                    <Col>现在价格</Col>
                    <Col><Input value={now} onChange={e => nowSet(e.target.value)} placeholder="现在价格"/></Col>
                </Row>
                <Row gutter={[8, 8]} align="middle">
                    <Col>购买金额</Col>
                    <Col><Input value={money} onChange={e => moneySet(e.target.value)} placeholder="购买金额"/></Col>
                </Row>
                <div style={{ height: 20 }} />
                <Table  dataSource={buyCalResult} columns={columnsBuyCal} bordered={true} size="small" pagination={false} />
                {/* <div>{buyCalResult.map((item, i)=>{
                    return (<div key={i.toString()}>{item}</div>)
                })}</div> */}
            </Card>
            <div style={{ height: 60 }} />
            <a href="http://npmjs.com/package/tsnow.npm" target="_blank">NPM包版本</a>
        </div>
    );
};

export default Cal;