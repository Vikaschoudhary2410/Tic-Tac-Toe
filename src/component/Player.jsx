import { use } from "react"
import { useState } from "react"

export default function Player({initialName, symbol, isActive, handlePlayerChangeName}){
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleIsEditing(){
        setIsEditing((editing) => !editing);

        if(isEditing){
            handlePlayerChangeName(symbol, playerName);
        }
    }

    function handlePlayerName(event){
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className='player-name'>{playerName}</span>

    if(isEditing){
        editablePlayerName = <input type="text" required value={playerName} onChange={handlePlayerName} />
    }

    return (
        <li className = {(isActive) ? 'active': undefined}>
            <span className='player'>
                {editablePlayerName}
                <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={handleIsEditing}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}