import React, { useEffect, useState, Fragment } from 'react';
import { Row, Col, Radio, Input, Button, Modal, message, Table, Popconfirm } from 'antd';
import QR from 'qrcode'
import qs from 'qs';
import { NextSeo } from 'next-seo';

const storageKey = 'tsnow.records'
var config = {
    crn: {
        moduleName: 'CRNModuleName',
        type: 'CRNType',
        initialPage: 'initialPage'
    },
    qrn: {
        initialPage: 'initialPage',
        moduleName: 'QRNModuleName',
        type: 'QRNType',
    }
}

const get = () => {
    let v = [];
    try {
        v = JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch (e) {
        v = []
    }
    return v;
}

const saveArr = (ctx) => {
    localStorage.setItem(storageKey, JSON.stringify(ctx))
}

const append = (ctx) => {
    // 校验name唯一
    const v = get();
    if (v.find(item => item.name === ctx.name)) {
        message.error(`"${ctx.name}"已经存在，请另取它名！`)
    } else {
        saveArr(v.concat(ctx))
    }
}

const update = (ctx) => {
    const v = get()
    const index = v.findIndex(item => item.moduleName === ctx.moduleName);
    v[index] = { ...v[index], ...ctx };
    saveArr(v);
}


const del = (v) => {
    localStorage.setItem(storageKey, get().filter(item => item != v))
}

const Qrcode = props => {
    const v = (get() || []).find(item => item.moduleName === localStorage.getItem('tsnow.currentModuleName')) || {};
    console.log(v.port, 'ggg')

    const [channel, setChannel] = useState(v.channel || 'crn');
    const [locate, setLocate] = useState(v.locate || 'local');
    const [platform, setPlatform] = useState(v.platform || 'ios');
    const [ip, setIp] = useState(v.ip || '172.19.106.8');
    const [port, setPort] = useState(v.port || '5389');
    const [moduleName, setModuleName] = useState(v.moduleName || 'rn_chartered');
    const [initialPage, setInitialPage] = useState(v.initialPage || 'Test');
    const [pindao, setPindao] = useState(v.pindao || 'rn_chartered');
    const [cfg, setCfg] = useState(v.cfg || '_crn_config');
    const [recods, setRecords] = useState([]);
    const [name, setName] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(()=>{
        const params = qs.parse(window.location.search.split('?')[1]);
        setIp(params.ip);
        setModuleName(params.moduleName);
    }, [])

    const [url, setUrl] = useState('http://172.19.106.8:5389/index.android.bundle?CRNModuleName=rn_chartered&CRNType=1&initialPage=Test')

    useEffect(() => {
        const text = locate === 'local' ?
            `http://${ip}:${port}/index.${platform}.bundle?${config[channel].moduleName}=${moduleName}&${config[channel].type}=1&${config[channel].initialPage}=${initialPage}`
            :
            `/${moduleName}/${cfg}?${config[channel].moduleName}=${moduleName}&${config[channel].type}=1&${config[channel].initialPage}=${initialPage}`;
        console.log(v.port, '888')
        setUrl(text)
    }, [channel, locate, platform, ip, port, moduleName, initialPage])

    useEffect(() => {
        QR.toCanvas(document.getElementById('qrcode'), url)
        update({ channel, locate, platform, ip, port, moduleName, initialPage, pindao, cfg })
    }, [url])

    useEffect(() => {
        localStorage.setItem('tsnow.currentModuleName', moduleName)
    }, [moduleName])

    useEffect(() => {
        updateList()
    }, [])

    const updateList = () => {
        setRecords(get());
    }

    const saveToLocal = () => {
        setName('')
        setVisible(true)
    }

    const saveConfirm = () => {
        setVisible(false);
        saveContent()
        updateList()
    }

    const saveContent = () => {
        append({ name, channel, locate, platform, ip, port, moduleName, initialPage, pindao, cfg });
    }

    const fillData = (data) => {
        const { channel, locate, platform, ip, port, moduleName, initialPage, pindao, cfg } = data;
        setChannel(channel);
        setLocate(locate)
        setPlatform(platform)
        setIp(ip)
        setPort(port)
        setModuleName(moduleName)
        setInitialPage(initialPage)
        setPindao(pindao)
        setCfg(cfg)
    }

    const delRecord = (data) => {
        saveArr(get().filter(item => item.name !== data.name))
        updateList()
    }


    return (

        <div style={{ padding: 20, }}>
            <NextSeo
                title="二维码QRCode"
            />
            <Row>
                <Col span={14}>
                    <div style={{ minHeight: 280 }}>
                        <Row gutter={[8, 8]}>
                            <Col span={4} style={{ textAlign: 'right' }}>CRN/QRN：</Col>
                            <Col span={20}>
                                <Radio.Group
                                    defaultValue={channel}
                                    name="channel"
                                    onChange={e => {
                                        setChannel(e.target.value)
                                    }}>
                                    <Radio value='crn' checked={channel === 'crn'}>CRN</Radio>
                                    <Radio value='qrn' checked={channel === 'qrn'}>QRN</Radio>
                                </Radio.Group>
                            </Col>

                            <Col span={4} style={{ textAlign: 'right' }}>本地/壳：</Col>
                            <Col span={20}>
                                <Radio.Group
                                    defaultValue={locate}
                                    name="location"
                                    onChange={e => {
                                        setLocate(e.target.value)
                                    }}>
                                    <Radio value='local' checked={locate === 'local'}>本地</Radio>
                                    <Radio value='app' checked={locate === 'app'}>壳</Radio>
                                </Radio.Group>
                            </Col>
                            {/* 本地 */}
                            {locate === 'local' && <Fragment>
                                <Col span={4} style={{ textAlign: 'right' }}>IP：</Col>
                                <Col span={20}>
                                    <Input value={ip} onChange={e => setIp(e.target.value)} style={{ width: 200 }}></Input>
                                </Col>

                                <Col span={4} style={{ textAlign: 'right' }}>Port：</Col>
                                <Col span={20}>
                                    <Input value={port} onChange={e => setPort(e.target.value)} style={{ width: 200 }}></Input>
                                </Col>

                                <Col span={4} style={{ textAlign: 'right' }}>IOS/ADR：</Col>
                                <Col span={20}>
                                    <Radio.Group
                                        defaultValue={platform}
                                        name="location"
                                        onChange={e => {
                                            setPlatform(e.target.value)
                                        }}>
                                        <Radio value='ios' checked={platform === 'ios'}>IOS</Radio>
                                        <Radio value='adr' checked={platform === 'adr'}>Android</Radio>
                                    </Radio.Group>
                                </Col>
                            </Fragment>}
                            {/* 本地 */}


                            {/* 壳 */}
                            {locate === 'app' && <Fragment>
                                <Col span={4} style={{ textAlign: 'right' }}>频道名：</Col>
                                <Col span={20}>
                                    <Input value={pindao} onChange={e => setPindao(e.target.value)} style={{ width: 200 }}></Input>
                                </Col>

                                <Col span={4} style={{ textAlign: 'right' }}>配置名：</Col>
                                <Col span={20}>
                                    <Input value={cfg} onChange={e => setCfg(e.target.value)} style={{ width: 200 }}></Input>
                                </Col>
                            </Fragment>}
                            {/* 壳 */}
                            <Col span={4} style={{ textAlign: 'right' }}>ModuleName：</Col>
                            <Col span={20}>
                                <Input value={moduleName} onChange={e => setModuleName(e.target.value)} style={{ width: 200 }}></Input>
                            </Col>

                            <Col span={4} style={{ textAlign: 'right' }}>InitialPage：</Col>
                            <Col span={20}>
                                <Input value={initialPage} onChange={e => setInitialPage(e.target.value)} style={{ width: 200 }}></Input>
                            </Col>

                        </Row>
                    </div>
                    <Row gutter={[8, 8]}>
                        <Col span={24} style={{ color: '#999' }}>{url}</Col>
                        <Col span={24}><canvas id="qrcode"></canvas></Col>
                        <Col span={24} ><Button type="primary" onClick={saveToLocal}>保存到本地</Button></Col>
                    </Row>
                </Col>

                <Col span={10} style={{ borderLeft: '1px solid pink', padding: '0 10px' }}>
                    <h3>保存的列表</h3>
                    <div>
                        <Table
                            dataSource={recods}
                            pagination={{ position: ['none', 'none'] }}
                            columns={[
                                { title: '名称', key: 'name', dataIndex: 'name' },
                                {
                                    title: '操作', key: 'oper', render: (oper, row) => {
                                        return (
                                            <>
                                                <a type="link" onClick={() => fillData(row)}>使用</a>
                                                <div style={{ display: 'inline-block', marginLeft: 10 }}>
                                                    <Popconfirm
                                                        title="确定删除吗?"
                                                        onConfirm={() => delRecord(row)}
                                                        okText="Yes"
                                                        cancelText="No"

                                                    >
                                                        <a type="link" style={{ color: '#aaa' }} >删除</a>
                                                    </Popconfirm>
                                                </div>
                                            </>
                                        )
                                    }
                                }
                            ]}
                        />
                    </div>
                </Col>
            </Row>
            <Modal
                visible={visible}
                title="请输入名称"

                onOk={saveConfirm}
                onCancel={() => setVisible(false)}
            >

                <Input onPressEnter={saveConfirm} value={name} placeholder="请取个名字" onChange={e => setName(e.target.value)} />
            </Modal>
        </div>
    )
}

export default Qrcode;