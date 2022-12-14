import React, {useState} from 'react'
import FormInput from "./formInput";

function CreateAccount(props){
    let trigger = props.trigger;

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

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
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/account/create`, {
            method: 'post',
            headers: {
                username: values.username,
                email: values.email,
                password: values.password
            }
        }).then(response => {
            switch (response.status) {
                case 200:
                    props.handleLogin(e, values.username, values.password);
                    alert("Account created successfully, you are now logged in.");
                    props.handlePageChange(e, "play");
                    break;
                case 400:
                default:
                    alert(`An error has occurred (${response.status}).`)
                    break;
            }
        });
    };

    const handleCancel = () => {
        props.handleTrigger();
    };

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    const popupStyle = {
        position: 'fixed',
        top: '30px',
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        textAlign: 'center',
    };

    const popupInner = {
        position: 'relative',
        padding: '32px',
        width: '100%',
        height: '800px',
        maxWidth: '740px',
        backgroundImage: 'url(/images/Wood_paper.png)',
        backgroundColor: 'transparent',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '600px 800px'
    };


    const headerStyle = {
        color: 'white',
        fontFamily: 'unset',
        textDecoration: 'underline white',
        textShadow: '1.5px 1.5px black',
        marginBottom: '2rem',
        marginTop: '2rem'
    };

    const submitBtnStyle = {
        cursor: 'pointer',
        marginTop: '15px',
    };

    const cancelBtnStyle = {
        width: '30px',
        height: '30px',
        cursor: 'pointer',
        marginTop: '25px'
    };

    return(trigger) ? (
        <div style={popupStyle}>
            <div style={popupInner}>
                <form onSubmit={handleSubmit}>
                    <h1 style={headerStyle}>Create an Account</h1>
                    {
                        inputs.map((input) =>
                            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                        )
                    }
                    <div>
                        <button className={"btn-create-account"} style={submitBtnStyle} >Create Account</button>
                    </div>
                    <img style={cancelBtnStyle} src={"/images/X_Button.png"} alt={"cancel"} onClick={handleCancel}/>
                </form>
            </div>
        </div>
    ) : "";
}


export default CreateAccount;