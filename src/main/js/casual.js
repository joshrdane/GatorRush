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
        });

        this.setState({
            loading: false
        })

    }

    render() {
        if (this.state.loading) {
            return <div>Loading!</div>
        } else {

            var problems = this.state.problems.map(function (problem, index) {
                return <div key={index}>{problem.leftOperand} {problem.operator} {problem.rightOperand} =?</div>
            });
            var answers = this.state.problems.map(function (problem, index) {
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
                            <button class="btn-answer">{answers.shift()}</button>
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
}

export default Casual;