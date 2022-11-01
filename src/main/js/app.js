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
                <div class="background-test">
                    <div class="equation-container">
                        <div class="equation-content">5 x 3 = ?</div>
                    </div>
                    
                    <button class="btn-answer btn-answer-1">10</button>
                    <button class="btn-answer btn-answer-2">200</button>
                    <button class="btn-answer btn-answer-3">3</button>
                    <button class="btn-answer btn-answer-4">40</button>
                </div>
            </div>
                
                
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)