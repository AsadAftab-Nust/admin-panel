import React, { Component } from 'react';
import {Col, Row,Input,Form,Select} from 'antd'
import axios from 'axios'
import config from '../config'
const Option = Select.Option;



export default class AddCategory extends Component {
  constructor(){
      super();
      this.state={
        officesList:[]
      }
  }
  componentDidMount(){
    let current = this;
    axios.get(config.getOffice)
    .then(function (response) {
  
  current.setState({officesList:response.data})
    })
    .catch(function (error) {
      alert('something wrong please try again!')
    });
  }
    render() {
      let optionItems = this.state.officesList.map((item) =>
      <Option key={item._id} value={item.office}>{item.office}</Option>
  );
    return (
      <div className="App">
  
     <Row>
     <Col span={12} offset={2}>
    <Input placeholder="Category" 
    onChange={(e)=>{this.props.handleCategory(e.target.value)}}
    />
     </Col>
     </Row>
     <br/>
     
     <Row>
     <Col span={18} offset={2}>
    <Input placeholder="Practices" 
    onChange={(e)=>{this.props.handlePractices(e.target.value)}}
    />
     </Col>
     </Row>
     <br/>
     <Row>
     <Col span={18} offset={2}>
     <Select placeholder="Select Office" style={{ width: '100%' }}  onChange={(value)=>{this.props.handleOffice(value)}}>
     {optionItems}
                    </Select>
     </Col>
     </Row>
     
     
     <br/>
     <Row gutter={10}>
     <Col span={12} offset={2}>
    <Input placeholder="Data" 
    onChange={(e)=>{this.props.handleData(e.target.value)}}
    />
     </Col>
     <Col span={8} >
    <Input placeholder="User Name" 
    onChange={(e)=>{this.props.handleUserName(e.target.value)}}
    />
     </Col>
     </Row>

      </div>
    );
  }
}


