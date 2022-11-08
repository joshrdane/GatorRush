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
                    <div className="game_mode-container"/>
                    <div className="game_description-content">
                        <p>[Description of Casual Mode]</p>
                    </div>
                </div>
                <div className="container-column">
                    <button className="btn-game_mode">Timed Mode</button>
                    <div className="game_mode-container"/>
                    <div className="game_description-content">
                        <p>[Description of Timed Mode]</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameModes;