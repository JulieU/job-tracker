import type { Card } from "../../types";
import { deleteCard } from "../../api";
import { useState } from "react";

interface CardDetailModalProps {
  card: Card;
  onClose: () => void;
  onBoardUpdate: () => void;
}

function CardDetailModal({
  card,
  onClose,
  onBoardUpdate,
}: CardDetailModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteCard(card.id);
      onBoardUpdate();
      onClose();
    } catch (err) {
      console.error("Failed to delete card:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            {card.logoUrl ? (
              <img
                src={card.logoUrl}
                alt={`${card.company} logo`}
                className="w-12 h-12 rounded object-contain"
              />
            ) : (
              <div className="w-12 h-12 rounded bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">
                  {card.company.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-gray-800">{card.title}</h2>
              <p className="text-gray-500">{card.company}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-3 mb-6">
          {card.location && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400 w-5">📍</span>
              <span className="text-gray-700 text-sm">{card.location}</span>
            </div>
          )}
          {card.salary && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400 w-5">💰</span>
              <span className="text-gray-700 text-sm">{card.salary}</span>
            </div>
          )}
          {card.url && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400 w-5">🔗</span>
              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                View Job Posting →
              </a>
            </div>
          )}
          {card.notes && (
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-700 mb-1">📝 Notes</p>
              <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 whitespace-pre-wrap">
                {card.notes}
              </p>
            </div>
          )}
        </div>

        {/* Applied date */}
        <p className="text-xs text-gray-400 mb-6">
          Added{" "}
          {new Date(card.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        {/* Footer */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2 text-sm hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 bg-red-500 text-white rounded-lg py-2 text-sm hover:bg-red-600 disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete Job"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardDetailModal;
