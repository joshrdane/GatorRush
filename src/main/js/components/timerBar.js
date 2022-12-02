import React from 'react';
import Timer from './timer';

const TimerBar = ({timeOverAlert}) => {
    const [counter, setCounter] = React.useState(100);
    React.useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 0.84), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    let bgcolor = "green";

    if (counter < 0) {
        setCounter(0);
        timeOverAlert();
    }

    if (counter > 8 && counter < 25) {
        bgcolor = "yellow";
    } else if (counter > 0 && counter< 8) {
        bgcolor = "red";
    } else if (counter <= 0) {
        bgcolor = "rgb(224, 224, 222)";
    }

    const containerStyles = {
        height: '25px',
        width: '300px',
        backgroundColor: "white",
        borderRadius: 50,
        margin: 0,
        border: '5px solid #388EDD',
        display: 'block'
    };

    const fillerStyles = {
        height: '100%',
        width: `${counter}%`,
        transition: 'width 1s ease-in-out',
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right'
    };

    const labelStyles = {
        padding: 5,
        color: '#150c05',
        fontSize: '0.9rem',
        fontFamily: 'cursive',
        textAlign: 'right',
    };

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}/>
            <div style={labelStyles}><Timer/></div>
        </div>
    );
};

export default TimerBar;
