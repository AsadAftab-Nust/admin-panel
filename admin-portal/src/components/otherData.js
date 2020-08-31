import React, { Component } from 'react';
import {Col,
        Row,
        Select,
        Input,
        Form,
        Checkbox,
        DatePicker} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;
export default class OtherData extends Component {
  constructor(){
      super();
      this.state={
        deceased:false,
        divorced:false,
        widow:false
      }
      this.handleDeceased = this.handleDeceased.bind(this);
  }
  handleDeceased(){
    this.setState(prevState => ({
      deceased: !prevState.deceased
    }));
  }
    render() {
      const formItemLayout = {
        // labelCol: {
        //   xs: { span: 24 },
        //   sm: { span: 6 },
        // },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 },
        },
      };
    return (
      <div>
     <Row gutter={20}>
  <Col span={8} offset={3}>
  <FormItem
                  {...formItemLayout}
                >
                  <Select placeholder="Marital Status" style={{ width: '100%' }} value={this.props.data.maritalStatus}
                          onChange={(value)=>{this.props.handleData('maritalStatus',value)}}>
                    <Option value="single">Single</Option>
                    <Option value="married">Married</Option>
                  </Select>
                </FormItem>
  </Col>
  <Col span={3}>
     <h4 style={{marginTop:'10%'}}>Divorced</h4>
     </Col>
     <Col span={2} >
     <FormItem
       {...formItemLayout}
     >
        <Checkbox value={this.props.data.divorced}
         onChange={()=>{this.props.handleData('divorced',!this.state.divorced)
         this.setState(prevState => ({
          divorced: !prevState.divorced
        }));}}></Checkbox>
     </FormItem>

   </Col>
   <Col span={3}>
     <h4 style={{marginTop:'10%'}}>Widow</h4>
     </Col>
     <Col span={2} >
     <FormItem
       {...formItemLayout}
     >
        <Checkbox value={this.props.data.widow}
         onChange={()=>{this.props.handleData('widow',!this.state.widow)
         this.setState(prevState => ({
          widow: !prevState.widow
        }));}}></Checkbox>
     </FormItem>

   </Col>
     </Row>
    
     <Row gutter={20}>
        <Col span={8} offset={3}>
        <Input placeholder="Enter Nationality" value={this.props.data.nationality} 
         onChange={(e)=>{this.props.handleData('nationality',e.target.value)
        }}/>
        </Col>
        <Col span={3} style={{ marginTop: '1%' }}>
                <h4>Deceased</h4>
              </Col>
              <Col span={2} style={{ marginTop: 0 }}>
                <FormItem
                  {...formItemLayout}
                >
                   <Checkbox onChange={()=>{this.handleDeceased()}}></Checkbox>
                </FormItem>

              </Col>
              <Col span={6} style={{ marginTop: 0 }}>
                <FormItem
                  {...formItemLayout}
                >
                {this.state.deceased?
                  <DatePicker placeholder="Select Date" style={{width:'100%'}} 
                  onChange={(date,dateString)=>{this.props.handleData('deceasedDate',dateString)}}/>
                  :null}
                  </FormItem>

              </Col>
     </Row>
     </div>
    );
  }
}


