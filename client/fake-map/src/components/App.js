import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchUsers, selectUser } from "../actions";

import Row from "./row";
import SideBar from "./side-bar";
import UsersMap from "./users-map";
import './style.scss'


class App extends Component {

  componentDidMount() {
    this.props.fetchUsers()
  }

  selectUser = user => {
    this.props.selectUser(user)
  }

  render() {
    const { users, user } = this.props
    if (users.length === 0) return false

    return (
        <Row
            left={<SideBar data={users} onSelectUser={this.selectUser}/>}
            right={<UsersMap data={users} zoom={user}/>}
        />
    );
  }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchUsers, selectUser }, dispatch)
}

const mapStateToProps = ({users, user}) => {
    return { users, user }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
