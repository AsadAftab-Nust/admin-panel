import React, { Component } from 'react';
import {
    Col,
    Row,
    Icon,
    Tabs
} from 'antd'
import InfoTable from './infoTable'
import UserFiles from './userFiles'

const TabPane = Tabs.TabPane;
export default class UserInfo extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <Row>
                    <Col span={2} offset={3}>
                        <Icon type="arrow-left"
                            style={{ fontSize: '25px', cursor: "pointer", color: 'black', marginTop: '5px' }}
                            onClick={() => { this.props.handleBack() }} />
                    </Col>
                    <Col span={16} style={{ textAlign: 'center' }}>
                        <h2>User Information</h2>
                    </Col>
                </Row>
                <Row>
                <Col offset={3} span={18} style={{textAlign:'left'}}>
              <Tabs defaultActiveKey="1" tabBarGutter={50} size='large' >
      <TabPane tab="Files" key="1" >
      <UserFiles data={this.props.userData}/>
             </TabPane>
  
      <TabPane tab="Information" key="2">
      <InfoTable data={this.props.userData}/>
       
         </TabPane>
     
    </Tabs>
    </Col>
    </Row>
            </div>
        );
    }
}


