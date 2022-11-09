'use strict';

const React = require('react');

class GameModes extends React.Component {

    constructor(props) {
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(e) {
        this.props.handlePageChange(e, e.target.dataset.page);
    }

    render() {
        return (
            <div className="background">
                <div className="container-column">
                    <button className="btn-game_mode" data-page={"casual"} onClick={this.handlePageChange}>Casual Mode
                    </button>
                    <div className="game_mode-container">
                        <div className="game_mode-content">
                            <p>[Description of Casual Mode]</p>
                        </div>
                    </div>
                </div>
                <div className="container-column">
                    <button className="btn-game_mode">Timed Mode</button>
                    <div className="game_mode-container">
                        <div className="game_mode-content">
                            <p>Race against the clock! Get as many questions as you can correct before the timer runs out. But be careful, if you pick the wrong answer the level is over. Try to beat your top score!</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameModes;