import React from 'react'
import {useState} from "react";

const FormInput = (props) => {

    let errorDisplay = 'none'



    const formStyle = {
        display: 'flex',
        flexDirection: 'column'

    }

// CSS for the input box
    const inputStyle = {
        padding: '10px',
        margin: '5px 0px',
        backgroundColor: 'rgb(239 151 74)',
        background: 'url(images/Wood2.png) center center / 28rem 4rem no-repeat',
        height: '4rem',
        width: '28rem',
        border: '0',
        textAlign: 'center',
        color: 'orange',
        outline: 'none'

    }


// CSS for input label
    const labelStyle = {
        fontSize: '17px',
        textAlign: 'center',
        textShadow: '1px 1px black'

    }


// CSS for the error message
    const spanStyle = {
        fontSize: '10px',
        // padding: '1.5px',
        color: '#fe6c6c',
        display: errorDisplay

    }

    const{errorMessage, label, onChange, id, ...inputProps} = props;

    const[focused, setFocused] = useState(false);

    const handleFocus = (e) => {
        setFocused(true);
    }

    return(
        <div style={formStyle}>
            <label style={labelStyle}>{label}</label>
            <input style={inputStyle} {...inputProps} onChange={onChange} onBlur={handleFocus}  focused={focused.toString()} />
            <span className="error-create-account"> {errorMessage}</span>
        </div>
    )
}

export default FormInput