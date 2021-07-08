//import logo from './logo.svg';

import React, { useState, useEffect } from "react";
function LangtonAnt() {
  const inStatus = [];
  const [stateDescription] = useState(["white", "black"]);
  const [presentCell,setPresentCell]=useState([400,400])
  const[dir,setDir]=useState("U");
  for (let i = 0; i < 800; i++) {
    let val = [];
    for (let j = 0; j < 800; j++) val.push(stateDescription[1]);
    inStatus.push(val);
  }

  
  const [cellStatus, setCellStatus] = useState(inStatus);
  const [count, setCount] = useState(parseInt(0));

  async function handleSimulation() {
    async function clockwise() {
      let path = ["L","U","R","D"];
      for (let i = 0; i < 4; i++) {
        if (path[i] === dir) {
          return path[(i + 1) % 4];
        }
      }
    }
    async function anticlockwise() {
      let path = ["D","R","U","L"];
      for (let i = 0; i < 4; i++) {
        if (path[i] === dir) {
          return path[(i + 1) % 4];
        }
      }
    }
    async function cellChange(x,y)
    {
        if(dir==="L")
          x=x-1;
          else if(dir==="R")
          x=x+1;
          else if(dir==="U")
          y=y+1;
          else
          y=y-1;
          return([x,y]);
    } 

    let newStatus = [];
    for (let i = 0; i <= 799; i++) {
      let arr = [];
      for (let j = 0; j <= 799; j++) {
        arr.push(cellStatus[i][j]);

      }
      newStatus.push(arr);
    }
    let x=presentCell[0];
    let y=presentCell[1];
    
        
        if (cellStatus[x][y] === stateDescription[0]) {
          newStatus[x][y] = stateDescription[1];
          let newDir= await clockwise();
          
          setDir(newDir);
          
          setPresentCell(await cellChange(x,y));
        }  else {
            newStatus[x][y] = stateDescription[0];
            let newDir=await anticlockwise();
            setDir(newDir);
            
            setPresentCell(await cellChange(x,y));
        }
      
        
        console.log(presentCell,dir);
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
    }
  }, [count]);

  return (
    <div className="main">
      <div className="grid">
        {Array.from({ length: 200 }, (_, j) => (
          <div className="col" key={j}>
            {Array.from({ length: 200 }, (_, i) => (
              <span
                key={i}
                className={cellStatus[j + 300][i + 300] + " cell"}
              >{((j+300===presentCell[0])&& (i+300===presentCell[1]))?<span className="present"></span>:""}</span>
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
