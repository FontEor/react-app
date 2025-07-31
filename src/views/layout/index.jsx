import { Flex, Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import { Outlet } from "react-router-dom";
const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#0958d9",
  maxHeight: "calc(100vh - 64px - 64px)", // 减去 Header 和 Footer 的高度
};
const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#1677ff",
};
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
  height: 64,
};
const layoutStyle = {
  // borderRadius: 8,
  overflow: "hidden",
};
const MainLayout = () => (
  <Flex gap="middle" wrap>
    <Layout style={layoutStyle}>
      <Sider width="15%" style={siderStyle}>
        Sider
      </Sider>
      <Layout>
        <Header style={headerStyle}>Header</Header>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Layout>
  </Flex>
);
export default MainLayout;
