import React, { useState } from 'react'

function Count() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    setCount(count - 1)
  }

  return (
    <div className="counter-container">
      <h2>Counter</h2>
      <div className="counter-display">
        <span>{count}</span>
      </div>
      <div className="counter-buttons">
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  )
}

export default Count