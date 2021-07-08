//import logo from './logo.svg';

import React, { useState, useEffect } from "react";
function LangtonAnt() {
  const inStatus = [];
  const [stateDescription] = useState(["white", "black"]);
  
  for (let i = 0; i < 800; i++) {
    let val = [];
    for (let j = 0; j < 800; j++) val.push(stateDescription[0]);
    inStatus.push(val);
  }

  const [cellState, setCellState] = useState({
    cellStatus:inStatus,
    presentCell:[400,400],
    dir:"U"
  });
  const [count, setCount] = useState(parseInt(0));
  

  async function handleSimulation() {
    async function clockwise(d) {
      let path = ["L", "U", "R", "D"];
      for (let i = 0; i < 4; i++) {
        if (path[i] === d) {
          return path[(i + 1) % 4];
        }
      }
    }
    async function anticlockwise(d) {
      let path = ["D", "R", "U", "L"];
      for (let i = 0; i < 4; i++) {
        if (path[i] === d) {
          return path[(i + 1) % 4];
        }
      }
    }
    async function cellChange(x, y, d) {
      if (d === "L") x = x - 1;
      else if (d === "R") x = x + 1;
      else if (d === "U") y = y + 1;
      else y = y - 1;
      return [x, y];
    }

    let newStatus = [];
    for (let i = 0; i <= 799; i++) {
      let arr = [];
      for (let j = 0; j <= 799; j++) {
        arr.push(cellState.cellStatus[i][j]);
      }
      newStatus.push(arr);
    }
    let x = cellState.presentCell[0];
    let y = cellState.presentCell[1];
    let newDir = cellState.dir;

    if (cellState.cellStatus[x][y] === stateDescription[0]) {
      newStatus[x][y] = stateDescription[1];
      newDir = await clockwise(newDir);
      
      let presCell = await cellChange(x, y,newDir);
      x = presCell[0];
      y = presCell[1];
      
    } else {
      newStatus[x][y] = stateDescription[0];
      newDir = await anticlockwise(newDir);
      
      let presCell = await cellChange(x, y,newDir);
      x = presCell[0];
      y = presCell[1];
      
    }

    console.log(cellState.presentCell, cellState.dir);
    setCellState({
      cellStatus:newStatus,
      presentCell:[x,y],
      dir: newDir,

    })
    
  }

  useEffect(() => {
    const request = () => {
      handleSimulation();
      setTimeout(() => {
        setCount(count + 1);
      }, 500);
    };
    if (count > 0 && count < 500) {
      request();
    }
  }, [count]);

  return (
    <div className="main">
      <div className="grid">
        {Array.from({ length: 200 }, (_, j) => (
          <div className="col" key={j}>
            {Array.from({ length: 200 }, (_, i) => (
              <span key={i} className={cellState.cellStatus[j + 300][i + 300] + " cell"}>
                {j + 300 === cellState.presentCell[0] && i + 300 === cellState.presentCell[1] ? (
                  <span className="present"></span>
                ) : (
                  ""
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => setCount(parseInt(1))}>Generate</button>
      </div>
    </div>
  );
}

export default LangtonAnt;
