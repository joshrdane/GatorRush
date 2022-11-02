import MainMenu from './mainmenu';

'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            
            <div>
                <head>
                <link rel="stylesheet" href="/css/gamepage.css"/>
                </head>
                <div>
                    <MainMenu />
                </div>
                <div class="background">
                    <div class="container"/>
                    <div class="equation-container">
                        <div class="equation-content">5 x 3 = ?</div>
                    </div>
                    <div class="container"/>
                    <div class="container">
                        <button class="btn-answer">10</button>
                        <button class="btn-answer">2</button>
                        <button class="btn-answer">300</button>
                        <button class="btn-answer">4</button>
                    </div> 
                    <p class="attribution"><a href="https://www.freepik.com/free-vector/blank-landscape-nature-park-scene-with-swamp_9720494.htm#query=swamp&position=5&from_view=search&track=sph%22%3EImage">Image by brgfx</a> on Freepik</p>
                    <p class="attribution-1"><a href="https://www.freepik.com/free-vector/game-ui-menu-interface-scrolls-parchments_31368897.htm#page=2&query=web%20game&position=11&from_view=search&track=sph%22%3EImage">Image by upklyak</a> on Freepik</p>
                </div>
            </div>
                
                
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)