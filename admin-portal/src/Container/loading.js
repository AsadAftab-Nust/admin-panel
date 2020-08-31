import React, { Component } from 'react';
import axios from 'axios'
import UserList from '../components/userList'
import UserInfo from '../components/userInfo'
import config from '../config'
import {Row,Col,Input,Button,Icon} from 'antd'
import ReactLoading from 'react-loading';
import dateFormat from 'dateformat'


export default class Loading extends Component {
  constructor() {
    super();
    this.state = {
    waiting:false
    }
 
  }
componentDidMount(){
    this.setState({waiting:this.props.waiting})
}
changeAbility(id,status){
    // console.log('data si : ',id ,' and ',status)
    this.setState({waiting:true})
    let current = this;
    axios.post(config.changeAbility,{'id':id,'status':status})
    .then(function(response){
// console.log('response data is: ',response.data)
      current.setState({waiting:false})
      let temp = response.data;
      for(let i=0;i<temp.length;i++){
        let date =  temp[i].creationDate;
        temp[i].creationDate = dateFormat(date, "mmmm dS, yyyy")
      }
      current.props.changeAbility(temp)
      alert('Operation done successfully')
    })
    .catch(function(err){
      console.log('error i n getting data: ',err);
      current.setState({waiting:false})
      alert('errror in getting data Please try again')
    })
  }

  render() {

    return (
      <div>
          <Row gutter={2}  >

      <Col span={18} offset={2} >
    <Icon type="delete" onClick={()=>{this.changeAbility(this.props.id,!this.props.status)}} style={{color:this.props.status?'red':'#A5A5A5',fontSize:'15px',cursor:'pointer'}}/>
</Col>
<Col span={4} >
       {this.state.waiting?
    //    <div style={{border:'1px solid black'}}>
    
      <ReactLoading type="spin" color="black" style={{height:20,width:20}}  />
    //   </div>
      :null}
      </Col>
</Row>
      </div>
    );
  }
}

