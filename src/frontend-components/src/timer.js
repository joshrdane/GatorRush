import {useEffect, useState} from "react";

function Timer({maxRange}){
    const [counter, setCounter] = useState(maxRange);

    useEffect(() => {
        if(counter > 0){
            setTimeout(() => setCounter(counter - 1), 1000);
        }

    }, [counter])

    return(
        <span>
            {counter}
        </span>
    )

    
}

export default Timer;