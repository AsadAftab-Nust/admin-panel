import React, { Component } from 'react';
import {Col, Row} from 'antd'

export default class InputTitle extends Component {
  constructor(){
      super();
  }
    render() {
    return (
      <div className="App">
       <Row gutter={20}>
        <Col span={21} offset={this.props.offset}>
        <h3 style={{textAlign:'left'}}>{this.props.value}</h3>
        </Col>
       </Row>
      </div>
    );
  }
}


