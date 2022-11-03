import MainMenu from './mainmenu';

'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <MainMenu />
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)