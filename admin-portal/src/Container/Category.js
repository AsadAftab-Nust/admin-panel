import React, { Component } from 'react';
import {Row,Col,Input,Button,Modal} from 'antd'
import ReactTable from "react-table";
import "react-table/react-table.css";
import AddCategory from '../components/addCategory'
import config from '../config'
import axios from 'axios'
const Search = Input.Search


export default class Category extends Component {
  constructor(){
    super();
    this.state = { 
      visible: false,
      data1:[],
      tempData:[],
    category:'',
    practices:'',
    office:'',
    data:'',
    userName:'',
    showInfo:false,
    selectedCategory:''
    }
    this.handleCategory=this.handleCategory.bind(this);
    this.handlePractices = this.handlePractices.bind(this);
    this.handleOffice=this.handleOffice.bind(this);
    this.handleData = this.handleData.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.renderElement = this.renderElement.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }
  handleDownload(cell){
    this.upload.click()
  }

  renderElement(cellInfo){
    return(
       <div>
      <Button type="primary" shape="circle" icon="download" size="small" onClick={()=>{this.handleDownload(cellInfo)}} />
     <input type="file"
     ref={(ref)=>{this.upload=ref;}} 
     onChange={(e)=>{this.handleFile(e)}}
   name="file" id="file" className="inputfile" />
  
    </div>
    );
  }
  handleCategory(value){
    this.setState({category:value})
  }
  handleOffice(value){
    this.setState({office:value})
  }
  handlePractices(value){
    this.setState({practices:value})
  }
  handleData(value){
    this.setState({data:value})
  }
  handleUserName(value){
    this.setState({userName:value})
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    // console.log(e);
    let temp = this.state.data1;
    let current = this;
    let newCategory = {
      "category":this.state.category,
      "practices":this.state.practices,
      "office":this.state.office,
      "data":this.state.data,
      "userName":this.state.userName
    }
    axios.post(config.addCategory, newCategory)
    .then(function (response) {
      temp.push(newCategory);
      // current.setState({ data: temp, tempData: temp, visible: false })
      current.setState({
        visible: false,
        data1:temp,
        tempData:temp
      });
    })
    .catch(function (error) {
      alert('something wrong please try again!')
    });
    
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  componentDidMount(){
    let current = this;
    axios.get(config.getCategories)
      .then(function (response) {
        current.setState({ data1: response.data, tempData: response.data });
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
// this.setState({data1:temp,tempData:temp});
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
        this.state.tempData[i].userName.toLowerCase().includes(value)){
          // console.log('count',i)
          temp.push(this.state.tempData[i]);
        }
      }
      this.setState({data1:temp});

    }
    else{
      this.setState({data1:this.state.tempData});
    }
  }
  render() {
    const catInfo = [
      {
        "fileName":"A",
        "uploadDate":"03/03/2018"
      },
      {
        "fileName":"B",
        "uploadDate":"04/03/2018"
      },
      {
        "fileName":"C",
        "uploadDate":"05/05/2018"
      },
      {
        "fileName":"D",
        "uploadDate":"04/01/2017"
      },
    ]
    return (
      <div>
      <h2>Categories</h2>
      <Row gutter={30}>
      <Col span={6} offset={3}>
      <Search
      placeholder="input search text"
      onChange={e => {this.handleSearch(e)}}
    />
      </Col>
      {/* <Col span={6}></Col> */}
      <Col span={6} offset={6}>
      <Button type="primary" onClick={this.showModal}>ADD Category</Button>
      </Col>
      </Row>
      <Row>
        <Col span={20} offset={2}>
        <ReactTable
        // style={{cursor:'pointer'}}
          style={{marginTop:10}}
          data={this.state.data1}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                this.setState({showInfo:true, selectedCategory:rowInfo.original.category})
              }
            };
          }}
          columns={[
          
                {
                  Header: "CATEGORIES",
                  accessor: "category"
                },
                
                {
                  Header: "PRACTICES",
                  accessor: "practices"
                },
                
                {
                  Header: "OFFICE",
                  accessor: "office"
                },
                
                {
                  Header: "DATA",
                  accessor: "data"
                },
                {
                  Header: "UserName",
                  accessor: "userName"
                },
              ]
            }
            noDataText="There are no category registerd"
          defaultPageSize={5}
          className="-striped -highlight"
        />
        </Col>
      </Row>


     <br/>
        {this.state.showInfo?
          <Row>
            <Col span={20} offset={2}>
              <Row>
                <Col span={8}>
                  <h3 style={{ textAlign: 'left' }}><span><b>{this.state.selectedCategory}</b></span> Files Information:</h3>
                </Col>
               
                <Col span={16} style={{ textAlign: 'right' }}>
                  <Button type="primary" shape="circle" icon="close" size="small" onClick={() => { this.setState({ showInfo:false }) }} />
                </Col>
              </Row>
              <ReactTable
                style={{ marginTop: 10 }}
                data={catInfo}
                columns={[

                  {
                    Header: "FILE NAME",
                    accessor: "fileName"
                  },

                  {
                    Header: "UPLOAD DATE",
                    accessor: "uploadDate"
                  },
                  
                {
                  Header: "Download",
                  Cell: this.renderElement 
                },
                ]
                }
                noDataText="There are no files in this Cat."
                defaultPageSize={4}
                className="-striped -highlight"
              />
              </Col>
          </Row>
          :null}
          
      <Modal
          title="Add Category"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddCategory handleCategory={this.handleCategory}
                        handlePractices={this.handlePractices}
                        handleOffice = {this.handleOffice}
                        handleData={this.handleData}
                        handleUserName={this.handleUserName}/>
        </Modal>
      </div>
    );
  }
}

