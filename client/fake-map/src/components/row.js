import React from 'react';

const Row = ({left, right}) => {
    return (
        <div className="ui grid">
            <div className="four wide column">
                {left}
            </div>
            <div className="twelve wide column">
                {right}
            </div>
        </div>
    );
}

export default Row;
