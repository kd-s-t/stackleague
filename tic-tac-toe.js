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
  {id:1,val:0,user:""},{id:2,val:0,user:""},{id:3,val:0,user:""},
  {id:4,val:0,user:""},{id:5,val:0,user:""},{id:6,val:0,user:""},
  {id:7,val:0,user:""},{id:8,val:0,user:""},{id:9,val:0,user:""},
]

const player1 = {name: "Jake", color: "blue"}
const player2 = {name: "Doe", color: "red"}

function Board() {
  const [moves, setMoves] = useState(fill)
  const [activeUser, setActiveUser] = useState(player1)
  const [winner, setWinner] = useState("")

  const handleSetMove = async (e,val) => {
    setActiveUser(activeUser.name==="Jake"?player2:player1)
    let o = ""

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

    let p = await moves.map(elem=>{
      if(elem.id === val.data.id){
        elem = {
          ...elem,
          val: o
        }
        elem = {
          ...elem,
          user: activeUser
        }
      }
      return elem
    })

    setMoves(p)

    let w = winnerWinnerChickenDinner(p)
    if(w){
      alert(`Winner is ${w.name}`)
    }
  }

  function winnerWinnerChickenDinner(p){
    let winnerIs = ""

    // Horizontal
    if(p[0].val===p[1].val && p[1].val === p[2].val){
      if(p[0].user===p[1].user && p[1].user === p[2].user){
        winnerIs = p[0].user
      }
    }
    if(p[3].val===p[4].val && p[4].val === p[5].val){
      if(p[3].user===p[4].user && p[4].user === p[5].user){
        winnerIs = p[3].user
      }
    }
    if(p[6].val===p[7].val && p[7].val === p[8].val){
      if(p[6].user===p[7].user && p[7].user === p[8].user){
        winnerIs = p[6].user
      }
    }

    // Vertical
    if(p[0].val===p[3].val && p[3].val === p[6].val){
      if(p[0].user===p[3].user && p[3].user === p[6].user){
        winnerIs = p[0].user
      }
    }
    if(p[1].val===p[4].val && p[4].val === p[7].val){
      if(p[1].user===p[4].user && p[4].user === p[7].user){
        winnerIs = p[1].user
      }
    }
    if(p[2].val===p[5].val && p[5].val === p[8].val){
      if(p[2].user===p[5].user && p[5].user === p[8].user){
        winnerIs = p[2].user
      }
    }


    // Diagonal
    if(p[0].val===p[4].val && p[4].val === p[8].val){
      if(p[0].user===p[4].user && p[4].user === p[8].user){
        winnerIs = p[0].user
      }
    }
    if(p[2].val===p[4].val && p[4].val === p[6].val){
      if(p[2].user===p[4].user && p[4].user === p[6].user){
        winnerIs = p[2].user
      }
    }
    setWinner(winnerIs)

    return winnerIs
  }

  function Square(data) {
    let val = ''

    switch(data.data.val) {
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
    let style = {border:`solid 1px ${data.data.user.color}`}
    return (
      <div
        className="square"
        style={{...squareStyle,...style}}
      >
        <input 
          type="text" 
          style={{
            textAlign:'center',
            color:data.data.user.color,
            fontSize:48,
            width: '75%',
            height: '80%'
          }} 
          value={val}
          onChange={(e) => handleSetMove(e,data)}
          disabled={val}
        />
      </div>
    );
  }

  const handleReset = () => {
    setMoves(fill)
    setActiveUser(player1)
    setWinner("")
  }

  let curco = "red"
  if(activeUser.name === "Doe"){
    curco = "blue"
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <span style={{fontSize:40, textAlign:'center'}}>Intrusctions: type X or O in the field</span>
      {!winner?.name && <>
          <div id="statusArea" className="status" style={instructionsStyle}>
            Next player: 
            <span style={{color: curco}}> {activeUser.name==="Doe" ? player1.name : player2.name}</span>
          </div>
          <div id="statusArea" className="status" style={instructionsStyle}>
            Players turn: <span style={{color: activeUser.color}}>{activeUser.name}</span>
          </div>
        </>
      }
      {winner?.name &&
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        Winner: <span style={{color: winner.color}}>{winner?.name}</span>
      </div>
      }
      <button style={buttonStyle} onClick={() => handleReset()}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          {moves.slice(0,3).map((val,key) => {
            return <Square key={key} data={val}/>
          })}
        </div>
        <div className="board-row" style={rowStyle}>
          {moves.slice(3,6).map((val,key) => {
            return <Square key={key} data={val}/>
          })}
        </div>
        <div className="board-row" style={rowStyle}>
          {moves.slice(6,9).map((val,key) => {
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
