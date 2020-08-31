import React, { Component } from 'react';  
import {Row,Col,Input,Button,Icon} from 'antd'
import config from '../config'
import axios from 'axios'
import ReactTable from "react-table";
import "react-table/react-table.css";
import ReactLoading from 'react-loading';
import Loading from './loading'
import dateFormat from 'dateformat'
import {CSVLink} from 'react-csv';
const Search = Input.Search

export default class UsersList extends Component {
  constructor(){
    super();
    this.state={
     data:[],
     tempData:[],
     waiting:false,
     exportData:[]
    }

    this.renderElement = this.renderElement.bind(this)
    this.changeAbility = this.changeAbility.bind(this)
    this.renderDate = this.renderDate.bind(this)
  }
  componentDidMount(){
    let current = this;
    axios.get(config.getAllUsers)
    .then(function(response){
      // console.log(response.data)
      
      let temp = response.data;
      for(let i=0;i<temp.length;i++){
        let date =  temp[i].creationDate;
        temp[i].creationDate = dateFormat(date, "mmmm dS, yyyy")
      }
      current.setState({data:temp,tempData:temp})
    })
    .catch(function(err){
      console.log('error is: ',err)
    })
  }
  handleSearch(e){
    let value = e.target.value.toLowerCase();
    // console.log('count of value is',value.length)
    // console.log('search value is ',e.target.value)
    let temp=[];
    if(value.length>2){
      for(let i=0;i<this.state.tempData.length;i++){
        if(this.state.tempData[i].name.toLowerCase().includes(value)||
        this.state.tempData[i].email.toLowerCase().includes(value)){
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

  changeAbility(data){
   
      this.setState({data:data,tempData:data})
   
  }
  renderElement(cellInfo){
    return(
       <div>
   
   <Loading waiting={this.state.waiting} changeAbility={this.changeAbility}
            id={this.state.data[cellInfo.index]._id} status={this.state.data[cellInfo.index].isDisabled}/>
    </div>
    );
  }
  renderDate(cellInfo){
    return(
       <div>
   
   <p>{dateFormat(this.state.data[cellInfo.index].creationDate, "mmmm dS, yyyy")}</p>
    </div>
    );
  }

  render() {
    const header = [
      {label: 'Name', key: 'name'},
      {label: 'Email', key: 'email'},
      {label: 'Joining Date', key: 'creationDate'},
    ]
    return (
      <div>
     <h3 style={{textAlign:'center'}}>Users List</h3>

     <Row gutter={30}>
      <Col span={6} offset={2}>
      <Search
      placeholder="input search text"
      onChange={e => {this.handleSearch(e)}}
    />
      </Col>
      {/* <Col span={6}></Col> */}
      <Col span={6} offset={9}>
      {/* <Button type="primary">Export List</Button> */}
      <CSVLink data={this.state.data} headers={header}
  filename={"users-list.csv"}
  className="btn btn-primary"
  target="_blank">
    Export List
</CSVLink>
      </Col>
      </Row>
      <Row>
        <Col span={20} offset={2}>
        <ReactTable
          style={{marginTop:10}}
          data={this.state.data}
          // getTdProps={(state, rowInfo, column, instance) => {
          //   return {
          //     onClick: (e, handleOriginal) => {

          //      this.props.handleClick(rowInfo.original._id)
                
          //     }
          //   };
          // }}
         
          columns={[
          
                {
                  Header: "NAME",
                  accessor: "name"
                },
                
                {
                  Header: "EMAIL",
                  accessor: "email"
                },
                
                {
                  Header: "JOINING DATE",
                  // Cell:this.renderDate
                  accessor:"creationDate"
                },
                
               
                {
                  Header: "DISABLED",
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

