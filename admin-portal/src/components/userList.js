import React, { Component } from 'react';
import {Row,Col,Input,Button,Icon} from 'antd'
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../Container/uploadButton.css"
import axios from 'axios'
import config from '../config'

const Search = Input.Search


export default class UserList extends Component {
  constructor() {
    super();
    this.state={
      data:[],
      tempData:[],
      file:null,
      selectedUser:'',
      // usersList:[]
    }
    this.handleUpload = this.handleUpload.bind(this);
   this.renderElement = this.renderElement.bind(this);
  }
  handleUpload(cellInfo){
    this.upload.click()
    this.setState({selectedUser:cellInfo.original.office})
    console.log('handleUpload',cellInfo.original.office,'upload is : ')
    // alert('upload data of row number ',cellInfo.index)
    // this.upload.click;
  }
  handleFile(e,cellInfo){
    this.setState({file:e.target.files[0]})
  }
  renderElement(cellInfo){
    return(
       <div>
      {/* <Button type="primary" shape="circle" icon="upload" size="small" onClick={()=>{this.handleUpload(cellInfo)}} />
     <input type="file"
     ref={(ref)=>{this.upload=ref;}} 
     onChange={(e)=>{this.handleFile(e)}}
   name="file" id="file" className="inputfile" />
   */}
   {this.state.data[cellInfo.index].preferred?
    <Icon type="check" style={{color:'blue',fontSize:'15px'}}/>
    :null}
    </div>
    );
  }
  componentDidMount(){
    let current = this; 
    axios.get(config.getAllUsers)
      .then(function (response) {
        // console.log('all users are: ',response.data)
        current.setState({data:response.data,tempData:response.data})
      })
      .catch(function (error) {
        console.log(error);
        alert('there is something wrong. Please refresh the page.')
      });
    
  }
  handleSearch(e){
    let value = e.target.value.toLowerCase();
    // console.log('count of value is',value.length)
    // console.log('search value is ',e.target.value)
    let temp=[];
    if(value.length>2){
      for(let i=0;i<this.state.tempData.length;i++){
        if(this.state.tempData[i].office.toLowerCase().includes(value)||
        this.state.tempData[i].category.toLowerCase().includes(value)||
        this.state.tempData[i].nome.toLowerCase().includes(value)){
          // console.log('count',i)
          temp.push(this.state.tempData[i]);
        }
      }
      this.setState({data:temp});

    }
    else{
      this.setState({data:this.state.tempData});
    }
  }
  render() {
    
    return (
      <div>
      <h2>Users List</h2>
      <Row gutter={30}>
      <Col span={6} offset={3}>
      <Search
      placeholder="input search text"
      onChange={e => {this.handleSearch(e)}}
    />
      </Col>
      {/* <Col span={6}></Col> */}
      <Col span={6} offset={6}>
      {/* <Button type="primary">ADD Category</Button> */}
      </Col>
      </Row>
      <Row>
        <Col span={20} offset={2}>
        <ReactTable
          style={{marginTop:10}}
          data={this.state.data}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {

               this.props.handleClick(rowInfo.original._id)
                
              }
            };
          }}
         
          columns={[
          
                {
                  Header: "SURNAME",
                  accessor: "surName"
                },
                
                {
                  Header: "NAME",
                  accessor: "name"
                },
                
                {
                  Header: "FISCAL CODE",
                  accessor: "fiscalCode"
                },
                
                {
                  Header: "CODICE COM",
                  accessor: "codiceCom"
                },
                // ,
                // {
                //   Header: "NOME UTENTE",
                //   accessor: "nome"
                // },
                {
                  Header: "PREFERRED USER",
                  // accessor: "lastPrice",
                  Cell: this.renderElement 
                },
              ]
            }
            noDataText="No Users Registered"
          defaultPageSize={7}
          className="-striped -highlight"
        />
        </Col>
      </Row>
     
      </div>
    );
  }
}

