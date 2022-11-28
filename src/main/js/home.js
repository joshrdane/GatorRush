'use strict';

const React = require('react');

import CreateAccount from "./components/createAccount";


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleCreateAcc = this.handleCreateAcc.bind(this);
        this.state = {
            trigger: false
        }
        // this.trigger = false;
    }

    handleLogin(e, username, password) {
        this.props.handleLogin(e, username, password);
    }

    handlePageChange(e, page) {
        this.props.handlePageChange(e, page);

    }

    handleCreateAcc(){
        if(this.state.trigger){
            this.setState({trigger:false});
        }
        else{
            this.setState({trigger:true});
        }

        console.log(this.state.trigger);
    }



    render() {

        return (
            <div className="background">

                <div>
                <div className="container">
                    <div className="title"><p>Gator Rush</p></div>
                </div>

                <div className="container">
                    <img className="alligator-homepage" src="/images/Gator_TransparentBG.png"/>



                    <div className="login-container">

                    </div>






                </div>
                <div className="container">
                    <button data-page={"create-account"} className="btn-sign-up" onClick={this.handleCreateAcc}>Create an Account
                    </button>


                </div>

                <div className="container">
                    <div className="game_description-container">
                        <div className="game_description-content">
                            <p>Gator Rush is an engaging game geared towards helping kids practice and review their math skills. With two different game modes, kids can choose between a casual or challenging experience.
                            </p>
                        </div>
                    </div>
                </div>




                <p className="attribution"><a
                    href="https://www.freepik.com/free-vector/blank-landscape-nature-park-scene-with-swamp_9720494.htm#query=swamp&position=5&from_view=search&track=sph%22%3EImage">Image
                    by brgfx</a> on Freepik</p>
                <p className="attribution-1"><a
                    href="https://www.freepik.com/free-vector/game-ui-menu-interface-scrolls-parchments_31368897.htm#page=2&query=web%20game&position=11&from_view=search&track=sph%22%3EImage">Image
                    by upklyak</a> on Freepik</p>
                </div>

                <CreateAccount trigger = {this.state.trigger} handleLogin={this.handleLogin} handleTrigger={this.handleCreateAcc} handlePageChange={this.handlePageChange}/>

            </div>
        );
    }
}

export default Home;