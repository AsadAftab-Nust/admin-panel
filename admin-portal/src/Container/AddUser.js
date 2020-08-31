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
 
} from 'antd';
import InputTitle from '../components/inputTitle'
import AbroadAddress from '../components/abroadAddress'
import OtherData from '../components/otherData'
import ItalianAddress from '../components/italianAddress'
import axios from 'axios'
import ip from 'ip'
import config from '../config';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const TabPane = Tabs.TabPane;

export default class AddUser extends Component {
  constructor(){
    super();
    this.state={
      deceased:false,
      fiscalCode:'',
      surName:'',
      name:'',
      dob:'',
      gender:'male',
      codiceCom:'',
      prov:'',
      preferred:false,
      officesList:[],
      italianAddress:{
          address:'',
          emailAddress:'',
          state:'',
          telephoneNumber:'',
          postalCode:'',
          province:'',
          type:'free',
          office:'',
          employer:'',
          streetNumber:'',
          citizenship:''
      },
      abroadAddress:{
        address:'',
        emailAddress:'',
        state:'',
        telephoneNumber:'',
        postalCode:'',
        province:'',
        type:'free',
        office:'',
        employer:'',
        streetNumber:'',
        citizenship:''
    },
    otherData:{
      maritalStatus:'single',
      divorced:false,
      widow:false,
      nationality:'',
      deceasedDate:''
    },
    iconColor:'#CACACA',
    toolTipTex:'Click to make it Preferred.'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleItalianAddress = this.handleItalianAddress.bind(this);
    this.handleAbroadAddress = this.handleAbroadAddress.bind(this);
    this.handleOtherData = this.handleOtherData.bind(this);
  }
  handleItalianAddress(key,value){
    let temp = this.state.italianAddress;
    temp[key] = value;
    this.setState({italianAddress:temp});
  }
  handleAbroadAddress(key,value){
    let temp = this.state.abroadAddress;
    temp[key] = value;
    this.setState({abroadAddress:temp});
  }
  handleOtherData(key,value){
    let temp = this.state.otherData;
    temp[key] = value;
    this.setState({otherData:temp});
  }

  handleSubmit(e){
    e.preventDefault();
    let current = this;
    let payload={
      "fiscalCode":this.state.fiscalCode,
      "surName":this.state.surName,
      "name":this.state.name,
      "dob":this.state.dob,
      "gender":this.state.gender,
      "codiceCom":this.state.codiceCom,
      "prov":this.state.prov,
      "preferred":this.state.preferred,
      "italianAddress":this.state.italianAddress,
      "abroadAddress":this.state.abroadAddress,
      "otherData":this.state.otherData
    }
   axios.post(config.addUser,payload)
    .then(function (response) {
    alert('User added successfully')
  current.setState({fiscalCode:'',name:'',surName:'',
                  prov:'',gender:'',codiceCom:'',prov:'',
                  italianAddress:{address:''},abroadAddress:{address:''},
                otherData:{nationality:''}})
    })
    .catch(function (error) {
      alert('something wrong please try again!')
    });
  }
 
  componentDidMount(){
    console.log('ip address is:',ip.address())
    let current =this; 
    axios.get(config.getOffice)
    .then(function (response) {
    //  console.log('offices list is: ',response.data)
    current.setState({officesList:response.data})
    })
    .catch(function (error) {
      alert('something wrong please try again!')
    });

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
        <Form onSubmit={this.handleSubmit}>

          
        <Row gutter={20}>
        <Col span={16} offset={1}>
        <InputTitle value="Nominative" offset={3} />
        </Col>
           
        <Col span={7}>
        <Tooltip placement="top" title={this.state.toolTipTex}>
        <Icon type="star" style={{fontSize:'25px',color:this.state.iconColor,cursor:'pointer'}} 
              onClick={()=>{this.state.iconColor==='#4812FA'?
                            this.setState({iconColor:'#CACACA',toolTipTex:'Click to make it Preffered.',preferred:false})
                            :this.setState({iconColor:'#4812FA',toolTipTex:'Click to make it normal.',preferred:true})}}/>
      </Tooltip>
        
        </Col>
          </Row>            
            <Row gutter={20}>
            <Col span={6} offset={3}>
              <FormItem
                {...formItemLayout}
              // label="Email"
              // extra="We must make sure that your are a human."
              >
                <Input placeholder="Fiscal Code" id="name" name="fiscalCode" value={this.state.fiscalCode} 
                        onChange={(e)=>{this.setState({fiscalCode:e.target.value})}}/>

              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                {...formItemLayout}
              >

                <Input placeholder="Surname" name="surName" value={this.state.surName}
                        onChange={(e)=>{this.setState({surName:e.target.value})}}/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                {...formItemLayout}
              >
                <Input placeholder="Name" name="name" value={this.state.name}
                      onChange={(e)=>{this.setState({name:e.target.value})}}/>
              </FormItem>
            </Col>
          </Row>
         
          <Row gutter={20}>
        <Col span={16} offset={1}>
        <InputTitle value="Date of Birth" offset={3} />
        </Col>
        </Row>
            
            <Row gutter={20}>
            <Col span={6} offset={3}>
              <FormItem
                {...formItemLayout}
              // label="Email"
              // extra="We must make sure that your are a human."
              >
               <DatePicker placeholder="Date of Birth" style={{width:'100%'}} name="dob" 
                            onChange={(date,dateString)=>{this.setState({dob:dateString})}}/>

              </FormItem>
            </Col>
            <Col span={6}>
                  <FormItem
                    {...formItemLayout}
                  >
                    <Select placeholder="Sex" style={{ width: '100%' }} name="gender" value={this.state.gender}
                            onChange={(value)=>{this.setState({gender:value})}}>
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                      <Option value="trans" >Trans</Option>
                    </Select>
                  </FormItem>
                </Col>
           
          </Row>
          <Row gutter={20}>
            <Col span={8} offset={3}>
              <FormItem
                {...formItemLayout}
              // label="Email"
              // extra="We must make sure that your are a human."
              >
                <Input placeholder="Codice Com" name="codiceCom" value={this.state.codiceCom}
                      onChange={(e)=>{this.setState({codiceCom:e.target.value})}}/>

              </FormItem>
            </Col>
           
            <Col span={8}>
              <FormItem
                {...formItemLayout}
              >
                <Input placeholder="Prov" name="prov" value={this.state.prov}
                      onChange={(e)=>{this.setState({prov:e.target.value})}}/>
              </FormItem>
            </Col>
            </Row>
            <Row>
              <Col offset={3} span={18}>
            <Tabs defaultActiveKey="1" tabBarGutter={50} size='large' >
    <TabPane tab="Italian Address" key="1" >
          <ItalianAddress data={this.state.italianAddress} officesList={this.state.officesList} handleData={this.handleItalianAddress}/>
         </TabPane>

    <TabPane tab="Abroad Address" key="2">
       <AbroadAddress data={this.state.abroadAddress} officesList={this.state.officesList} handleData={this.handleAbroadAddress}/>
    </TabPane>
    <TabPane tab="Other Data" key="3">
        <OtherData data={this.state.otherData} officesList={this.state.officesList} handleData={this.handleOtherData}/>
    </TabPane>
  </Tabs>
  </Col>
            </Row>
            <Button type="primary" htmlType="submit" className="login-form-button">
            Add User
          </Button>
        </Form>
      </div>
    );
  }
}

