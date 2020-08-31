import React, { Component } from 'react';
import { Card, Icon, Avatar,Row,Col, List } from 'antd';
import axios from 'axios'
import config from '../config'
import ReactLoading from 'react-loading';
const { Meta } = Card;


export default class ApprovedPosts extends Component {
    constructor(){
        super();
        this.state = {
            posts:[]
        }

    }

    componentWillMount(){
      let current = this;
       axios.post(config.getPosts,{'status':'approved'})
       .then(function(response){
          //  console.log('response is ',response.data)
          current.setState({posts:response.data})
       })
       .catch(function(err){
           console.log('error is: ',err)
       })
    }
   
  render() {
      
    return (
      <div>
        {this.state.posts.length>0?
        <div>
        <h3>Approved Posts</h3>
        <List
        style={{paddingLeft: 30,}}
    grid={{ gutter: 16, column: 3 }}
    dataSource={this.state.posts}
    renderItem={(item,index) => (
      <List.Item>
        <Card
    style={{ width: 300 }}
    cover={<img alt="example" style={{height:300}} src={`https://fambo-insta-cristian.s3.amazonaws.com/uploads%2F${item.post.pictureName}`} /> }
   >
    <Meta
      avatar={<Avatar size="large" src={`https://fambo-insta-cristian.s3.amazonaws.com/uploads%2F${item.profilePic}`} />}
      title={item.userName}
      description={
        <div>

          <h4 style={{color:'#5F5F5F'}}>{item.post.description}</h4>
         
        </div>
      }
    />
  </Card>
      </List.Item>
    )}
  />
       </div >:
       <div style={{paddingLeft:'40%',height:200,paddingTop:'20%'}}>
       <ReactLoading type="spin" color="black" height={50} width={50} />
       </div>}
      </div>
    )
  }
};
