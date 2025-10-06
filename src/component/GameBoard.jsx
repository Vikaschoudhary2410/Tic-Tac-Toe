export default function GameBoard({onHandleSelect, board}){

    return <ol id="game-board">
        {board.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((symbol, colIndex) => 
                <li key={colIndex}><button onClick={() => onHandleSelect(rowIndex, colIndex)} disabled={symbol !== null}>{symbol}</button></li>
                )}
            </ol>
        </li>)}
    </ol>
}