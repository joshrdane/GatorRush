'use strict';

const React = require('react');
const client = require('./client');

class Casual extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            level: {
                id: 0,
                name: "0",
                problems: []
            },
            problem: {
                leftOperand: 0,
                operator: '?',
                rightOperand: 0
            },
            wrong: []
        }
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(e) {
        const selection = e.target.value;
        //
        if (selection === this.state.problem.result) {
        } else {
            // Place problem back into rotation
            const probs = this.state.level.problems;
            this.setState({
                problem: probs.at(0),
                level: {
                    problems: probs.slice(1)
                }
            })
        }
    }

    componentDidMount() {
        client({method: 'GET', path: `/api/levels/4/problems`}).done(response => {
            const probs = response.entity._embedded.problems;
            this.setState({
                loading: false,
                problem: probs.at(0),
                level: {
                    problems: probs.slice(1)
                }
            });
        });
    }

    render() {
        if (this.state.loading) {
            return <div>Loading!</div>
        } else {
            return (
                <div className="background">
                    <div className="container">
                        <div className="progress">
                            <div id="levelProgress" className="progress_bar"/>
                        </div>
                    </div>
                    <div className="equation-container">
                        <div className="equation-content">
                            <div>{this.state.problem.leftOperand} {this.state.problem.operator} {this.state.problem.rightOperand} = ?</div>
                        </div>
                    </div>
                    <div className="container"/>
                    <div className="container">
                        {
                            this.state.problem.options.map((option, index) => {
                                return <button key={Math.random() * 10000 + option} className="btn-answer" onClick={this.handleSelect}>{this.state.problem.options.at(index)}</button>
                            })
                        }
                    </div>
                </div>
            );
        }
    }
}

export default Casual;