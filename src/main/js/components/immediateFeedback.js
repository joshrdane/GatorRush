
import React from "react";



const ImmediateFeedback = (props) => {



    const {feedback} = props;

    let c = 'green';

    if( feedback === "Incorrect, Too bad :(" ) {
        c = 'red';
    }



    const feedbackStyle = {
        textAlign: 'center',
        fontFamily: 'fantasy',
        fontSize: '3rem',
        display: 'block',
        color: c,


    }


    const labelStyle = {
        fontSize: '1rem'
    }

    return (
        <div style={feedbackStyle}>
            <div style={labelStyle}>{feedback}</div>
        </div>
    );
};

export default ImmediateFeedback;
