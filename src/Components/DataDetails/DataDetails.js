import React from 'react';

export const DataDetails = ({ title, info }) => {
    return (
        <div className="dataDetails">
            <div className="title">{ title }</div>
            <div className="info">{ info }</div>
        </div>
    )
}