'use strict';
import FormInput from './components/formInput';

const React = require('react');

import { useState} from "react";


const CreateAcc = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            label: "Username",
            errorMessage: "Username should be 4-15 characters and shouldn't include any special character!",
            pattern: "^[A-Za-z0-9]{4,15}$",
            required: true

        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            label: "Email",
            errorMessage: "It should be a valid email address!",
            required: true

        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "Password",
            label: "Password",
            errorMessage: "Password is required",
            required: true,


        },
        {
            id: 4,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            label: "Confirm Password",
            errorMessage: "Passwords don't match!",
            required: true,
            pattern: values.password

        }
    ]


    const handleSubmit = (e) => {
        e.preventDefault();

        // create user account, send user info to DB
    }

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    console.log(values);

    const headerStyle = {
        color: 'white',
        fontFamily: 'unset',
        textDecoration: 'underline white',
        textShadow: '1.5px 1.5px black',
        marginBottom: '2rem',


    }

    const submitBtnStyle = {

        cursor: 'pointer',
        marginTop: '15px',

    }

    return (
        <div className="background">
            <img className="alligator-casual" src="/images/Gator_TransparentBG.png"/>

            <div className="container">
                <div className="create_account-container">
                    <div className="game_description-content">

                        <form onSubmit={handleSubmit}>
                            <h1 style={headerStyle}>Create an Account</h1>
                            {inputs.map((input) => (
                                <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                            ))}


                            <button className="btn-sign-up" style={submitBtnStyle}>Submit</button>
                        </form>


                    </div>
                </div>
            </div>


        </div>
    );

}

export default CreateAcc;