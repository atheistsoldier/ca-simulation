//import logo from './logo.svg';

import React, { useState, useEffect } from "react";
function BriansBrain() {
  const inStatus = [];
  const [stateDescription]=useState(["on","off","dying"]);
  for (let i = 0; i < 800; i++) {
    let val = []
    for (let j = 0; j < 800; j++)
      val.push(stateDescription[1]);
    inStatus.push(val);
  }
  const onStyle={
    "background-color": "aquamarine"
  };
  inStatus[400][399] = stateDescription[0];
  inStatus[400][400] = stateDescription[0];
  inStatus[401][399] = stateDescription[0];
  inStatus[401][400] = stateDescription[0];
  const [cellStatus, setCellStatus] = useState(inStatus);
  const [count, setCount] = useState(parseInt(0));
  
  function handleSimulation() {

    let newStatus = [];
    for (let i = 0; i <= 799; i++) {
      let arr = [];
      for (let j = 0; j <= 799; j++) {
        arr.push(cellStatus[i][j]);

      }
      newStatus.push(arr);
    }
    for (let i = 0; i < 800; i++) {

      for (let j = 0; j < 800; j++) {
        let neighbour = 0;
        for (let k = Math.max(0, i - 1); k <= Math.min(i + 1, 799); k++) {
          for (let l = Math.max(0, j - 1); l <= Math.min(j + 1, 799); l++) {
            if (k !== i || l !== j) {
              if (cellStatus[k][l] === stateDescription[0])
                neighbour = neighbour + 1;
            }
          }
        }
        if (cellStatus[i][j] === stateDescription[0]) {
          newStatus[i][j]=stateDescription[2];
        }
        else if(cellStatus[i][j] === stateDescription[2]) {
         newStatus[i][j]=stateDescription[1];
        }
        else{
            if(neighbour===2){
                newStatus[i][j]=stateDescription[0];
            }
        }
      }
    }





    setCellStatus(newStatus);


  }
  
  useEffect(() => {


    const request = () => {
      handleSimulation();
      setTimeout(() => {
        setCount(count + 1);
      }, 1000);
    };
    if (count > 0 && count < 500) {
      request();
    }}, [count])




  return (
    <div className="main">
      <div className="grid">
        {Array.from({ length: 200 }, (_, j) =>
          <div className="col" key={j}>
            {Array.from({ length: 200 }, (_, i) => <span key={i} className={cellStatus[j+300][i+300] + " cell"}></span>)}
          </div>
        )}



      </div>
      <div>
        <button onClick={() => setCount(parseInt(1))}>
          Generate
        </button>
      </div>


    </div >
  );
}

export default BriansBrain;
