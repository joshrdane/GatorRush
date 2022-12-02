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

function QuestionReviewContent(props){
    let questions = props.levelIncorrect;
    return(!props.perfectScore) ? (
        <div>
            <h1 style={headerStyle}>Review</h1>

            {questions.map(question => (
                <div key={question.question}>
                    <h3 style={questionStyle}>{question.question}</h3>
                    <p style={responseStyle}> response: {question.response}</p>
                    <p style={answerStyle}>answer: {question.answer}</p>

                </div>

            ))}
        </div>

    ) : <div>
        <h1 style={headerStyle}>Perfect!</h1>
    </div>;
}

export default QuestionReviewContent;