import MainMenu from './mainmenu';
import Home from './home';
import GameModes from './gamemodes';
import Casual from './casual';


'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    // instead of returning casual
        // try adding background component
        // would need to swap content for each page 
    // give background an id -> id == "background"
        // that would go to div next to class 
        // <div class="background" id="background"/> [might be exactly this]
        // <div class="background">
            // <div id="backgroundContent">
    // how do you change the content of web page dynamically with react


    // return (<Casual />)
    render() {
        return (
            <div>
                <MainMenu/>
                <div class="background">
                    <GameModes />
                </div>
            </div>  
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)