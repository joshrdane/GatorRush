
import React from 'react';
import Timer from './timer';
  
const TimerBar = ({bgcolor,timerProgress}) => {

    const main = {
      style: "display: flex; flex-direction: row; justify-content: center"
    }
     
    const Parentdiv = {
        height: 30,
        width: '200%',
        backgroundColor: 'whitesmoke',
        borderColor: 'black',
        //borderRadius:25,
        margin: 50,

        //paddingLeft: 60
      }
      
      const Childdiv = {
        height: '100%',
        width: `${timerProgress}%`,
        // paddingLeft: 150,
        backgroundColor: bgcolor,
        //borderRadius:25,
        textAlign: 'right'
      }
      
      const progresstext = {
        padding: 15,
        color: 'black',
        fontWeight: 900
      }
        
    return (
    <div style = {main}>
       <div style={Parentdiv}>
      <div style={Childdiv}>
        {/* <span style={progresstext}>{`${progress}%`}</span> */}
      </div>
    </div>
    <div >{timerProgress}</div>
    </div>
   
    
   
    )
}
  
export default TimerBar;