import React from 'react'
import GameOverFeedback from "./gameOverFeedback";

function GameOver(props){
    let setTrigger = props.trigger;




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
        overflow: 'auto',
        backgroundImage: 'url(/images/Wood_paper.png)',
        backgroundColor: 'transparent',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '480px 575px',
        width: '480px',
        height: '550px',

    }

    const nextBtnStyle = {

        cursor: 'pointer',
        marginTop: '15px',

    }

    const handlePlayAgain = (e) => {
        props.handlePageChange(e, e.target.dataset.page);
    }

    const headerStyle = {
        marginBottom: '2rem',
        color: '#ab6304',
        fontSize: '3rem',
        marginTop: '1rem'
    }

    const scoreStyle = {
        marginTop: '2rem',
        marginBottom: '2rem',
        fontSize: '2rem',
        color: '#5b5bc0'
    }



    return(setTrigger) ? (
        <div style={popupStyle}>
            <div style={popupInner}>
                <h1 style={headerStyle}>Game Over</h1>
                <GameOverFeedback feedback={props.feedback} incorrectQuestion={props.incorrectQuestion}/>
                <h3 style={scoreStyle}>Final Score: {props.score}</h3>
                <button className="btn-create-account" style={nextBtnStyle} data-page={"play"} onClick={handlePlayAgain} >Play Again</button>

            </div>


        </div>
    ) : "";
}

export default GameOver;