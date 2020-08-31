import React, { Component } from 'react';
import { Row, Col, Input, Button, Modal } from 'antd'
import ReactTable from "react-table";
import "react-table/react-table.css";
import AddOffice from '../components/addOffice'
import axios from 'axios'
import config from '../config'
import AddOperator from '../components/addOperator'
const Search = Input.Search



export default class Office extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      data: [],
      office: '',
      address: '',
      tel: '',
      email: '',
      info: [],
      tempData: [],
      officeData: [],
      operatorModal: false,
      operatorOffice: '',
      operator: '',
      selectedId: '',
      showInfo:false
    }
    this.handleOffice = this.handleOffice.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleTel = this.handleTel.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.showOperatorModal = this.showOperatorModal.bind(this);
    this.handleOperatorModalOK = this.handleOperatorModalOK.bind(this);
    this.handleOPeratorModalCencel = this.handleOPeratorModalCencel.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
  }
  showOperatorModal() {
    this.setState({ operatorModal: true });
  }
  handleOperator(value) {
    this.setState({ operator: value })
  }
  handleOperatorModalOK() {
    let temp = this.state.info;
    let current = this;
    console.log('id is  ',this.state.selectedId)
    let operator =
      {
        "office": this.state.office,
        "operator": this.state.operator,
        "tel": this.state.operator,
        "email": this.state.email
      }
    axios.post(config.addOperator, { 'id': this.state.selectedId, "operator": operator })
      .then(function (response) {
        temp.push(operator);
        current.setState({ info: temp, operatorModal: false })
      })
      .catch(function (error) {
        alert('something wrong please try again!')
      });
    this.setState({ operatorModal: false });
  }

  handleOPeratorModalCencel() {
    this.setState({ operatorModal: false })
  }
  handleAddress(value) {
    this.setState({ address: value })
  }
  handleEmail(value) {
    this.setState({ email: value })
  }
  handleOffice(value) {
    this.setState({ office: value })
  }
  handleTel(value) {
    this.setState({ tel: value })
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {

    let temp = this.state.data;
    let newOffice = {
      "office": this.state.office,
      "address": this.state.address,
      "tel": this.state.tel,
      "email": this.state.email
    };
    let current = this;
    axios.post(config.addOffice, newOffice)
      .then(function (response) {
        // temp.push(newOffice);
        current.setState({ data: response.data, tempData: response.data, visible: false })
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
  componentDidMount() {
    let current = this;
    axios.get(config.getOffice)
      .then(function (response) {
        console.log('data get is: ', response.data)
        current.setState({ data: response.data, tempData: response.data });
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    // this.setState({data:temp,tempData:temp});
  }
  handleSearch(e) {
    let value = e.target.value.toLowerCase();
    // console.log('temp data is :',this.state.tempData)
    let temp = [];
    if (value.length > 2) {
      for (let i = 0; i < this.state.tempData.length; i++) {
        if (this.state.tempData[i].office.toLowerCase().includes(value) ||
          this.state.tempData[i].address.toLowerCase().includes(value) ||
          this.state.tempData[i].tel.toLowerCase().includes(value)) {
          // console.log('count',i)
          temp.push(this.state.tempData[i]);
        }
      }
      this.setState({ data: temp });

    }
    else {
      this.setState({ data: this.state.tempData });
    }
  }


  render() {

    return (
      <div>
        <h2>Office</h2>
        <Row gutter={30}>
          <Col span={6} offset={3}>
            <Search
              placeholder="input search text"
              onChange={e => { this.handleSearch(e) }}
            />
          </Col>
          {/* <Col span={6}></Col> */}
          <Col span={6} offset={6}>
            <Button type="primary" onClick={this.showModal}>ADD OFFICE</Button>
          </Col>
        </Row>
        <Row>
          <Col span={20} offset={2}>
            <ReactTable
              // style={{cursor:'pointer'}}
              style={{ marginTop: 10 }}
              data={this.state.data}
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {

                    let current = this;
                    axios.post(config.getOperators, { "id": rowInfo.original._id })
                      .then(function (response) {
                        console.log('id is:', rowInfo.original._id)
                        current.setState({
                          info: response.data[0].operators,
                          selectedId: rowInfo.original._id, office: rowInfo.original.office,
                          showInfo:true
                        })
                      })
                      .catch(function (error) {
                        // alert('something wrong please try again!')
                        current.setState({showInfo:true,office: rowInfo.original.office,selectedId: rowInfo.original._id})
                        console.log('error is ',error)
                      });
                    // console.log("A Td Element was clicked!");
                    // console.log("it produced this event:", e);
                    // console.log("It was in this column:", column);
                    // console.log("It was in this row:", rowInfo.original._id);
                    // console.log("It was in this table instance:", instance);
                    // this.setState({ info: this.state.data })

                  }
                };
              }}
              columns={[

                {
                  Header: "OFFICE",
                  accessor: "office"
                },

                {
                  Header: "ADDRESS",
                  accessor: "address"
                },

                {
                  Header: "TEL",
                  accessor: "tel"
                },

                {
                  Header: "EMAIL",
                  accessor: "email"
                },

              ]
              }
              noDataText="No offces registered"
              defaultPageSize={5}
              className="-striped -highlight"
            />
          </Col>
        </Row>
        <br />
        <br />
        {this.state.info.length > 0 ?
          <Row>
            <Col span={20} offset={2}>
              <hr />
            </Col>
          </Row> : null}

        <br />
        {this.state.showInfo?
          <Row>
            <Col span={20} offset={2}>
              <Row>
                <Col span={8}>
                  <h3 style={{ textAlign: 'left' }}>Office Information</h3>
                </Col>
                <Col span={8}>
                  <Button type="primary" onClick={this.showOperatorModal}>ADD OPERATOR</Button>

                </Col>
                <Col span={8} style={{ textAlign: 'right' }}>
                  <Button type="primary" shape="circle" icon="close" size="small" onClick={() => { this.setState({ info: [],showInfo:false }) }} />
                </Col>
              </Row>
              { this.state.info.length>0?
              <ReactTable
                style={{ marginTop: 10 }}
                data={this.state.info}
                columns={[

                  {
                    Header: "OPERATOR",
                    accessor: "operator"
                  },

                  {
                    Header: "OFFICE",
                    accessor: "office"
                  },

                  {
                    Header: "TEL",
                    accessor: "tel"
                  },

                  {
                    Header: "EMAIL",
                    accessor: "email"
                  }

                ]
                }
                noDataText="No Operators Registerd"
                defaultPageSize={4}
                className="-striped -highlight"
              />
              : <h3 style={{marginTop:'30px'}}>There is no operator in this office.</h3>}
              </Col>
          </Row>
          :null}
          
        <Modal
          title="Add Office"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddOffice
            handleOffice={this.handleOffice}
            handleAddress={this.handleAddress}
            handleTel={this.handleTel}
            handleEmail={this.handleEmail} />
        </Modal>
        <Modal
          title="Add Operator"
          visible={this.state.operatorModal}
          onOk={this.handleOperatorModalOK}
          onCancel={this.handleOPeratorModalCencel}
        >
          <AddOperator
            handleOperator={this.handleOperator}
            handleTel={this.handleTel}
            handleEmail={this.handleEmail}
            office={this.state.office} />
        </Modal>
      </div>
    );
  }
}

