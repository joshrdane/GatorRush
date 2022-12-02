import React from 'react'
import QuestionReviewContent from "./questionReviewContent";
function QuestionReview(props){
    let setTrigger = props.trigger;

    let arr = props.levelIncorrect;

    let perfectScore = false;

    if(arr.length === 0){
        perfectScore = true;
    }




    const handleCancel = (e) => {
        props.handleTriggerReview();
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
        textAlign: 'center',

    }

    const popupInner = {
        position: 'relative',
        padding: '32px',
        width: '100%',
        maxWidth: '440px',
        overflow: 'auto',
        backgroundImage: 'url(/images/Wood_paper.png)',
        backgroundColor: 'transparent',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '440px 540px',
        maxHeight: '440px'
    }

    const nextBtnStyle = {

        cursor: 'pointer',
        marginTop: '15px',

    }

    return(setTrigger) ? (
        <div style={popupStyle}>
            <div style={popupInner}>
                <QuestionReviewContent levelIncorrect={props.levelIncorrect} perfectScore = {perfectScore} />
                <button className="btn-create-account" style={nextBtnStyle} onClick={handleCancel} >Next Level</button>

            </div>


        </div>
    ) : "";
}

export default QuestionReview;