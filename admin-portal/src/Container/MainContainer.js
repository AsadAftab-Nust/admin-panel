import React from 'react';
import { Layout, Menu, Icon, Avatar,Badge } from 'antd';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import AddUser from './AddUser'
import Booking from './Booking'
import ContentContainer from './contentContainer'
import Login from './login'

const {SubMenu} = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default class extends React.Component {
    constructor(){
        super()
        this.state={
          login:false
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogin(){
      this.setState({login:true})
    }
    handleLogout(){
      localStorage.clear()
      this.setState({login:false})
    }
    componentWillMount(){
      let id = localStorage.getItem('id');
      if(id!==null){
        this.setState({login:true})
      }
    }
    render(){
        return(
            <div>
              {this.state.login?
              <div>
              <Router>
              <Layout>
    <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
      <div className="logo" style={{height: "50px",
  margin: "16px",textAlign:'center'}}>
  <a href="http://fambo.io/" target="_blank"><img src={require("../assets/logo.png")} width="100px"/></a>
  </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
           
            <SubMenu
              key="sub1"
              title={<span><Icon type="camera" /><span>Posts</span></span>}
            >
              <Menu.Item key="1">
              <Link to="/">Map View</Link></Menu.Item>
              <Menu.Item key="8">
              <Link to="/pending-posts">New Pending Posts</Link></Menu.Item>
              <Menu.Item key="2"> <Link to="/approved-posts">Approved Posts</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="7">
            <Link to="/users">
              <Icon type="user" />
              <span>Users</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="3">
            <Link to="/register-new-admin">
              <Icon type="pie-chart" />
              <span>Register New Admin</span>
              </Link>
            </Menu.Item>
           
            <Menu.Item key="5">
            <Link to="/send-notification">
              <Icon type="bell" />
              <span>Send Notification</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="6"  >
            <div onClick={this.handleLogout} >
              <Icon type="logout" />
             <span>Log Out</span>
             </div>
            </Menu.Item>
            
          </Menu>
    </Sider>
    <Layout style={{ marginLeft: 200 }}>
      <Header style={{ background: '#fff', padding: 0,textAlign:"right" }}>
     <span style={{ marginRight: 24 }}>
      <Badge><Avatar shape="square" icon="logout" style={{cursor:'pointer'}}/></Badge>
    </span>
    {/*<span style={{ marginRight: 24 }}>
      <Badge count={1}><Avatar icon="bell" style={{cursor:'pointer'}}/></Badge>
    </span> */}
      </Header>
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div style={{ padding: 24, background: '#fff', textAlign: 'center',minHeight:"480px" }}>
      
          <ContentContainer logout = {this.handleLogout}/>
        
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Admin Portal ©2018 Created by <span style={{fontWeight:400}}><a href="https://www.fambo.io">Fambo</a></span>
      </Footer>
    </Layout>
  </Layout>
  </Router>
  </div>:
          <Login handleLogin = {this.handleLogin}/>
              }
            </div>
        )
    }
}