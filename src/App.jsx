import { useState } from 'react';
import './App.css'
import Player from './component/Player';
import GameBoard from './component/GameBoard';
import Log from './component/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './GameOver';

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
};

const INITIAL_GAMEBOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function deriveActivePlayer(gameTurn){
  let activePlayer = 'X';
  if(gameTurn.length > 0 && gameTurn[0].player === 'X') activePlayer ='O';
  return activePlayer;
}

function deriveWinner(gameBoard, players){
  let winner;

  for(let combinations of WINNING_COMBINATIONS){
    let firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].col];
    let secosndSquareSymbol = gameBoard[combinations[1].row][combinations[1].col];
    let thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].col];

    if(firstSquareSymbol && firstSquareSymbol === secosndSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveGameBoard(gameTurn){
  let gameBoard = [...INITIAL_GAMEBOARD.map((arr) => [...arr])];

  for(let turn of gameTurn){
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

export default function App() {
  const [gameTurn, setGameTurn] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  const gameBoard = deriveGameBoard(gameTurn);
  const activePlayer = deriveActivePlayer(gameTurn);
  let winner = deriveWinner(gameBoard, players);

  function handleSelectPlayer(symbol, newPlayer){
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol] : newPlayer
      };
    });
  }

  function onRestart(){
    setGameTurn([]);
  }

  function handleSelectSquare(rowIndex, colIndex){
    let currPlayer = deriveActivePlayer(gameTurn);
    setGameTurn((prevGameTurn) => {
      const updatedGameTurn = [
        { square: {
          row : rowIndex, 
          col : colIndex
          }, 
          player: currPlayer
        } ,...prevGameTurn]

        return updatedGameTurn;
    })
  }

  return (
    <>
      <main>
        <div id='game-container'>
          <ol id='players'>
            <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} handlePlayerChangeName={handleSelectPlayer}/>
            <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} handlePlayerChangeName={handleSelectPlayer}/>
          </ol>
          {(gameTurn.length == 9 || winner) && <GameOver winner={winner} restart={onRestart}/>}
          <GameBoard onHandleSelect={handleSelectSquare} board={gameBoard}/>
        </div>
        {!(gameTurn.length == 9 || winner) && <Log turns={gameTurn}/>}
      </main>
    </>
  )
}
