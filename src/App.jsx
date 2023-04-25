import React from "react";
import { useState } from "react";
import confetti from "canvas-confetti";

import { Square } from "./components/Square";
import { checkEndGame, checkWinner } from "./logic/board";
import { TURNS } from "./constants";
import { WinnerModal } from "./components/WinnerModal";

import "./App.css";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  const updateBoard = (index) => {
    // no se actualiza esta posición si ya tiene algo
    if (board[index] || winner) return;
    //spread and rest operator
    //actualiza el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    //cambia el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // guardar aquí partida
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", turn);
    //revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Triqui Triqui</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} updateBoard={updateBoard} index={index}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square
          isSelected={turn === TURNS.X}
          updateBoard={undefined}
          index={undefined}
        >
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  );
}

export default App;
