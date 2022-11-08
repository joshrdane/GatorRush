'use strict';

const React = require('react');

class GameModes extends React.Component {

    constructor(props) {
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(e, page) {
        this.props.handlePageChange(e, e.target.dataset.page);
    }

    render() {
        return (
            <div>
                <head>
                    <link rel="stylesheet" href="../css/gamepage.css"/>
                </head>
                <div class="background">
                        <div class="container-column">
                            <button class="btn-game_mode" data-page={"casual"} onClick={this.handlePageChange}>Casual Mode</button>
                            <div class="game_mode-container"/>
                            <div class="game_description-content">
                                <text>[Description of Casual Mode]</text>
                            </div>
                        </div>
                        <div class="container-column">
                            <button class="btn-game_mode">Timed Mode</button>
                            <div class="game_mode-container"/>
                            <div class="game_description-content">
                                <text>[Description of Timed Mode]</text>
                            </div>
                        </div>                 
                </div>
            </div>
        );
    }
}

export default GameModes;