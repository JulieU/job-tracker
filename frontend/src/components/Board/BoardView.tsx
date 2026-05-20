import type { Board } from "../../types";
import Column from "../Column/Column";

interface BoardViewProps {
  board: Board;
  onBoardUpdate: () => void;
}

function BoardView({ board, onBoardUpdate }: BoardViewProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {board.columns.map((column) => (
        <Column key={column.id} column={column} onBoardUpdate={onBoardUpdate} />
      ))}
    </div>
  );
}

export default BoardView;
