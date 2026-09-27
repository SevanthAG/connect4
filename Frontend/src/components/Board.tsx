import { useEffect, useState } from "react";
const Board = () => {
  const [board, setboard] = useState<number[][]>(() =>
    Array.from({ length: 6 }, () => Array(7).fill(0)),
  );

  const [currentplayer, setcurrentplayer] = useState(true);

  const CheckisValidRow = (cols: number) => {
    let rows = 5;
    for (let i = rows; i >= 0; i--) {
      if (board[i][cols] == 0) {
        return i;
      }
    }
  };

  const CheckifWin = (row: number, col: number) => {
    let count = 0;
    //vertical
    // row 5 col 4
    for (let i = 5; i >= 0; i--) {
      let player = currentplayer ? 1 : 2;
      if (board[i][col] == player) {
        console.log("board is", board[i][col]);
        console.log("count is:", count);
        count++;
        if (count == 4) {
          console.log(player, "player win");
          return;
        }
      } else {
        count = 0;
      }
    }
  };

  const divClicked = (cols: number) => {
    let row = CheckisValidRow(cols);
    if (!row) {
      console.log("Column is full");
      return;
    }
    setboard((prev) => {
      let newBoard = [...prev];
      newBoard[row][cols] = currentplayer ? 1 : 2;
      return newBoard;
    });

    
    setcurrentplayer(!currentplayer);
  };
  
  // useEffect(() => {
  //   CheckifWin(row, cols);
  // }, [board])
  

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
                    board[rows][cols] == 1
                      ? "bg-red-500"
                      : board[rows][cols] == 2
                        ? "bg-amber-400"
                        : "bg-[#111111]"
                  }`}
                  onClick={() => divClicked(cols)}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
