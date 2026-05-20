import { useState } from "react";
import type { Card } from "../../types";
import { deleteCard } from "../../api";

interface JobCardProps {
  card: Card;
  onBoardUpdate: () => void;
}

function JobCard({ card, onBoardUpdate }: JobCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteCard(card.id);
      onBoardUpdate();
    } catch (error) {
      console.error("Failed to delete card:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow group">
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

      {/* Actions */}
      <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
        {card.url ? (
          <a
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-500 hover:text-blue-700"
          >
            View Job →
          </a>
        ) : (
          <span />
        )}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-xs text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default JobCard;
