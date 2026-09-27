import {  useState } from "react";
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

  const CheckifWin = (row: number, col: number, newBoard: number[][], player: boolean) => {
    let count = 0;
    let currentplayer = player ? 1: 2
    //vertical
    for (let i = 5; i >= 0; i--) {
      console.log(row)
      if (newBoard[i][col] == currentplayer) {
        count++;
        if (count == 4) {
          console.log(currentplayer, "player win");
          return true;
        }
      } else {
        count = 0;
      }
    }
    //horizontal
    for (let i = 0; i <= 6; i++) {
      if(newBoard[row][i] == currentplayer){
        count++;
        if(count == 4) {
          console.log(currentplayer, "player win..!!")
          return true;
        }
      } else {
        count = 0;
      }
    }

    if (newBoard[row][col] == currentplayer) {
      
      }
      
      return false;
    };

  const divClicked = (cols: number) => {
    let row = CheckisValidRow(cols);
    if (row == undefined) {
      console.log("Column is full");
      return;
    }
    setboard((prev) => {
      let newBoard = [...prev];
      newBoard[row][cols] = currentplayer ? 1 : 2;
      let win = CheckifWin(row, cols, newBoard, currentplayer);
      if (win) {
        alert("Game Over!!")
      }
      return newBoard;
    });

    setcurrentplayer(!currentplayer);
  };

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
