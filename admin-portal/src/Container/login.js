import React, { Component } from 'react';
import {
    Input,
    Col,
    Row,
    Button

} from 'antd';
import axios from 'axios'
import config from '../config'

export default class Login extends Component {
    constructor (){
        super();
        this.state = {
         
            email:'',
            password:'',
            error:''
        }
    }

    handleLogin(){
        let current =this
        // console.log('values are: ',this.state.email)
        if(this.state.email==='' || this.state.password===''){
            // alert('Please fill both the fields')
            this.setState({error:'Please Fill Both the fields'})
        }
        else{
            axios.post(config.loginAdmin,{"email":this.state.email,"password":this.state.password})
            .then(function(response){
                if(response.data.length>0){
                    current.setState({error:''})
                    localStorage.setItem('id',response.data[0]._id);
                    current.props.handleLogin()
                }
                else{
                    current.setState({error:'invalid Email or Password'})
                }
            })
            .catch(function(error){
                console.log('error in login')
                current.setState({error:'Something wrong please try agian'})
            })
        }
        // this.props.handleLogin();

    }
    render() {
        return (
            <div>
                <h3 style={{paddingTop:'5%',textAlign:'center'}}>
                    Login Form
        </h3>
                <br />
                <Row>
                    <Col span={8} offset={8} style={{ background: 'grey' }}>
                        <div style={{ padding: 20 }}>
                        {this.state.error!==''?
                        <h4 style={{color:'red'}}>{this.state.error}</h4>
                        :null}
                                                        <div>
                                <h4 style={{ textAlign: 'left', color: 'white' }}>Enter Email Address</h4>
                                <Input type="email" placeholder="Email Address"
                                onChange={(e)=>{this.setState({email:e.target.value})}}/>
                            </div>
                            <br/>
                            <div>
                                <h4 style={{ textAlign: 'left', color: 'white' }}>Enter Password</h4>
                                <Input type="password" placeholder="Password" 
                                onChange={(e)=>{this.setState({password:e.target.value})}}/>
                            </div>
                            <br/> 
                            <div style={{textAlign:'center'}}>
                            <Button type="primary" className="login-form-button" onClick={()=>{this.handleLogin()}} >
                            Login 
          </Button>
                            </div>
                        </div>
                    </Col>
                </Row>



            </div>
        )
    }
};
