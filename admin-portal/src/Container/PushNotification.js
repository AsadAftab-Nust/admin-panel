import React, { Component } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Radio,
  DatePicker,
  Tabs,
  notification
 
} from 'antd';  
import config from '../config'
import axios from 'axios'
const Option = Select.Option;
const { TextArea } = Input;


export default class PushNotification extends Component {
  constructor(){
    super();
    this.state={
      users:[],
      userId:'',
      message:'',
      allUser:false,
      
    }
  }
  componentDidMount(){
  let current = this;
  axios.get(config.getAllUsers)
  .then(function(response){
    current.setState({users:response.data})
  })
  .catch(function(err){
    alert('error in getting users PLease try again');
  })
  }
 openNotificationWithIcon(type){
    notification[type]({
      message: 'Not Connected to Server',
      description: 'This section is not connected to push notificaiton server. First connect it and then try again.',
    });
  };

  sendNotification(){
    let current = this;
    if(this.state.userId!=='' || this.state.allUser){
    if( this.state.message===''){
      notification['error']({
        message: 'Missing Message',
        description: 'Please Fill the message box and try again. Thanks',
      });
    }
    else{
      let routePath = this.state.allUser?config.sendNotificationToAll:config.sendNotification
      axios.post(routePath,{'message':this.state.message,'targetUserId':this.state.userId})
      .then(function(response){
        current.setState({message:'',userId:'',allUser:false})
        notification['success']({
          message: 'Succefull',
          description: 'Notification sent successfuly.',
        });
        
      }).catch(function(err){
        alert('message not sent please try again.');
      })
     
    }
  }
  else{
    if( this.state.message===''){
      notification['error']({
        message: 'Missing User',
        description: 'Please Select User',
      });
  }}
  }
  
  render() {
    let optionItems = this.state.users.map((item) =>
    <Option key={item._id} value={item._id}>{item.name} ({item.email})</Option>);
    return (
      <div>
        <Row>
          <Col span={8} offset={7}>
          <Select disabled={this.state.allUser}
          showSearch
          optionFilterProp="children"
          // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          placeholder="Select User" style={{ width: '100%' }}
           onChange={(value)=>{this.setState({userId:value})}} >
                  {optionItems}
                  </Select>

                  <Checkbox value={this.state.allUser}
                   onChange = {()=>{
                    this.setState(prevState => ({
                      allUser: !prevState.allUser
                    }));
                   }}
                    style={{marginTop:5}}>Send To  All Users</Checkbox>
          </Col>
        </Row>
<br/>
        <Row>
          <Col span={10} offset={5} style={{textAlign:'left'}}>
          <h3>Notification Body</h3>
          </Col>
        </Row>
        <Row>
          <Col span={14} offset={5}>
          <TextArea value={this.state.message} onChange={(e)=>{this.setState({message:e.target.value})}} placeholder="Enter the Text you want to send" autosize={{ minRows: 8, maxRows: 15 }} />
          </Col>
        </Row>
        <br/>
        <Button type="primary" onClick={() => {this.sendNotification()}}>
        Send Notification
        </Button>
      </div>
    );
  }
}

