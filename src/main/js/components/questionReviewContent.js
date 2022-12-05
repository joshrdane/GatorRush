import React from 'react'

const headerStyle = {
    marginBottom: '3rem',
    color: 'white',
    fontSize: '3rem',
    marginTop: '5rem',
    textShadow: '1px 1px black',
}

const questionStyle = {
    color: 'white',
    marginTop: '2rem',
    marginBottom: '3rem',
    fontSize: '2rem',
    textShadow: '1px 1px black',
}

const responseStyle = {
    color: '#a34242'
}

const answerStyle = {
    color: '#49b049'
}

function QuestionReviewContent(props){
    let questions = props.levelIncorrect;
    return(!props.perfectScore) ? (
        <div>
            <h1 style={headerStyle}>Review Questions</h1>
            {questions.map(question => (
                <div key={question.question}>
                    <h3 style={questionStyle}>{question.question} =
                    <span><span style={{color: "red"}}>{question.response}</span></span>
                    (<span><span style={{color: "green"}}>{question.answer}</span></span>)
                    </h3>
                </div>

            ))}
        </div>

    ) : <div>
        <h1 style={headerStyle}>Perfect!</h1>
    </div>;
}

export default QuestionReviewContent;