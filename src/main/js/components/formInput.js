import React, {useState} from 'react'

const FormInput = (props) => {
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '40px'
    };

    // CSS for the input box
    const inputStyle = {
        padding: '5px',
        margin: '5px 0px',
        backgroundColor: 'rgb(239 151 74)',
        background: 'url(images/Wood2.png) center center / 28rem 4rem no-repeat',
        height: '4rem',
        width: '100%',
        border: '0',
        textAlign: 'center',
        color: 'white',
        outline: 'none'
    }

    // CSS for input label
    const labelStyle = {
        fontSize: '17px',
        textAlign: 'center',
        textShadow: '1px 1px black',
        marginTop: '-20px'
    }

    const{ errorMessage, label, onChange, id, ...inputProps } = props;

    const[focused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    return (
        <div style={formStyle}>
            <label style={labelStyle}>{label}</label>
            <input style={inputStyle} {...inputProps} onChange={onChange} onBlur={handleFocus}  focused={focused.toString()} />
            <span className="error-create-account"> {errorMessage}</span>
        </div>
    )
}

export default FormInput