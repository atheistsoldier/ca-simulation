//import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router,  Route, Switch } from "react-router-dom";
import {GameOfLife, BriansBrain, LangtonAnt} from "./components";
function App() {
  
  return (
    <div className="App">
       <Router>
       
        
            
       <Switch>
         
         <Route exact path="/game-of-life" component={() => <GameOfLife/>} />
         <Route exact path="/brians-brain" component={() => <BriansBrain/>} />
         <Route exact path="/langton-ant" component={() => <LangtonAnt/>} />
        
         

       </Switch>

</Router>
      
    </div >
  );
}

export default App;
