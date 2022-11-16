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
                    <div className="container">
                        <div className="game_mode-container">
                            <div className="game_mode-content">
                                <p>Master your math skills! Answer most questions correctly to advance levels. Each level gets progressively harder then the previous. Higher levels test your multiplication and division skills.</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="container-column">
                    <button className="btn-game_mode" data-page={"timetrial"} onClick={this.handlePageChange}>Timed Mode</button>
                    <div className="container">
                        <div className="game_mode-container">
                            <div className="game_mode-content">
                                <p>Race against the clock! Get as many questions as you can correct before the timer runs out. But be careful, if you pick the wrong answer the level is over. Try to beat your top score!</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default GameModes;