import React from 'react';

const Row = ({left, right}) => {
    return (
        <div className="ui grid" style={{paddingBottom: 0}}>
            <div className="four wide column" style={{paddingBottom: 0, paddingRight: 0}}>
                {left}
            </div>
            <div className="twelve wide column" style={{paddingBottom: 0, paddingLeft: 0}}>
                {right}
            </div>
        </div>
    );
}

export default Row;
