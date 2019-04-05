import React, {Component} from 'react';

class SideBar extends Component {

    render() {
        const { data } = this.props
        return (
            <div
                className="ui relaxed divided list"
                style={{backgroundColor: '#eaeaea',boxShadow: '3px 0px 4px -4px #000000ba', height: '100vh', overflow: 'auto'}}
            >
                {data.map(user => (
                    <div className="item" key={user.properties.id} style={{padding: 8}}>
                        <img className="ui avatar image" src={user.properties.avatar} />
                            <div className="content">
                                <a className="header">{user.properties.userName}</a>
                                <div className="description">
                                    {user.properties.email}
                                </div>
                            </div>
                    </div>

                ))}
            </div>
        );
    }
}

export default SideBar;
