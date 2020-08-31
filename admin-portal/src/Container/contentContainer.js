import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import PendingPosts from './pendingPosts'
import ApprovedPosts from './approvedPosts'
import RegisterNewAdmin from './registerNewAdmin'
import MapContainer from './mapContainer'
import AddUser from './AddUser'
import Booking from './Booking'
import Category from './Category'
import EditUser from './EditUser'
import PushNotification from './PushNotification'
import UsersList from './usersList'

export default class ContentContainer extends Component {
  render() {
    return (
      <div>
      <Route path="/" exact component={MapContainer}/>
      <Route path="/pending-posts" exact component={PendingPosts}/>
        <Route path="/approved-posts" component={ApprovedPosts}/>
        <Route path="/register-new-admin" component={RegisterNewAdmin}/>
        <Route path="/send-notification" component={PushNotification}/>
        <Route path="/users" component={UsersList}/>
        {/* <Route path="/edit-user" component={EditUser}/>
        <Route path="/office" component={Office}/>
        <Route path="/push-notification" component={PushNotification}/> */}
      </div>
    );
  }
}

