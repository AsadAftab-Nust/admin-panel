import React, { Component } from 'react';
import axios from 'axios'
import UserList from '../components/userList'
import UserInfo from '../components/userInfo'
import config from '../config'



export default class EditUser extends Component {
  constructor() {
    super();
    this.state = {
      // selectedId: '',
      showInfo: false,
      userData:{}
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleClick(id){
    let current = this;
    
    axios.post(config.getUser,{'id':id})
    .then(function (response) {
    // alert('User added successfully')
      current.setState({userData:response.data[0],showInfo:true})
  })
    .catch(function (error) {
      alert('something wrong please try again!')
    });
  }

  handleBack(){
    this.setState({showInfo:false})
  }
  render() {

    return (
      <div>
        {this.state.showInfo ?
          <UserInfo handleBack = {this.handleBack} userData={this.state.userData}/>
          : <UserList handleClick={this.handleClick}/>}

      </div>
    );
  }
}

