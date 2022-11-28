
import React from 'react';

const Score = (props) => {
    
    const {totalScore} = props;

    const scoreboard = {
        // width: '300px',
        // border: '15px solid green',
        // padding: '50px',
        // margin: '20px',
        textAlign: 'center',
        fontFamily: 'fantasy',
        fontSize: '3rem',
        display: 'block',
        // backgroundColor: '#92c6ef',
        color: '#055160',

    }

    const labelStyle = {
        fontSize: '1rem'
    }

    return (
        <div style={scoreboard}>
            <div>{totalScore}</div>
            <div style={labelStyle}>POINTS</div>
        </div>
    );
};

export default Score;
