import React, {Component} from 'react';

class SideBar extends Component {

    render() {
        const { data } = this.props
        return (
            <div className="ui relaxed divided list">
                {data.map(user => (
                    <div className="item" key={user.properties.id}>
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
