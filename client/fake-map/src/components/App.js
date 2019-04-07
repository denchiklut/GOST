import React, { Component } from 'react';
import axios from 'axios';

import Row from "./row";
import SideBar from "./side-bar";
import UsersMap from "./users-map";


class App extends Component {
  state = {
    users: [],
    user: null
  }

  componentDidMount() {
    axios
        .get('http://localhost:3000/features')
        .then(res => this.setState({users: res.data.features}))
  }

  selectUser = user => {
    this.setState({user})
  }

  render() {
    const { users } = this.state
    if (users.length === 0) return false

    return (
        <Row
            left={<SideBar data={users} onSelectUser={this.selectUser}/>}
            right={<UsersMap data={users} zoom={this.state.user}/>}
        />
    );
  }
}

export default App;
