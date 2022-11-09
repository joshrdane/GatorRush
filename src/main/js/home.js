'use strict';

const React = require('react');

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="background">
                <div className="container">
                    <div className="title"><h1>Gator Rush</h1></div>
                </div>
                <div className="login-container">
                </div>
                <div className="container"/>
                <div className="container">
                    <div className="game_description-container"/>
                    <div className="game_description-content">
                        <p>Gator Rush is an engaging game geared towards helping kids practice and review their math skills. With two different game modes, kids can choose between a casual or challenging experience.
                        </p>
                    </div>
                </div>
                <p className="attribution"><a
                    href="https://www.freepik.com/free-vector/blank-landscape-nature-park-scene-with-swamp_9720494.htm#query=swamp&position=5&from_view=search&track=sph%22%3EImage">Image
                    by brgfx</a> on Freepik</p>
                <p className="attribution-1"><a
                    href="https://www.freepik.com/free-vector/game-ui-menu-interface-scrolls-parchments_31368897.htm#page=2&query=web%20game&position=11&from_view=search&track=sph%22%3EImage">Image
                    by upklyak</a> on Freepik</p>
            </div>
        );
    }
}

export default Home;