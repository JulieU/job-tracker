import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Card } from "../../types";
import CardDetailModal from "../Modal/CardDetailModal";

interface JobCardProps {
  card: Card;
  onBoardUpdate: () => void;
}

function JobCard({ card, onBoardUpdate }: JobCardProps) {
  const [showDetail, setShowDetail] = useState(false);

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
        onClick={() => setShowDetail(true)}
        className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
      >
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

      {/* Detail Modal */}
      {showDetail && (
        <CardDetailModal
          card={card}
          onClose={() => setShowDetail(false)}
          onBoardUpdate={onBoardUpdate}
        />
      )}
    </>
  );
}

export default JobCard;
