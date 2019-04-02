import React, { Component } from 'react';
import axios from 'axios';

import Row from "./row";
import SideBar from "./side-bar";
import UsersMap from "./users-map";


class App extends Component {
  state = {
    users: []
  }
  componentDidMount() {
    axios
        .get('http://localhost:3000/features')
        .then(res => this.setState({users: res.data.features}))
  }

  render() {
    const { users } = this.state

    return (
        <Row
            left={<SideBar data={users}/>}
            right={<UsersMap data={users}/>}
        />
    );
  }
}

export default App;
