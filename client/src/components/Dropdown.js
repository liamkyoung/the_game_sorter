import React from "react"
import GUI from "../GUI.css"

function Dropdown({ text, games, node }) {
  return (
    <div className='flex-1'>
      <label for={text}>{text}: </label>
      <select name={text} onChange={(e) => node(e.target.value)}>
        <option defaultValue={null}>{text}</option>
        {games
          ? games.map((game, i) => {
              return (
                <option key={i} value={game.name}>
                  {game.name}
                </option>
              )
            })
          : null}
      </select>
    </div>
  )
}

export default Dropdown
