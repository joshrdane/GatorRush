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

        // adding to score if question is correct
        if(current.response === current.result){
            this.incrementScore();
            this.setState({feedback: "Great job!"})
        }
        else{
            this.setState({feedback: "Not quite. Try again."})
        }

        this.loadNewProblem();
    }

    loadNewProblem() {
        fetch('http://localhost:8080/problem')
            .then(response => response.json())
            .then(response => {
                this.setState({
                    loading: false,
                    problem: response
                });
            });
    }

    componentDidMount() {
        this.loadNewProblem();
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

    timeOverAlert() {
        alert("Time is up!");
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
                        <TimerBar timeOverAlert={() => this.timeOverAlert()} />
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
                                        key={`${this.state.problem.id}-${index}-${option}-${this.state.history.length}`}
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