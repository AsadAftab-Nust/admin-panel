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
export default class AbroadAddress extends Component {
  constructor(){
      super();
     
  }
 
    render() {
      let optionItems = this.props.officesList.map((item) =>
      <Option key={item._id} value={item.office}>{item.office}</Option>
  );
      
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
        <Row gutter={20}>
          
          <Col span={13}>
            {/* <InputTitle value="Indrizo Italiano" offset={0} /> */}
            
            <Row>
              <Col span={20} style={{ marginTop: 0 }}>
                <FormItem
                  {...formItemLayout}
                >
                  <Input placeholder="Address" value={this.props.data.address}
                        onChange={(e)=>{this.props.handleData('address',e.target.value)}}/>
                </FormItem>

              </Col>

            </Row>
           
            <Row gutter={5}>
              <Col span={12} >
                <FormItem
                  {...formItemLayout}
                >
                  <Input placeholder="Email Address"  value={this.props.data.emailAddress}
                  onChange={(e)=>{this.props.handleData('emailAddress',e.target.value)}}/>
                </FormItem>

              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                >
                  <Input placeholder="Telephone No" value={this.props.data.telephoneNumber}
                   onChange={(e)=>{this.props.handleData('telephoneNumber',e.target.value)}}/>
                </FormItem>

              </Col>

            </Row>
            <Row gutter={10}>
              <Col span={16}>
                <FormItem
                  {...formItemLayout}
                >
                  <Select placeholder="Select Type" style={{ width: '100%' }} value={this.props.data.type} 
                  onChange={(value)=>{this.props.handleData('type',value)}}>
                    <Option value="free">Free</Option>
                    <Option value="premium">Premium</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={5}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                >
                  <Select placeholder="Select Office" style={{ width: '100%' }} value={this.props.data.office}  
                  onChange={(value)=>{this.props.handleData('office',value)}}>
                  {optionItems}
                  </Select>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                >
                  <Select placeholder="Select Employer" style={{ width: '100%' }} value={this.props.data.employer}
                           onChange={(value)=>{this.props.handleData('employer',value)}}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span={11}>
            {/* <InputTitle value="Altari Dati" offset={0} /> */}
            <Row gutter={10}>
              <Col span={24}>
                <FormItem
                  {...formItemLayout}
                >
                <Input placeholder="Enter State"  value={this.props.data.state}
                        onChange={(e)=>{this.props.handleData('state',e.target.value)}}/>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={5}>
              <Col span={8} >
                <FormItem
                  {...formItemLayout}
                >
                  <Input placeholder="Postal Code" value={this.props.data.postalCode}
                         onChange={(e)=>{this.props.handleData('postalCode',e.target.value)}}/>
                </FormItem>

              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                >
                  <Input placeholder="province"  value={this.props.data.province}
                         onChange={(e)=>{this.props.handleData('province',e.target.value)}}/>
                </FormItem>

              </Col>
              <Col span={8}>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={6} style={{ marginTop: 0 }}>
                <FormItem
                  {...formItemLayout}
                >
                  <Input placeholder="Street #" value={this.props.data.streetNumber}
                           onChange={(e)=>{this.props.handleData('streetNumber',e.target.value)}}/>
                </FormItem>

              </Col>
              <Col span={12} style={{ marginTop: 0 }}>
                <FormItem
                  {...formItemLayout}
                >
                  <Input placeholder="Citizenship" value={this.props.data.citizenship}  onChange={(e)=>{this.props.handleData('citizenship',e.target.value)}}/>
                </FormItem>

              </Col>

            </Row>
           

          </Col>
        </Row>
    );
  }
}


