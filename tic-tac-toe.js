
Tic-tac-toe
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

const fill = [
  {id:1,val:0, user:0},{id:2,val:0, user:0},{id:3,val:0, user:0},
  {id:4,val:0, user:0},{id:5,val:0, user:0},{id:6,val:0, user:0},
  {id:7,val:0, user:0},{id:8,val:0, user:0},{id:9,val:0, user:0}
]


function Board() {
  const [moves, setMoves] = useState(fill)
  const [activeUser, setActiveUser] = useState("jake")
  const [winner, setWinner] = useState("")

  function Square(data) {
    let val = ''
    switch(data.data.val){
      case 2:
        val = "o"
      break;
      case 1:
        val = "x"
      break;
      case 0:
        val = ""
      break;
    }

    return (
      <div
        className="square"
        style={squareStyle}>
          <input type='text' style={{width:10}} value={val} onChange={(e) => handleSetMove(e,data)} />
      </div>
    );
  }

  function winnerWinnerChickenDinner(p) {
    let winnerIs = false

    // Horizontal
    if(p[0].val === p[1].val && p[1].val === p[2].val){
      if(p[0].user === p[1].user && p[1].user === p[2].user){
        winnerIs = p[0].user
      }
    }
    if(p[3].val === p[4].val && p[4].val === p[5].val){
      if(p[3].user === p[4].user && p[4].user === p[5].user){
        winnerIs = p[3].user
      }
    }
    if(p[6].val === p[7].val && p[7].val === p[8].val){
      if(p[6].user === p[7].user && p[7].user === p[8].user){
        winnerIs = p[6].user
      }
    }

    // Vertical
    if(p[0].val === p[3].val && p[3].val === p[6].val){
      if(p[0].user === p[3].user && p[3].user === p[6].user){
        winnerIs = p[0].user
      }
    }
    if(p[1].val === p[4].val && p[4].val === p[7].val){
      if(p[1].user === p[4].user && p[4].user === p[7].user){
        winnerIs = p[1].user
      }
    }
    if(p[2].val === p[5].val && p[5].val === p[8].val){
      if(p[2].user === p[5].user && p[5].user === p[8].user){
        winnerIs = p[2].user
      }
    }

    // Diagonal
    if(p[0].val === p[4].val && p[4].val === p[8].val){
      if(p[0].user === p[4].user && p[4].user === p[8].user){
        winnerIs = p[0].user
      }
    }
    if(p[2].val === p[4].val && p[4].val === p[6].val){
      if(p[2].user === p[4].user && p[4].user === p[6].user){
        winnerIs = p[2].user
      }
    }
    setWinner(winnerIs)
    return winnerIs
  }

  const handleSetMove = async (e,val) => {
    setActiveUser(activeUser==="jake" ? "marc" : "jake")
    let o = ''
    switch(e.target.value){
      case "o":
        o = 2
      break;
      case "x":
        o = 1
      break;
      case "":
        o = ""
      break;
    }

    let p = await moves.map(elem => {
      if(elem.id === val.data.id){
        elem = {
          ...elem,
          val:o
        }
        elem = {
          ...elem,
          user:activeUser
        }
      }
      return elem
    })
    setMoves(p)


    let w = winnerWinnerChickenDinner(p)
    if(w){
      alert(`Winner is ${w}`)
    }
  }
  
  console.log("moves",moves)

  const handleReset = () => {
    setMoves(fill)
    setActiveUser("jake")
    setWinner("")
  }

  return (
    <div style={containerStyle} className="gameBoard">
      Instructions: type small letter x and o
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{activeUser === "marc" ? "jake" : "marc"}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner}</span></div>
      <button style={buttonStyle} onClick={() => handleReset()}>Reset</button>
      Users turn: {activeUser}
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          {moves.slice(0, 3).map((val, key) => {
            return <Square key={key} data={val}/>
          })}
        </div>
        <div className="board-row" style={rowStyle}>
          {moves.slice(3, 6).map((val, key) => {
            return <Square key={key} data={val}/>
          })}
        </div>
        <div className="board-row" style={rowStyle}>
          {moves.slice(6, 9).map((val, key) => {
            return <Square key={key} data={val}/>
          })}
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
