'use strict';

const React = require('react');

class Casual extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            level: {
                id: 0,
                name: '0',
                problems: []
            },
            problem: {
                id: 0,
                leftOperand: 0,
                operator: '?',
                rightOperand: 0,
                options: []
            },
            history: []
        }
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(e) {
        let current = this.state.problem;
        current.response = parseInt(e.target.innerHTML);
        // Create a 'new' history instance
        let newHistory = this.state.history.concat(current);
        /* Post to attempts */
        // Temporary logic until we get authentication
        let user = null;
        if (user) {
            // Saves attempt to database
            fetch(`http://localhost:8080/attempt/challenge?user=${user}&problem=${this.state.problem.id}&response=${current.response}`, {method: 'post'});
        }
        // Check local history for completion criteria
        let correct = 0;
        // Ensure at least 10 problems have been attempted
        if (newHistory.length >= 10) {
            // Get last 10 problems attempted
            for (let problem of newHistory.slice(-10)) {
                if (problem.response === problem.result) {
                    correct++;
                }
            }
        }
        if (correct >= 7) {
            // TODO: Add error handling for 400 & 400 errors
            // TODO: Add handle final level completion error 418
            fetch(`http://localhost:8080/level?${user === null ? `id=${this.state.level.id}` : `user=${user}`}`, {method: 'post'})
                .then(response => response.json())
                .then(response => {
                    this.setState({
                        // Blanket drop response level JSON into level
                        level: response
                    });
                    this.setState({
                        // Set problem to the first problem in level
                        problem: this.state.level.problems.at(0),
                        level: {
                            // The next two lines are required to not nullify the existing values
                            id: this.state.level.id,
                            name: this.state.level.name,
                            // Set remaining problems to exclude removed problem
                            problems: this.state.level.problems.slice(1)
                        },
                        // Reset history for new level
                        history: []
                    });
                });
            // TODO: Show history? note: use newHistory
        } else {
            this.setState({
                problem: this.state.level.problems.at(0),
                level: {
                    // The next two lines are required to not nullify the existing values
                    id: this.state.level.id,
                    name: this.state.level.name,
                    // Set remaining problems to exclude removed problem and add previous problem
                    problems: this.state.level.problems.slice(1).concat(this.state.problem)
                },
                history: newHistory
            });
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/level?id=13785')
            .then(response => response.json())
            .then(response => {
                this.setState({
                    level: response
                });
                this.setState({
                    loading: false,
                    problem: this.state.level.problems.at(0),
                    level: {
                        // The next two lines are required to not nullify the existing values
                        id: this.state.level.id,
                        name: this.state.level.name,
                        problems: this.state.level.problems.slice(1)
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
                                return (
                                    <button
                                        key={`${this.state.level.id}-${this.state.problem.id}-${index}-${option}-${this.state.history.length}`}
                                        className="btn-answer"
                                        onClick={this.handleSelect}>
                                        {this.state.problem.options.at(index)}
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            );
        }
    }
}

export default Casual;