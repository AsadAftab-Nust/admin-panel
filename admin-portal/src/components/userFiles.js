import React, { Component } from 'react';
import {Col, Row,Tabs,Button} from 'antd'
import ReactTable from "react-table";
import "react-table/react-table.css";


const TabPane = Tabs.TabPane;
export default class UserFiles extends Component {
  constructor(){
      super();
      this.renderElement = this.renderElement.bind(this)
      this.handleDownload = this.handleDownload.bind(this);
      
  }
  handleDownload(info){
this.upload.click();
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
    render() {
        const userFiles = [{
            "fileName":"famboA",
            "uploadDate":"12/03/2018"
        },
        {
            "fileName":"famboB",
            "uploadDate":"11/04/2017"
        },
        {
            "fileName":"famboC",
            "uploadDate":"07/05/2017"
        }]
    return (
      <div style={{textAlign:'center'}}>
        {/* <Row>
                <Col  span={24}> */}
              <Tabs defaultActiveKey="1" tabBarGutter={50} size='small' >
      <TabPane tab="By User" key="1" >
      <ReactTable
          style={{marginTop:10}}
          data={userFiles}
         
         
          columns={[
          
                {
                  Header: "FILENAME",
                  accessor: "fileName"
                },
                
                {
                  Header: "UPLOAD DATE",
                  accessor: "uploadDate"
                },
                
                {
                  Header: "Download",
                  // accessor: "lastPrice",
                  Cell: this.renderElement 
                },
              ]
            }
            noDataText="No files by User"
          defaultPageSize={7}
          className="-striped -highlight"
        />           
             </TabPane>
  
      <TabPane tab="By Amin" key="2">
      <div>
            <div style={{textAlign:'right'}}>
      <Button type="primary" onClick={()=>{this.handleDownload('')}} >
      Upload File
               </Button>
            </div>
      
      <ReactTable
          style={{marginTop:10}}
          data={userFiles}
         
         
          columns={[
          
                {
                  Header: "FILENAME",
                  accessor: "fileName"
                },
                
                {
                  Header: "UPLOAD DATE",
                  accessor: "uploadDate"
                },
                
                {
                  Header: "Download",
                  // accessor: "lastPrice",
                  Cell: this.renderElement 
                },
              ]
            }
            noDataText="No files by Admin"
          defaultPageSize={7}
          className="-striped -highlight"
        />
        </div>
         </TabPane>
         
     
    </Tabs>
    {/* </Col>
    </Row> */}
      </div>
    );
  }
}


