'use strict';

const React = require('react');

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <head>
                    <link rel="stylesheet" href="../css/gamepage.css"/>
                </head>
                <div class="background">
                    <div class="container">
                        <div class="title"><h1>Gator Rush</h1></div>
                    </div>
                    <div class="login-container">
                    </div>  
                    <div class="container"/>
                    <div class="container">
                        <div class="game_description-container"/>
                            <div class="game_description-content">
                                <text>[Description of Game] Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</text>
                            </div>
                    </div>
                    <p class="attribution"><a href="https://www.freepik.com/free-vector/blank-landscape-nature-park-scene-with-swamp_9720494.htm#query=swamp&position=5&from_view=search&track=sph%22%3EImage">Image by brgfx</a> on Freepik</p>
                <p class="attribution-1"><a href="https://www.freepik.com/free-vector/game-ui-menu-interface-scrolls-parchments_31368897.htm#page=2&query=web%20game&position=11&from_view=search&track=sph%22%3EImage">Image by upklyak</a> on Freepik</p>
                </div>
                
            </div>
        );
    }
}

export default Home;