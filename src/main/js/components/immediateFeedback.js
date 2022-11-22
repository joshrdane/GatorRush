import React from 'react'

function ImmediateFeedback(props){
    let setTrigger = props.trigger;
    let isCorrect = props.isCorrect;

    let bgColor = '';
    let color = '';

    let feedback = []

    let feedbackIndex = Math.floor(Math.random() * 4);

    // will change the style and feedback message depending if the user selected the correct answer or not
    if(isCorrect){
        color = 'green';
        bgColor = 'white';
        feedback = ["Great job!", "You got it!", "Awesome!", "You did it!"]
    }
    else{
        color = 'red';
        bgColor = 'white';
        feedback = ["Try again!", "You're almost there!", "So close!", "You can do this!"]
    }

    const popupStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        textAlign: 'center'
    }

    const popupInner = {
        position: 'relative',
        padding: '32px',
        width: '100%',
        maxWidth: '340px',
        backgroundColor: bgColor,
        color: color,
        borderRadius: '2rem'
    }

    return(setTrigger) ? (
        <div style={popupStyle}>
            <div style={popupInner}>
                <h3>{feedback[feedbackIndex]}</h3>
            </div>
        </div>
    ) : "";
}

export default ImmediateFeedback;