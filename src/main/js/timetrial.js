'use strict';
import TimerBar from './components/timerBar';
import GameOver from './components/gameOver';


const React = require('react');

class TimeTrial extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            token: props.token,
            score: 0,
            feedback: '',
            problem: {
                id: 0,
                leftOperand: 0,
                operator: '?',
                rightOperand: 0,
                options: []
            },
            history: [],
            triggerGameOver: false,
            gameOverFeedback: "",
            incorrectQuestion: []
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handleSelect(e) {
        let current = this.state.problem;
        current.response = parseInt(e.target.innerHTML);
        /* Post to attempts */
        if (this.state.token != null) {
            // Saves attempt to database
            fetch(`http://localhost:8080/attempt/challenge?problem=${this.state.problem.id}&response=${current.response}`, {
                method: 'post',
                headers: {
                    token: this.state.token
                }
            });
        }

        // adding to score if question is correct
        if(current.response === current.result){
            this.incrementScore();
            this.setState({feedback: "Great job!"})
        }
        else{
            this.setState({triggerGameOver: true})
            let question = this.state.problem.leftOperand + " " + this.state.problem.operator + " " + this.state.problem.rightOperand
            let questionReview = {question: question, response: current.response, answer: current.result}
            this.state.incorrectQuestion = this.state.incorrectQuestion.concat(questionReview);

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

    handlePageChange(e, page) {
        this.props.handlePageChange(e, page);
    }

    incrementScore() {
        
        let lowerOperand = this.state.problem.leftOperand;
        
        if (this.state.problem.rightOperand < lowerOperand) {
            lowerOperand = this.state.problem.rightOperand;
        }

        let incrementAmount;

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
        
        this.setState({
            score: this.state.score + incrementAmount
        });
    }

    timeOverAlert() {
        this.setState({gameOverFeedback: "Time is up!"});
        this.setState({triggerGameOver: true});
        this.uploadScore();
    }

    uploadScore() {
        fetch(`http://localhost:8080/challenge/score?score=${this.state.score}`, {
            method: 'post',
            headers: {
                token: this.state.token
            }}).then(response => {
                switch (response.status) {
                    case 200:
                        break;
                    case 400:
                    default:
                        console.log(`Failed uploading score with response code ${response.status}.`);
                }
        });
    }
    
    render() {
        if (this.state.loading) {
            return <div>Loading!</div>
        } else {
            return (
                <div className={"background"}>
                    <img className={"alligator-casual"} alt={"alligator"} src={"/images/Gator_TransparentBG.png"}/>
                    <div className={"container"}>
                        <div className={"container-column"}>
                        <div className={"score"}>{this.state.score}</div>
                        <TimerBar timeOverAlert={() => this.timeOverAlert()} />
                        </div>
                    </div>
                    
                    <div className={"container"}/>
                    <div className={"equation-container"}>
                        <div className={"equation-content"}>
                            <div>{this.state.problem.leftOperand} {this.state.problem.operator} {this.state.problem.rightOperand} = ?</div>
                        </div>
                        <GameOver  incorrectQuestion = {this.state.incorrectQuestion} feedback = {this.state.gameOverFeedback} trigger = {this.state.triggerGameOver}  handlePageChange={this.handlePageChange} score = {this.state.score} />
                    </div>
                    <div className={"container"}/>
                    <div className={"container"}>
                        {
                            this.state.problem.options.map((option, index) => {
                                return (
                                    <button
                                        key={`${this.state.problem.id}-${index}-${option}-${this.state.history.length}`}
                                        className={"btn-answer"}
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