import { useState } from "react";
const Board = () => {

  const [board, setboard] = useState<number[][]>(() => 
    Array.from({ length: 6 }, () => Array(7).fill(0))
  );
  
  const divClicked = (cols: number) => {
    let row = 5;
    while(row >= 0){
      if(board[row][cols] === 0) {
        const newBoard = [...board];
        const newRow = [...newBoard[row]];

        newRow[cols] = 1; 
        newBoard[row] = newRow;

        setboard(newBoard)
        return;
      } else {
        row--;
      }
    }
    }

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-gray-400 p-4 rounded-2xl flex-col border-2 border-zinc-300">
      {Array.from({ length: 6 }).map((_, rows) => {
        return (
          <div key={rows} className="flex flex-1">
            {Array.from({ length: 7 }).map((_, cols) => {
              return (
                <div
                  key={cols}
                  className={`aspect-square rounded-full border border-zinc-300 ${
                    board[rows][cols] === 1
                      ? "bg-red-500"
                      : "bg-[#111111]"
                  }`}
                  onClick={()=>divClicked(cols)}
                >
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
