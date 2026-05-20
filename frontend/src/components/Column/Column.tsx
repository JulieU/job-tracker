import { useState } from "react";
import type { Column as ColumnType } from "../../types";
import JobCard from "../Card/JobCard";

interface ColumnProps {
  column: ColumnType;
  onBoardUpdate: () => void;
}

function Column({ column, onBoardUpdate }: ColumnProps) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="bg-gray-200 rounded-lg p-4 min-w-[280px] w-[280px]">
      {/* Column header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-700">{column.title}</h2>
        <span className="bg-gray-300 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
          {column.cards.length}
        </span>
      </div>

      {/* Cards list */}
      <div className="flex flex-col gap-2">
        {column.cards.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-4">No jobs yet</p>
        ) : (
          column.cards.map((card) => (
            <JobCard key={card.id} card={card} onBoardUpdate={onBoardUpdate} />
          ))
        )}
      </div>

      {/* Add job button */}
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 w-full text-gray-500 hover:text-gray-700 hover:bg-gray-300 rounded py-2 text-sm transition-colors"
      >
        + Add Job
      </button>
    </div>
  );
}

export default Column;
