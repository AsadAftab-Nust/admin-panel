import React, { Component } from 'react';
import {Col, Row,Input,Form} from 'antd'

export default class AddOperator extends Component {
  constructor(){
      super();
  }
    render() {
    return (
      <div>
  
     <Row>
     <Col span={12} offset={2}>
    <Input placeholder="Operator Name" onChange={(e)=>{this.props.handleOperator(e.target.value)}}/>
     </Col>
     </Row>
     <br/>
     <Row>
     <Col span={18} offset={2}>
    <Input placeholder="Office" value={this.props.office} disabled/>
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


