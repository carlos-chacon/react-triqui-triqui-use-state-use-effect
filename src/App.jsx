import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'
}

const board = Array(9).fill(null)

function App() {

  return (
    <main className='board'>
      <h1>Triqui Triqui</h1>
      <section className='game'>
        {
          board.map((value, index) => {
            return (
              <div className='cell' key={index}>
                <span className='cell__content'>
                  {index}
                </span>
              </div>
            )
          })
        }
      </section>
    </main>
  )
}

export default App
