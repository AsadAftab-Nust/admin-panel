import React, { Component } from 'react';
import { Card, Icon, Avatar,Row,Col, List } from 'antd';
import axios from 'axios'
import config from '../config'
import ReactLoading from 'react-loading';
import StarRatingComponent from 'react-star-rating-component';

const { Meta } = Card;


export default class PendingPosts extends Component {
    constructor(){
        super();
        this.state = {
            posts:[],
            rating:0,
            show:false,
            loading:false,
        }

    }
    onStarClick(nextValue, prevValue, name,index) {
      let temp = this.state.posts;
      temp[index].post.starrating = nextValue;
      this.setState({posts:temp})
    }


    handleChangeStatus(status,index){
      let current = this;
      axios.post(config.changeStatus,{
        "postId":this.state.posts[index].post._id,
"status":status,
"rating":this.state.posts[index].post.starrating,
"targetUserId":this.state.posts[index].userId,
"postPicture":this.state.posts[index].post.pictureName
      })
      .then(function(response){
        current.setState({posts:response.data});
      })
      .catch(function(error){
        console.log('error  in changing status is: ',error)
      })
    }
  
    componentWillMount(){
      let current = this;
      current.setState({show:true})
       axios.post(config.getPosts,{'status':'pending'})
       .then(function(response){
          //  console.log('response is ',response.data)
          // if(response.data.length===0){
            // current.setState({show:true})
          // }
          console.log('dat recieved is: ',response.data)
          current.setState({posts:response.data,show:false})
       })
       .catch(function(err){
         current.setState({show:false})
          alert('something wrong please refresh the page')
           console.log('error is: ',err)
       })
    }
   
  render() {
    return (
      <div>
         <h3>Pending posts</h3>
        {this.state.posts.length>0 && !this.state.show?
        <div>
       
        <List
        style={{paddingLeft: 30,}}
    grid={{ gutter: 16, column: 3 }}
    dataSource={this.state.posts}
    renderItem={(item,index) => (
      <List.Item>
        <Card
    style={{ width: 300 }}
    cover={<img alt="example" style={{height:300}} src={`https://fambo-insta-cristian.s3.amazonaws.com/uploads%2F${item.post.pictureName}`} /> }
    actions={[<Icon type="check" onClick={()=>{this.handleChangeStatus('approved',index)}} />, 
    <Icon type="cross" onClick={()=>{this.handleChangeStatus('rejected',index)}} />]}
  >
    <Meta
      avatar={<Avatar size="large" src={`https://fambo-insta-cristian.s3.amazonaws.com/uploads%2F${item.profilePic}`} />}
      title={item.userName}
      description={
        <div>

          <h4 style={{color:'#5F5F5F'}}>{item.post.description}</h4>
          <StarRatingComponent 
          name="rate" 
          starCount={5}
          // style={{fontSize:20 ,}}
          value={item.post.starrating}
          onStarClick={(nextValue, prevValue, name)=>{this.onStarClick(nextValue,prevValue,name,index)}}
        />
        </div>
      }
    />
  </Card>
      </List.Item>
    )}
  />
       </div >:
         <h4>
         No Posts are pending
       </h4>
      }

       {/* <div></div> */}
       {this.state.show?
      <div style={{paddingLeft:'40%',height:200,paddingTop:'20%'}}>
      <ReactLoading type="spin" color="black" height={50} width={50} />
      </div>
       :null}
      </div>
    )
  }
};
