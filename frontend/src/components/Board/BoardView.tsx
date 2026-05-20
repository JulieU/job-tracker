import type { Board } from "../../types";

interface BoardViewProps {
  board: Board;
  onBoardUpdate: () => void;
}

function BoardView({ board, onBoardUpdate }: BoardViewProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {board.columns.map((column) => (
        <div
          key={column.id}
          className="bg-gray-200 rounded-lg p-4 min-w-[280px] w-[280px]"
        >
          <h2 className="font-semibold text-gray-700 mb-4">{column.title}</h2>
          <div className="flex flex-col gap-2">
            {column.cards.map((card) => (
              <div key={card.id} className="bg-white rounded-lg p-3 shadow-sm">
                <p className="font-medium text-gray-800">{card.title}</p>
                <p className="text-sm text-gray-500">{card.company}</p>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-gray-500 hover:text-gray-700 hover:bg-gray-300 rounded py-2 text-sm">
            + Add Job
          </button>
        </div>
      ))}
    </div>
  );
}

export default BoardView;
