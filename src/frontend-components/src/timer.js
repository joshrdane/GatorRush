import {useEffect, useState} from "react";
import TimerBar from './timerBar';
import './timer.css';
import './App.css';

function Timer({maxRange}){
    const [counter, setCounter] = useState(maxRange);

    let color;
    if(counter > maxRange * 0.3){
        color = "green";
    }
    else if(counter > maxRange * 0.1){
        color = "yellow";
    }
    else{
        color = "red";
    }
    
    // const Timediv = {
    

    //   }


    useEffect(() => {
        if(counter > 0){
            setTimeout(() => setCounter(counter - 1), 1000);
           
            
        }

        if(counter > maxRange * 0.5){
            color = "green";
        }
        else if(counter > maxRange * 0.25){
            color = "yellow";
        }
        else{
            color = "red";
        }

    }, [counter])

    return(
        <span>
             {/* <TimerBar bgcolor={color} timerProgress={counter} /> */}
             <div>
             <TimerBar bgcolor={color} timerProgress={counter} />
                </div>
            
        </span>
    )

    
}

export default Timer;