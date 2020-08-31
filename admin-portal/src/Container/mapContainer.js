import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MarkerComp from '../components/markerComp'
import axios from 'axios'
import config from '../config'
import ReactLoading from 'react-loading';
import {Modal,Button,Col,Row,Input,Popconfirm,message} from 'antd'
import StarRatingComponent from 'react-star-rating-component';
import Geocode from "react-geocode";
import LocationSearch from '../components/locationSearch'


export default class MapContainer extends Component {
    constructor(){
        super();
        this.state={
            posts:[],
            loading:true,
            selectedPost:{post:{status:''}},
            showModal:false,
            rating:0,
            edit:false,
            address:'',
            newLocation:{
              latitude:0,
              longitude:0
            },
            newAddress:'',
            newDescription:'',
            index:0
            
        }
        this.openModal = this.openModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this)
        this.changeLocation = this.changeLocation.bind(this)
        this.changeAddress = this.changeAddress.bind(this);
        this.handleSave = this.handleSave.bind(this)
    }
    changeIndex = (index)=>{
      this.setState({index:index})
    }

    handleSave(){
      let current = this;
      axios.post(config.editPost,{
        "userId" : this.state.selectedPost.userId,
  "location" : this.state.newLocation,
            "postId" :this.state.selectedPost.post._id,
            "description":this.state.newDescription,
            "rating":this.state.selectedPost.post.starrating
      })
      .then(function(response){
        // current.setState({selectedPost:response.data})
        let temp = current.state.selectedPost;
        temp.post.location = current.state.newLocation;
        temp.post.description = current.state.newDescription;
        current.setState({selectedPost:temp,edit:false,address:current.state.newAddress})
        
      })
      .catch(function(err){
        console.log('error in changes post is: ',err);
        alert('There is something wrong please try again. Sorry!')
      })
  // console.log('selected post is :',this.state.selectedPost)
    }

    changeAddress(address){
    
      this.setState({newAddress:address});
    }

    changeLocation(location){
      this.setState({newLocation:{latitude:location.lat,longitude:location.lng}})
    }
    onStarClick(nextValue, prevValue, name) {
        let temp = this.state.selectedPost;
        temp.post.starrating = nextValue;
        this.setState({selectedPost:temp})
      }
    openModal(data,index){
      let temp = data;
      let current = this;
      this.setState({index:index})
      Geocode.setApiKey("AIzaSyDQ2AYtfKZURjUbw5VqBHcSsT1Ay3hXxyI");
      Geocode.fromLatLng(temp.post.location.latitude, temp.post.location.longitude).then(
        response => {
          const address = response.results[0].formatted_address;
          // console.log('address is:',address);
          // temp.address=address;
          current.setState({showModal:true,selectedPost:temp,address:address,newDescription:data.post.description})
        },
        error => {
          console.error('error is : ',error);
          alert('something went wrong please try again.Thanks')
        }
      );
      // console.log('address is: ',temp.address)
        
    }
    handleCancel(){
        this.setState({showModal:false,selectedPost:{post:{status:''}}})
    }

    componentWillMount(){
        let current = this;
        current.setState({show:true})
         axios.get(config.getAllPosts)
         .then(function(response){
           
            console.log('dat recieved is: ',response.data)
            current.setState({posts:response.data,loading:false})
         })
         .catch(function(err){
           current.setState({show:false})
            alert('something wrong please refresh the page')
             console.log('error is: ',err)
         })
      }
      handleChangeStatus(status){
        let current = this;
        axios.post(config.changePostStatus,{
          "postId":this.state.selectedPost.post._id,
  "status":status,
  "rating":this.state.selectedPost.post.starrating,
  "targetUserId":this.state.selectedPost.userId,
  "postPicture":this.state.selectedPost.post.pictureName
        })
        .then(response=>{
            // console.log('response data is: ',response.data)
          let temp = this.state.posts;
          temp[this.state.index].post.status =status; 
          current.setState({posts:temp,showModal:false});
          console.log('tmep is :',temp)
        })
        .catch(function(error){
          console.log('error  in changing status is: ',error)
        })
      }


      deletePost = ()=>{
        axios.delete(`${config.deletePost}/${this.state.selectedPost.userId}/${this.state.selectedPost.post._id}`)
        .then(response=>{
          let temp = this.state.posts;
          temp.splice(this.state.index,1)
          this.setState({posts:temp,showModal:false});
          message.success('Post deleted Successfully')
        })
        .catch(err=>{
          console.log('error in deleting post is: ',err)
          message.error('Error in deleting Post. Please try again!')
        })
      }

  render() {
      
    return (
      <div>
        <h3>All Posts</h3>
        {this.state.loading?
             <div style={{paddingLeft:'40%',height:200,paddingTop:'20%'}}>
             <ReactLoading type="spin" color="black" height={50} width={50} />
             </div>
            :
        <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDupCI8SOcl2g6MdpGfdyuZWcjmorTEnGU' }}
         
          defaultCenter={[41.902783, 12.496366]}
          defaultZoom={13}
        >
        {this.state.posts.map((item,index)=>(
 <MarkerComp
 lat={item.post.location.latitude}
 lng={item.post.location.longitude}
 data={item}
 open={this.openModal}

 index={index}
/>
        ))}
         
        </GoogleMapReact>
      </div>}

      <Modal
          title={this.state.selectedPost.userName}
          visible={this.state.showModal}
        //   onOk={this.handleOk}
          onCancel={this.handleCancel}
          
          footer={
            this.state.selectedPost.post.status==='pending'?  
            [
            
            <Button key="Reject" type="danger" onClick={()=>{this.handleChangeStatus('rejected')}} >Reject</Button>,
           
           <Button key="Approve" type="primary" onClick={()=>{this.handleChangeStatus('approved')}} >
              Approve
            </Button>,
            <Popconfirm title="Are you sure delete this task?" onConfirm={this.deletePost} onCancel={()=>{console.log('cancel')}} okText="Yes" cancelText="No">
             <Button key="delete" type="danger">
             Delete
           </Button>
           </Popconfirm>
          ]
          : this.state.selectedPost.post.status==='rejected'? 
          [
            
            // <Button key="Reject" type="danger" onClick={()=>{this.handleChangeStatus('rejected')}} >Reject</Button>,
           
           <Button key="Approve" type="primary" onClick={()=>{this.handleChangeStatus('approved')}} >
              Approve
            </Button>,
              <Popconfirm title="Are you sure delete this task?" onConfirm={this.deletePost} onCancel={()=>{console.log('cancel')}} okText="Yes" cancelText="No">
              <Button key="delete" type="danger">
              Delete
            </Button>
            </Popconfirm>
          ]:[
            <Button key="Reject" type="danger" onClick={()=>{this.handleChangeStatus('rejected')}} >Reject</Button>,
            <Popconfirm title="Are you sure delete this task?" onConfirm={this.deletePost} onCancel={()=>{console.log('cancel')}} okText="Yes" cancelText="No">
            <Button key="delete" type="danger">
            Delete
          </Button>
          </Popconfirm>
          ]}
        // }
        >
        <div style={{textAlign:'center'}}>

          <Row gutter={10}>
          <Col span={11} offset={1}>
          <img src={`https://fambo-insta-cristian.s3.amazonaws.com/uploads%2F${this.state.selectedPost.post.pictureName}`} style={{width:'100%'}}/>
          </Col>
          <Col span={11} style={{textAlign:'left'}}>
          {!this.state.edit?
          <div>
          <h3>Description: </h3>
         <h4 style={{color:'#929292'}}>{this.state.selectedPost.post.description}</h4>
         
         {/* <Input value={this.state.selectedPost.post.description}  */}
         <h3>Address: </h3>
         <h4 style={{color:'#929292'}}>{this.state.address}</h4>
         <div style={{textAlign:'center'}}>
         <StarRatingComponent 
          name="rate" 
          starCount={5}
          value={this.state.selectedPost.post.starrating}
          onStarClick={(nextValue, prevValue, name)=>{this.onStarClick(nextValue,prevValue,name)}}
        />
        </div>
        <div style={{textAlign:'right'}}>
        <Button key="Edit" type="primary" onClick={()=>{this.setState({edit:true,newDescription:this.state.selectedPost.post.description})}} >
        Edit
        </Button>
        </div>
        </div>
        :
        <div>
           <h3>Description: </h3>
         {/* <h4 style={{color:'#929292'}}>{this.state.selectedPost.post.description}</h4> */}
         
         <Input value={this.state.newDescription} 
                onChange={(e)=>{this.setState({newDescription: e.target.value})}}
         /> 
         <h3>Address: </h3>
         {/* <Input value={this.state.selectedPost.address}/> */}
         <LocationSearch address={this.state.address}
                        changeLocation={this.changeLocation}
                        changeAddress = {this.changeAddress}
         />
         <div style={{textAlign:'center'}}>
         <StarRatingComponent 
          name="rate" 
          starCount={5}
          value={this.state.selectedPost.post.starrating}
          onStarClick={(nextValue, prevValue, name)=>{this.onStarClick(nextValue,prevValue,name)}}
        />
        </div>
        <div style={{textAlign:'right'}}>
        <Row>
          <Col span={16} style={{textAlign:'right'}} >
          <Button key="Cencel" type="default" onClick={()=>{this.setState({edit:false})}} >
        Cencel
        </Button>
          </Col>
          <Col span={8}  >
          <Button key="Save" type="primary" onClick={this.handleSave} >
        Save
        </Button>
          </Col>
          </Row>
        
        </div>
          </div>
        }
          </Col>
            </Row>
          {/* <img src={`https://fambo-insta-cristian.s3.amazonaws.com/uploads%2F${this.state.selectedPost.post.pictureName}`} style={{height:250,width:300}}/>
            
         <h3>Description: </h3>
         <h4 style={{paddingLeft:20,paddingRight:20}}>{this.state.selectedPost.post.description}</h4>

          <StarRatingComponent 
          name="rate" 
          starCount={5}
          value={this.state.selectedPost.post.starrating}
          onStarClick={(nextValue, prevValue, name)=>{this.onStarClick(nextValue,prevValue,name)}}
        /> */}
             </div>
        </Modal>
      </div>
    )
  }
};
