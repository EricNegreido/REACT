import { useState } from 'react';
import {Square} from './components/Square.jsx'
import { checkWinner, checkEndGame } from './logic/board.js';
import { TURNS } from './constants.js';
import './App.css'
import { WinnerModal } from './components/WinnerModal.jsx';


function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null)
 
 
  const updateBoard = (index) =>{

    if(board[index] || winner) return
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    const newWinner = checkWinner(newBoard);
    if(newWinner){
      setWinner(newWinner);
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }
  const resetGame = () =>{
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }
  return (
    <>
    <main className='board'>
      <h1>Ta te ti</h1>
      <button onClick={resetGame}>
                    Reset game
                  </button>
      <section className='game'>
        {
          board.map((_, index) => {
            return(
              <Square updateBoard={updateBoard} key={index} index={index}> {board[index]}</Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected = {turn == TURNS.X}> {TURNS.X}</Square>
        <Square isSelected = {turn == TURNS.O}> {TURNS.O}</Square>

      </section>
        <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
    </>
  )
}

export default App
