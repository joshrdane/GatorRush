import './App.css';
import Timer from './timer';
import ProgressTimer from './timerBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       {/* Testing Timer component */}
      <Timer maxRange = {100}/>
      </header>
    </div>
  );
}

export default App;
