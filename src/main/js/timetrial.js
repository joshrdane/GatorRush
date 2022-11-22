'use strict';
import ImmediateFeedback from './components/ImmediateFeedback';
import TimerBar from './components/timerBar';


const React = require('react');

class TimeTrial extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            score: 0,
            feedback: '',
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

        // adding to score if question is correct (UPDATE scoring algorithm later)
        if(current.response === current.result){
            //this.setState({score: this.state.score + 1}) // use score algo
            this.incrementScore();
            this.setState({feedback: "Great job!"})
        }
        else{
            this.setState({feedback: "Not quite. Try again."})
        }

        // Check local history for completion criteria
        let correct = 0;
        // Get last 10 problems attempted
        for (let problem of newHistory.slice(-10)) {
            if (problem.response === problem.result) {
                correct++;
            }
        }


        if (correct >= 7) {
            // TODO: Add error handling for 400 & 400 errors
            // TODO: Add handle final level completion error 418
            fetch(`http://localhost:8080/level?${user === null ? `id=${this.state.level.id}` : `user=${user}`}`, {method: 'post'})
                .then(response => response.json())
                .then(response => {
                    console.log(response.id);
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

    incrementScore() {
        
        let lowerOperand = this.state.problem.leftOperand;
        
        if (this.state.problem.rightOperand < lowerOperand) {
            lowerOperand = this.state.problem.rightOperand;
        }

        let incrementAmount = 0;

        if (lowerOperand < 2) {
            incrementAmount = 1;
        }
        else if (lowerOperand < 11) {
            incrementAmount = 2;
        }
        else {
            incrementAmount = 3;
        }

        if (this.state.problem.operator === 'x' || this.state.problem.operator === '/') {
            ++incrementAmount;
        }
        
        this.setState({score: this.state.score + incrementAmount})
    }
    
    render() {
        if (this.state.loading) {
            return <div>Loading!</div>
        } else {
            return (
                <div className="background">
                    <img className="alligator-casual" src="/images/Gator_TransparentBG.png"/>
                    <div className="container">
                        <div className="container-column">
                        <div className="score">{this.state.score}</div>
                        <TimerBar />
                        </div>
                    </div>
                    
                    <div className="container"/>
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

export default TimeTrial;