export default function GameOver({winner, restart}){
    return (
        <div id="game-over">
            <h1>Game Over!</h1>
            {winner ? <p>{winner} won 🎉</p> : <p>It's a Draw 😅</p>}
            <button onClick={restart}>restart</button>
        </div>
    )
}