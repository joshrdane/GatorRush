'use strict';

const React = require('react');
const client = require('./client');

class Casual extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            problems: []
        }
    }

    componentDidMount() {
        client({method: 'GET', path: `/api/levels/${this.props.level}/problems`}).done(response => {
            console.log(response)
            this.setState({
                problems: response.entity._embedded.problems
            })

            // call setContentStates here to set initial problem/answer button content state ?
        });

        this.setState({
            loading: false
        })

    }

    // function to shift problem/answer & set content 
    setContentStates() {
        // {problems.shift()} <-- this returns a div, need to set it
        // {answers.shift()}
        var x = document.getElementById("2nd");
        var y = document.getElementById("3rd");
        var z = document.getElementById("4th");
        //var y = answers.shift();
        //x.replaceWith(y);
        //x.innerHTML = answers.shift();
        x.innerHTML = Math.floor(Math.random() * 75);    // 0 to 74
        y.innerHTML = Math.floor(Math.random() * 301);   // 0 to 300
        z.innerHTML = Math.floor(Math.random() * 101);   // 0 to 100
    }

    render() {
        if (this.state.loading) {
            return <div>Loading!</div>
        } else {

            var problems = this.state.problems.map(function (problem, index) {
                return <div key={index}>{problem.leftOperand} {problem.operator} {problem.rightOperand} = ?</div>
            });

            // window. <-- marks it as a global variable 
            window.answers = this.state.problems.map(function (problem, index) {
                return <div key={index}>{problem.result}</div>
            });

            return (
                <div>
                    <head>
                        <link rel="stylesheet" href="../css/gamepage.css"/>
                    </head>
                    <div class="background">
                        <div class="container">
                            <div class="progress">
                                <div id="levelProgress" class="progress_bar"/>
                            </div>
                        </div>
                        <div class="equation-container">
                            <div class="equation-content">
                                {problems.shift()}
                            </div>
                        </div>
                        <div class="container"/>
                        <div class="container">
                            <button class="btn-answer" id="1st">{answers.shift()}</button>
                            <button class="btn-answer" onClick={this.setContentStates} id="2nd">2</button>
                            <button class="btn-answer" onClick={this.setContentStates} id="3rd">300</button>
                            <button class="btn-answer" onClick={this.setContentStates} id="4th">4</button>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Casual;