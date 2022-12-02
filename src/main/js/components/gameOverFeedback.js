import React from 'react'

const headerStyle = {
    color: '#f88f1b',
    marginBottom: '1rem'
}

const questionStyle = {
    color: '#494e97',
    marginTop: '2rem',
    fontSize: '2rem'
}

const responseStyle = {
    color: '#a34242'
}

const answerStyle = {
    color: '#49b049'
}

const feedbackStyle = {
    color: '#e81986'
}

function GameOverFeedback(props){
    let incorrectQuestion = props.incorrectQuestion[0];
    return(props.incorrectQuestion.length > 0) ? (
        <div key={incorrectQuestion.question}>
            <h1 style={headerStyle}>Review</h1>
            <h3 style={questionStyle}>{incorrectQuestion.question}</h3>
            <p style={responseStyle}> response: {incorrectQuestion.response}</p>
            <p style={answerStyle}>answer: {incorrectQuestion.answer}</p>

        </div>


    ) : <p style={feedbackStyle}>{props.feedback}</p>;
}

export default GameOverFeedback;