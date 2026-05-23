import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import type { Board, Card } from "../../types";
import Column from "../Column/Column";
import { updateCard } from "../../api";

interface BoardViewProps {
  board: Board;
  onBoardUpdate: () => void;
}

// Prefix column ids to avoid conflicts with card ids
export const toColumnId = (id: number) => `column-${id}`;
export const fromColumnId = (id: string) => Number(id.replace("column-", ""));
export const isColumnId = (id: string) => id.toString().startsWith("column-");

function BoardView({ board, onBoardUpdate }: BoardViewProps) {
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const collisionDetectionStrategy = (args: any) => {
    const pointerCollisions = pointerWithin(args);
    if (pointerCollisions.length > 0) {
      return pointerCollisions;
    }
    return rectIntersection(args);
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    const card = board.columns
      .flatMap((col) => col.cards)
      .find((c) => c.id === Number(active.id));
    setActiveCard(card || null);
  };

  const handleDragOver = (event: any) => {
    const { over } = event;
    if (!over) return;
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) return;

    const activeCardId = Number(active.id);
    const overId = over.id.toString();

    // Find source column
    const sourceColumn = board.columns.find((col) =>
      col.cards.some((c) => c.id === activeCardId),
    );
    if (!sourceColumn) return;

    // Find target column — either directly a column or via a card
    let targetColumn;
    if (isColumnId(overId)) {
      targetColumn = board.columns.find(
        (col) => col.id === fromColumnId(overId),
      );
    } else {
      targetColumn = board.columns.find((col) =>
        col.cards.some((c) => c.id === Number(overId)),
      );
    }

    if (!targetColumn) return;

    // Calculate new order based on position
    const overCard = targetColumn.cards.find((c) => c.id === Number(overId));
    const newOrder = overCard ? overCard.order : targetColumn.cards.length;

    try {
      await updateCard(activeCardId, {
        columnId: targetColumn.id,
        order: newOrder,
      });
      onBoardUpdate();
    } catch (err) {
      console.error("Failed to move card:", err);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {board.columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onBoardUpdate={onBoardUpdate}
          />
        ))}
      </div>

      <DragOverlay>
        {activeCard ? (
          <div className="bg-white rounded-lg p-3 shadow-xl opacity-90 min-w-[260px]">
            <div className="flex items-center gap-2 mb-2">
              {activeCard.logoUrl ? (
                <img
                  src={activeCard.logoUrl}
                  alt={`${activeCard.company} logo`}
                  className="w-8 h-8 rounded object-contain"
                />
              ) : (
                <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">
                    {activeCard.company.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <p className="text-sm font-medium text-gray-600">
                {activeCard.company}
              </p>
            </div>
            <p className="font-semibold text-gray-800">{activeCard.title}</p>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default BoardView;
