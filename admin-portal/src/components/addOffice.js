import React, { Component } from 'react';
import {Col, Row,Input,Form} from 'antd'

export default class AddOffice extends Component {
  constructor(){
      super();
  }
    render() {
    return (
      <div className="App">
  
     <Row>
     <Col span={12} offset={2}>
    <Input placeholder="Office Name" onChange={(e)=>{this.props.handleOffice(e.target.value)}}/>
     </Col>
     </Row>
     <br/>
     <Row>
     <Col span={18} offset={2}>
    <Input placeholder="Address" onChange={(e)=>{this.props.handleAddress(e.target.value)}}/>
     </Col>
     </Row>
     <br/>
     <Row gutter={10}>
     <Col span={10} offset={2}>
    <Input placeholder="Telephone" onChange={(e)=>{this.props.handleTel(e.target.value)}}/>
     </Col>
     <Col span={10} >
    <Input placeholder="Email" onChange={(e)=>{this.props.handleEmail(e.target.value)}}/>
     </Col>
     </Row>

      </div>
    );
  }
}


