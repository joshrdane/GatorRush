import React from 'react'

const questionStyle = {
    color: 'white',
    marginTop: '2rem',
    marginBottom: '3rem',
    fontSize: '2rem',
    textShadow: '1px 1px black',
}

const feedbackStyle = {
    color: '#e81986'
}

function GameOverFeedback(props){
    let incorrectQuestion = props.incorrectQuestion[0];
    return(props.incorrectQuestion.length > 0) ? (
        <div key={incorrectQuestion.question}>
            <h3 style={questionStyle}>{incorrectQuestion.question} = 
                <span><span style={{color: "red"}}>{incorrectQuestion.response}</span></span>
                (<span><span style={{color: "green"}}>{incorrectQuestion.answer}</span></span>)
            </h3>
        </div>
    ) : <p style={feedbackStyle}>{props.feedback}</p>;
}

export default GameOverFeedback;