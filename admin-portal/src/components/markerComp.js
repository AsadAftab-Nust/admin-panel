import React, { Component } from 'react';

export default class MarkerComp extends Component {
    constructor(){
        super();
        this.state={
            markerType:''
        }
        
    }
    componentWillMount(){
        if(this.props.data.post.status==='pending'){
            this.setState({markerType:'4px solid yellow'})
        }
        else if(this.props.data.post.status==='rejected'){
            this.setState({markerType:'4px solid red'})
        }
        else{
            this.setState({markerType:'4px solid green'})
        }
    }
  render() {
    return (
      <div onClick={()=>{this.props.open(this.props.data,this.props.index)}} >
        <img src={`https://fambo-insta-cristian.s3.amazonaws.com/uploads%2F${this.props.data.post.pictureName}`} style={{height:40,width:40,borderTop:this.props.data.post.status==='rejected'?'4px solid red':this.props.data.post.status==='approved'?'4px solid green':'4px solid yellow'}}/>
             </div>
    )
  }
};
