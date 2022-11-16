
import React from "react";

const ImmediateFeedback = (props) => {

    const {feedback} = props;
    let c = 'green';
    if( feedback === "Not quite. Try again." ) {
        c = 'red';
    }

    const feedbackStyle = {
        textAlign: 'center',
        fontFamily: 'fantasy',
        fontSize: '16px',
        display: 'contents',
        color: c,
    }

    const labelStyle = {
        fontSize: '1rem'
    }

    return (
        <div style={feedbackStyle}>
            {feedback}
        </div>
    );
};

export default ImmediateFeedback;
