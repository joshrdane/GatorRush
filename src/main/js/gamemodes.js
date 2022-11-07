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
                                <text>[Description of Timed Mode]</text>
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
                <p class="attribution"><a href="https://www.freepik.com/free-vector/blank-landscape-nature-park-scene-with-swamp_9720494.htm#query=swamp&position=5&from_view=search&track=sph%22%3EImage">Image by brgfx</a> on Freepik</p>
                <p class="attribution-1"><a href="https://www.freepik.com/free-vector/game-ui-menu-interface-scrolls-parchments_31368897.htm#page=2&query=web%20game&position=11&from_view=search&track=sph%22%3EImage">Image by upklyak</a> on Freepik</p>
            </div>
        );
    }
}

export default GameModes;