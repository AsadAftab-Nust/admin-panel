import React, { Component } from 'react';
import {
    Input,
    Col,
    Row,
    Button

} from 'antd';

import axios from 'axios'
import config from '../config'
export default class RegisterNewAdmin extends Component {
    constructor (){
        super();
        this.state = {
            name:'',
            email:'',
            password:''
        }
    }

    handleSubmit(){
        let current = this;
        // console.log('values are: ',this.state.name,this.state.email)
        if(this.state.email===''|| this.state.name==='' || this.state.password===''){
            alert('please fill all the fields');
        }
        
        else{
        axios.post(config.registerAdmin,{
            "name":this.state.name,
            "email":this.state.email,
            "password":this.state.password
        })
        .then(function(response){
            alert('New Admin Registerd successfuly. Thanks')
            current.setState({email:'',name:'',password:''})
        })
        .catch(function(err){
           alert('please try agian');
        })
    }

    }
    render() {
        return (
            <div>
                <h3>
                    Register New User
        </h3>
                <br />
                <Row>
                    <Col span={8} offset={8} style={{ background: 'grey' }}>
                        <div style={{ padding: 20 }}>
                            <div>
                                <h4 style={{ textAlign: 'left', color: 'white' }}>Enter Full Name</h4>
                                <Input value={this.state.name} type="text" placeholder="Full Name" 
                                onChange={(e)=>{this.setState({name:e.target.value})}} />
                            </div>
                            <br/>
                            <div>
                                <h4 style={{ textAlign: 'left', color: 'white' }}>Enter Email Address</h4>
                                <Input value={this.state.email} type="email" placeholder="Email Address"
                                onChange={(e)=>{this.setState({email:e.target.value})}}/>
                            </div>
                            <br/>
                            <div>
                                <h4 style={{ textAlign: 'left', color: 'white' }}>Enter Password</h4>
                                <Input value={this.state.password} type="password" placeholder="Password" 
                                onChange={(e)=>{this.setState({password:e.target.value})}}/>
                            </div>
                            <br/> 
                            <div>
                            <Button type="primary" className="login-form-button" onClick={()=>{this.handleSubmit()}} >
                            Register Admin
          </Button>
                            </div>
                        </div>
                    </Col>
                </Row>



            </div>
        )
    }
};
