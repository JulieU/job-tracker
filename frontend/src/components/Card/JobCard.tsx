import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Card } from "../../types";
import CardDetailModal from "../Modal/CardDetailModal";
import EditCardModal from "../Modal/EditCardModal";

interface JobCardProps {
  card: Card;
  onBoardUpdate: () => void;
}

function JobCard({ card, onBoardUpdate }: JobCardProps) {
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="relative bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing group"
      >
        {/* Pencil edit button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowEdit(true);
          }}
          className="absolute top-2 right-2 p-1 rounded text-gray-300 hover:text-blue-500 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>

        {/* Card content — clicking opens detail modal */}
        <div onClick={() => setShowDetail(true)}>
          {/* Company logo and name */}
          <div className="flex items-center gap-2 mb-2">
            {card.logoUrl ? (
              <img
                src={card.logoUrl}
                alt={`${card.company} logo`}
                className="w-8 h-8 rounded object-contain"
              />
            ) : (
              <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">
                  {card.company.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <p className="text-sm font-medium text-gray-600">{card.company}</p>
          </div>

          {/* Job title */}
          <p className="font-semibold text-gray-800 mb-2">{card.title}</p>

          {/* Optional fields */}
          <div className="flex flex-col gap-1">
            {card.location && (
              <p className="text-xs text-gray-500">📍 {card.location}</p>
            )}
            {card.salary && (
              <p className="text-xs text-gray-500">💰 {card.salary}</p>
            )}
          </div>
        </div>
      </div>

      {/* Detail modal */}
      {showDetail && (
        <CardDetailModal
          card={card}
          onClose={() => setShowDetail(false)}
          onBoardUpdate={onBoardUpdate}
        />
      )}

      {/* Edit modal */}
      {showEdit && (
        <EditCardModal
          card={card}
          onClose={() => setShowEdit(false)}
          onBoardUpdate={() => {
            onBoardUpdate();
            setShowEdit(false);
          }}
        />
      )}
    </>
  );
}

export default JobCard;
