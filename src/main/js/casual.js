'use strict';
import ImmediateFeedback from './components/ImmediateFeedback';
import QuestionReview from "./components/questionReview";

const React = require('react');

class Casual extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            token: props.token,
            score: 0,
            triggerFeedback: false,
            triggerReview: false,
            isCorrect: false,
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
            history: [],
            levelIncorrect: []
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.handleTriggerReview = this.handleTriggerReview.bind(this)
    }

    handleSelect(e) {
        let current = this.state.problem;
        current.response = parseInt(e.target.innerHTML);
        // Create a 'new' history instance
        let newHistory = this.state.history.concat(current);
        /* Post to attempts */
        if (this.state.token != null) {
            // Saves attempt to database
            fetch(`http://localhost:8080/attempt/casual?problem=${this.state.problem.id}&response=${current.response}`, {
                method: 'post',
                headers: {
                    token: this.state.token
                }
            });
        }

        this.setState({triggerFeedback: true});

        // will close immediate feedback popup after 1000 ms
        setTimeout(() => {
            this.setState({triggerFeedback: false});
        }, 1000)

        // adding to score if question is correct (UPDATE scoring algorithm later)
        if(current.response === current.result){
            this.setState({isCorrect: true})
        }
        else{
            this.setState({isCorrect: false})

            let question = this.state.problem.leftOperand + " " + this.state.problem.operator + " " + this.state.problem.rightOperand
            let questionReview = {question: question, response: current.response, answer: current.result}
            this.state.levelIncorrect = this.state.levelIncorrect.concat(questionReview);
        }

        // Check local history for completion criteria
        let correct = 0;
        // Get last 10 problems attempted
        for (let problem of newHistory.slice(-10)) {
            if (problem.response === problem.result) {
                correct++;
                this.updateProgressBar(correct);
            }
        }


        if (correct >= 7) {

            this.setState({triggerReview: true})

            // reset history, so that the question answered in the previous level do not affect the progress of the new level
            this.state.history = [];

            // reset the progress bar for the next level
            this.updateProgressBar(0);

            let header = {}
            if (this.state.token != null) {
                header = {
                    token: this.state.token
                }
            }
            fetch(`http://localhost:8080/level?id=${this.state.level.id}`, {
                method: 'post',
                headers: header
            }).then(response => {
                switch (response.status) {
                    case 200:
                        response.json().then(response => {
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
                        break;
                    case 418:
                        alert("Congrats, you have completed all levels!");
                        break;
                    default:
                        alert(`Oops! Something went wrong. Try refreshing the page. ${response.status}`);
                        break;
                }
            });
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
        let header = {};
        if (this.state.token != null) {
            header = {
                token: this.state.token
            };
        }
        fetch('http://localhost:8080/level', {
            method: 'get',
            headers: header
        }).then(response => {
            switch (response.status) {
                case 200:
                    response.json().then(response => {
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
                    break;
                case 418:
                    alert("Congrats, you have completed all levels!");
                    break;
                default:
                    alert(`Oops! Something went wrong. Try refreshing the page. ${response.status}`);
                    break;
            }
        });
    }

    updateProgressBar(value) {
        let progressbar = document.getElementById("levelProgress");

        value = (parseInt(value) / 7) * 100;

        if (value === 0) {
            value = 5;
        } else if (value > 100) {
            value = 100;
        }

        if (value >= 0 && value <= 100) {
            progressbar.style.width = value + "%";
        }
    }
        handleTriggerReview(){
            if(this.state.triggerReview){
                this.setState({triggerReview: false})
                // reset incorrect questions answered for the next level
                this.state.levelIncorrect = [];
            }
        }
    
    render() {
        if (this.state.loading) {
            return (
                <div>Loading!</div>
            );
        } else {
            return (
                <div className="background">
                    <img className="alligator-casual" alt={"alligator"} src={"/images/Gator_TransparentBG.png"}/>
                    <div className={"container"}>
                        <div className={"container-column"}>
                            <div className={"score"}>
                                <p>{this.state.level.name}</p>
                            </div>
                            <div className={"progress"}>
                                <div id={"levelProgress"} className={"progress_bar"}/>
                            </div>
                        </div>
                    </div>
                    <div className={"container"}/>
                    <div className={"equation-container"}>
                        <div className={"equation-content"}>
                            <div>{this.state.problem.leftOperand} {this.state.problem.operator} {this.state.problem.rightOperand} = ?</div>
                        </div>
                        <ImmediateFeedback trigger = {this.state.triggerFeedback} isCorrect={this.state.isCorrect}/>
                        <QuestionReview handleTriggerReview = {this.handleTriggerReview} trigger={this.state.triggerReview} levelIncorrect={this.state.levelIncorrect}/>
                    </div>
                    <div className={"container"}/>
                    <div className={"container"}>
                        {
                            this.state.problem.options.map((option, index) => {
                                return (
                                    <button
                                        key={`${this.state.level.id}-${this.state.problem.id}-${index}-${option}-${this.state.history.length}`}
                                        className={"btn-answer"}
                                        onClick={this.handleSelect}>
                                        {this.state.problem.options.at(index)}
                                    </button>
                                );
                            })
                        }
                    </div>
                </div>
            );
        }
    }
}

export default Casual;