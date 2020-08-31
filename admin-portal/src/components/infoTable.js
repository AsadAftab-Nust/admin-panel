import React, { Component } from 'react';
import {Col, Row} from 'antd'
import ReactTable from "react-table";

export default class InfoTable extends Component {
  constructor(){
      super();
  }
 
    render() {
    return (
      <div>
          <Row>
              <Col span={4} offset={3}>
              <h3>Surname: </h3>
              </Col>
              <Col span={4} >
              <p style={{fontSize:'17px'}}>{this.props.data.surName}</p>
              </Col>

              <Col span={4} offset={3}>
              <h3>Name: </h3>
              </Col>
              <Col span={4} >
              <p style={{fontSize:'17px'}}>{this.props.data.name}</p>
              </Col>
              
          </Row>
          <Row>
              <Col span={4} offset={3}>
              <h3>Gender: </h3>
              </Col>
              <Col span={4} >
              <p style={{fontSize:'17px'}}>{this.props.data.gender}</p>
              </Col>

              <Col span={4} offset={3}>
              <h3>DOB: </h3>
              </Col>
              <Col span={4} >
              <p style={{fontSize:'17px'}}>{this.props.data.dob}</p>
              </Col>
              
          </Row>
          <Row>

<Col span={4} offset={3}>
<h3>Email: </h3>
</Col>
<Col span={4} >
{this.props.data.italianAddress.emailAddress!==''?
<p style={{fontSize:'17px'}}>{this.props.data.italianAddress.emailAddress}</p>
:
<p style={{fontSize:'17px'}}>{this.props.data.abroadAddress.emailAddress}</p>}

</Col>
<Col span={4} offset={3}>
<h3>Telephone: </h3>
</Col>
<Col span={4} >
{this.props.data.italianAddress.telephoneNumber!==''?
<p style={{fontSize:'17px'}}>{this.props.data.italianAddress.telephoneNumber}</p>
:
<p style={{fontSize:'17px'}}>{this.props.data.abroadAddress.telephoneNumber}</p>}

</Col>

</Row>
          <Row>
              <Col span={4} offset={3}>
              <h3>Fiscal Code: </h3>
              </Col>
              <Col span={4} >
              <p style={{fontSize:'17px'}}>{this.props.data.fiscalCode}</p>
              </Col>

              <Col span={4} offset={3}>
              <h3>Codice Com: </h3>
              </Col>
              <Col span={4} >
              <p style={{fontSize:'17px'}}>{this.props.data.codiceCom}</p>
              </Col>
              
          </Row>
          <Row>

              <Col span={4} offset={3}>
              <h3>Status: </h3>
              </Col>
              <Col span={4} >
              <p style={{fontSize:'17px'}}>{this.props.data.otherData.deceased}</p>
              </Col>
              <Col span={4} offset={3}>
              <h3>Is Deceased: </h3>
              </Col>
              <Col span={4} >
              <p style={{fontSize:'17px'}}>{this.props.data.otherData.deceasedDate}</p>
              </Col>
              
          </Row>

          <Row>

              <Col span={4} offset={3}>
              <h3>Nationality: </h3>
              </Col>
              <Col span={4} >
              <p style={{fontSize:'17px'}}>{this.props.data.otherData.nationality}</p>
              </Col>
              <Col span={4} offset={3}>
              <h3>State: </h3>
              </Col>
              <Col span={4} >
              {this.props.data.italianAddress.state!==''?
              <p style={{fontSize:'17px'}}>{this.props.data.italianAddress.state}</p>
              :
              <p style={{fontSize:'17px'}}>{this.props.data.abroadAddress.state}</p>}
              
              </Col>
              
          </Row>

          <Row>

<Col span={4} offset={3}>
<h3>Office: </h3>
</Col>
<Col span={4} >
{this.props.data.italianAddress.office!==''?
<p style={{fontSize:'17px'}}>{this.props.data.italianAddress.office}</p>
:
<p style={{fontSize:'17px'}}>{this.props.data.abroadAddress.office}</p>}

</Col>
<Col span={4} offset={3}>
<h3>Employer: </h3>
</Col>
<Col span={4} >
{this.props.data.italianAddress.employer!==''?
<p style={{fontSize:'17px'}}>{this.props.data.italianAddress.employer}</p>
:
<p style={{fontSize:'17px'}}>{this.props.data.abroadAddress.employer}</p>}

</Col>

</Row>

          <Row>

<Col span={4} offset={3}>
<h3>Address: </h3>
</Col>

<Col span={16} >
{this.props.data.italianAddress.address!==''?
<p style={{fontSize:'17px'}}>{this.props.data.italianAddress.address}</p>
:
<p style={{fontSize:'17px'}}>{this.props.data.abroadAddress.address}</p>}

</Col>

</Row>

          

      </div>
    );
  }
}


