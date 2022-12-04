import React, { useEffect, useState, memo, useCallback, useRef } from "react";
import { Button, Input, Modal, Table, Form, Row, Col, message, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Block from "../components/Block";
import { member, spend, idb, score } from "../db/db";
import "../styles/member.less";
import UpdateMember from "../components/member/UpdateMember";
import UpdateSpend from "../components/member/UpdateSpend";
import UpdateScore from "../components/member/UpdateScore";
import SpendList from "../components/member/SpendList";
import ScoreList from "../components/member/ScoreList";
import dayjs from "dayjs";
import downloadFile from "react-file-download";
import axios from "axios";
const { Search } = Input;


const sortedById = (a, b) => {
  return b.id - a.id;
};

const Member = (props) => {
  // const [db, setDb] = useState(null);
  const [list, setList] = useState([]);
  const [memberVisible, setMemberVisible] = useState(false);
  const memberRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [totalMountVisible, setTotalMountVisible] = useState(false);
  const [totalMount, setTotalMount] = useState(0);

  const [spendVisible, setSpendVisible] = useState(false);
  const [scoreVisible, setScoreVisible] = useState(false);
  const spendRef = useRef(null);
  const scoreRef = useRef(null);
  const uploadRef = useRef(null);

  const [spendListData, setSpendListData] = useState([]);
  const [scoreListData, setScoreListData] = useState([]);
  const [spendListVisible, setSpendListVisible] = useState(false);
  const [scoreListVisible, setScoreListVisible] = useState(false);

  const [phone, setPhone] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchValue, setSearchValue] = useState("");


  // 查询所有消费记录加起来
  const getSpendRecord = async (phone) => {
    const v = await spend.getItems(phone ?? null, { index: 'phone', sorted: sortedById })
    return v;
  }

  // 查询所有使用积分记录
  const getScoreRecord = async (phone) => {
    const v = await score.getItems(phone ?? null, { index: 'phone', sorted: sortedById })
    return v;
  }

  // 总收入
  const [totalMountLoading, setTotalMountLoading] = useState(false)
  const getTotalMount = async () => {
    setTotalMountLoading(true)
    const v = await getSpendRecord()
    setTotalMountLoading(false)
    const _totalMount = v.reduce((acc, curr) => {
      acc = +acc + +curr.money
      return acc
    }, 0)
    setTotalMount(_totalMount)
  }
  const handleTotalMount = () => {
    setTotalMountVisible(!totalMountVisible)
    getTotalMount()
  }

  // 处理搜索
  const handleSearch = async (value) => {
    setLoading(true);
    if (value === undefined) {
      value = searchValue;
    } else {
      setSearchValue(value);
    }
    let list = [];
    if (value) {
      list = await member.getItems(value, {
        index: ["name", "phone"],
        fuzzy: true,
        sorted: sortedById,
      });
    } else {
      list =
        (await member.getItems(null, {
          sorted: sortedById,
        })) || [];
    }
    console.log(list, 'ggg2')

    // await combineSpendAndScore({ list });
    setLoading(false);
    setCurrentPage(1);
    setTotal(list.length);
    setList(list);
  };

  const combineSpendAndScore = async ({ list } = {}) => {
    // 根据手机号查询所有的购物记录
    await Promise.all(
      list.map(async (item) => {
        const v = await spend.getItems(item.phone, {
          index: "phone",
          sorted: sortedById,
        });
        // 以phone的维度缓存spendList
        return v;
      })
    );

    // 根据手机号查询所有兑换积分记录
    await Promise.all(
      list.map(async (item) => {
        const v = await score.getItems(item.phone, {
          index: "phone",
          sorted: sortedById,
        });
        // 以phone的维度缓存spendList
        return v;
      })
    );


    setLoading(false);
    setCurrentPage(1);
    setTotal(list.length);
    setList(list);
  };

  useEffect(() => {
    init();
  }, []);

  async function init() {
    // await member.createTable();
    // await spend.createTable();
    await idb.createDatabase();
    handleSearch();
  }

  const seeHistory = async (phone) => {
    setPhone(phone);
    setSpendListVisible(true);
    const list = await getSpendRecord(phone)
    setSpendListData(list);
  };
  const seeScore = async (phone) => {
    setPhone(phone);
    const sList = await getSpendRecord(phone)
    setSpendListData(sList);
    const list = await getScoreRecord(phone)
    setScoreListData(list);
    setScoreListVisible(true);
  };

  const backup = async () => {
    const spendRecord = await spend.getItems();
    const memberList = await member.getItems();
    const exchangeRecord = await score.getItems();

    const hide = message.loading("备份中，请耐性等待...", 0);
    await axios.post("/api/backup", {
      spendRecord,
      member: memberList,
      exchangeRecord,
    });

    hide();
    message.success("备份成功！");
    // downloadFile(JSON.stringify({
    //   spend:,
    //   member: ,
    //   score:
    // }), 'ziyi.text')
  };

  const hanldeFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const bobj = JSON.parse(bstr);
      // const {member, spend, score} = bobj;
      spend.setItems(bobj.spend);
      member.setItems(bobj.member);
      score.setItems(bobj.score);
    };
    reader.readAsText(file);
    console.log(file);
  };

  const columns = [
    {
      key: "name",
      dataIndex: "name",
      title: "姓名",
    },
    {
      key: "phone",
      dataIndex: "phone",
      title: "电话",
    },
    {
      key: "spending",
      dataIndex: "spending",
      title: "购物记录",
      render: (v, row) => {
        return (
          <>
            <Button type="link" onClick={() => seeHistory(row.phone)}>
              查看
            </Button>
          </>
        );
      },
    },
    {
      key: "spending",
      dataIndex: "spending",
      title: "兑换记录",
      render: (v, row) => {
        return (
          <>
            <Button type="link" onClick={() => seeScore(row.phone)}>
              查看
            </Button>
          </>
        );
      },
    },
    {
      key: "addDate",
      dataIndex: "addDate",
      title: "添加日期",
      render: (v) => dayjs(v).format("YYYY-MM-DD HH:mm"),
    },
    {
      key: "editDate",
      dataIndex: "editDate",
      title: "修改日期",
      render: (v) => dayjs(v).format("YYYY-MM-DD HH:mm"),
    },
    {
      key: "oper",
      dataIndex: "oper",
      title: "操作",
      render: (v, row) => {
        return (
          <div className="oper">
            <a
              onClick={() => {
                memberRef.current.editMember(row);
              }}
            >
              修改
            </a>
            {/* <a onClick={() => delMember(row)}>删除</a> */}
            <a
              onClick={() => {
                spendRef.current.addSpend({ phone: row.phone });
              }}
            >
              添加购物
            </a>
            <a
              onClick={() => {
                scoreRef.current.addScore({ phone: row.phone });
              }}
            >
              积分兑换
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Search
        placeholder="查找会员"
        size="large"
        allowClear={true}
        onSearch={handleSearch}
        style={{ width: "100%" }}
      ></Search>
      <Block>
        <Row align="middle">
          <Col span={18}>
            <div style={{ display: "flex" }}>
              <div>
                <Button
                  type="primary"
                  onClick={() => memberRef.current.addMember()}
                >
                  添加会员
                </Button>
              </div>
              <div style={{ marginLeft: 60 }}>
                <Button onClick={() => backup()}>备份</Button>
              </div>
              <div style={{ marginLeft: 20 }}>
                {/* <Button onClick={(e) => uploadRef.current.click()}>
                  导入数据
                </Button> */}
                <input
                  style={{ visibility: "hidden" }}
                  type="file"
                  accept="text"
                  ref={uploadRef}
                  onChange={hanldeFileUpload}
                />
              </div>
            </div>
          </Col>

          <Col span={6}>
            <div
              style={{ textAlign: "right", fontWeight: "bold" }}
              onClick={handleTotalMount}
            >
              总收入
              {totalMountVisible ?
                totalMountLoading ?
                  <Spin />
                  :
                  <span>: {totalMount}元</span>
                : null}
            </div>
          </Col>
        </Row>
      </Block>
      <Modal visible={spendVisible}></Modal>
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
          setSpendListData(await getSpendRecord(phone));
        }}
      />
      <UpdateScore
        ref={scoreRef}
        scoreVisible={scoreVisible}
        setScoreVisible={setScoreVisible}
        handleSearch={async () => {
          await handleSearch();
          setScoreListData(await getScoreRecord(phone));
        }}
      />
      <ScoreList
        scoreListData={scoreListData}
        spendListData={spendListData}
        setScoreListData={setScoreListData}
        scoreListVisible={scoreListVisible}
        setScoreListVisible={setScoreListVisible}
        scoreRef={scoreRef}
      ></ScoreList>
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
            showTotal: (total) => `总共${total}条`,
            current: currentPage,
            onChange: (page) => {
              setCurrentPage(page);
            },
          }}
        />
      </Block>
    </div>
  );
};

export default Member;
