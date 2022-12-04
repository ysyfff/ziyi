import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button, Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;
import Member from "./member";
import axios from "axios";

export default function Home() {
  const [selectedKey, setSelectedKey] = useState("member");

  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[selectedKey]}
        >
          <Menu.Item key="member">会员</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "20px", minHeight: "calc(100vh - 64px)" }}>
        <Member />
      </Content>
    </Layout>
  );
}
