import { Layout } from "antd";
import { Route } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import Categories from "./components/Categories";
import Login from "./components/Login";
import Logout from "./components/Logout";
import PrivateRoute from "./components/PrivateRoute";
import Records from "./components/Records";
import SignUp from "./components/SignUp";
function App() {
  const {  Content, Footer } = Layout;
  return (
    <Layout>
      <AppHeader />
      <Content
        className="site-layout"
        style={{ padding: "50px", marginTop: 64 }}
      >
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/categories" component={Categories} />
        <PrivateRoute path="/records" component={Records} />
        <Route path="/logout" component={Logout} />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        expense-income-tracking-project ©2022 Created by Adem Erbas
      </Footer>
    </Layout>
  );
}

export default App;
