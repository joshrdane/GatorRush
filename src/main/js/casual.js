'use strict';
import TimerBar from './components/timerBar';
import Timer from './components/timer';
import Score from "./components/score";
import ImmediateFeedback from "./components/ImmediateFeedback";

const React = require('react');

class Casual extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            score: 0,
            trigger: false,
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

        this.setState({trigger: true});

        // will close immediate feedback popup after 1000 ms
        setTimeout(() => {
            this.setState({trigger: false});
        }, 1000)

        // adding to score if question is correct (UPDATE scoring algorithm later)
        if(current.response === current.result){
            this.setState({score: this.state.score + 1})
            this.setState({isCorrect: true})
        }
        else{
            this.setState({isCorrect: false})
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
            // reset the progress bar for the next level
            this.updateProgressBar(0);
            
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

    updateProgressBar(value) {
        let progressbar = document.getElementById("levelProgress");

        value = parseInt((value / 7) * 100);

        if (value == 0) {
            value = 5;
        } else if (value > 100) {
            value = 100;
        }

        if (value >= 0 && value <= 100) {
            progressbar.style.width = value + "%";
        }
    }
    
    render() {
        if (this.state.loading) {
            return <div>Loading!</div>
        } else {
            return (
                <div className="background">
                    <img className="alligator-casual" src="/images/Gator_TransparentBG.png"/>
                    <div className="container">
                        {/*<ImmediateFeedback feedback={this.state.feedback}/>*/}
                    </div>
                    <div className="container">
                        <div className="progress">
                            <div id="levelProgress" className="progress_bar"/>
                        </div>
                    </div>
                    <div className="container"/>
                    <div className="equation-container">
                        <div className="equation-content">
                            <div>{this.state.problem.leftOperand} {this.state.problem.operator} {this.state.problem.rightOperand} = ?</div>
                        </div>

                        <ImmediateFeedback trigger = {this.state.trigger} isCorrect = {this.state.isCorrect} />
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