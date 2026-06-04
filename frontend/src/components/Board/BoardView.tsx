import { useState, useEffect } from "react";
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

export const toColumnId = (id: number) => `column-${id}`;
export const fromColumnId = (id: string) => Number(id.replace("column-", ""));
export const isColumnId = (id: string) => id.toString().startsWith("column-");

function BoardView({ board, onBoardUpdate }: BoardViewProps) {
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [localBoard, setLocalBoard] = useState(board);

  // Keep localBoard in sync when board prop changes
  useEffect(() => {
    setLocalBoard(board);
  }, [board]);

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
    const card = localBoard.columns
      .flatMap((col) => col.cards)
      .find((c) => c.id === Number(active.id));
    setActiveCard(card || null);
  };

  const handleDragOver = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeCardId = Number(active.id);
    const overId = over.id.toString();

    if (activeCardId === Number(overId)) return;

    const sourceColumn = localBoard.columns.find((col) =>
      col.cards.some((c) => c.id === activeCardId),
    );

    let targetColumn;
    if (isColumnId(overId)) {
      targetColumn = localBoard.columns.find(
        (col) => col.id === fromColumnId(overId),
      );
    } else {
      targetColumn = localBoard.columns.find((col) =>
        col.cards.some((c) => c.id === Number(overId)),
      );
    }

    if (!sourceColumn || !targetColumn) return;
    if (sourceColumn.id === targetColumn.id) return;

    // Optimistically move the card to the new column instantly
    setLocalBoard((prev) => {
      const card = sourceColumn.cards.find((c) => c.id === activeCardId)!;
      return {
        ...prev,
        columns: prev.columns.map((col) => {
          if (col.id === sourceColumn.id) {
            return {
              ...col,
              cards: col.cards.filter((c) => c.id !== activeCardId),
            };
          }
          if (col.id === targetColumn!.id) {
            return {
              ...col,
              cards: [...col.cards, { ...card, columnId: targetColumn!.id }],
            };
          }
          return col;
        }),
      };
    });
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) {
      // Reset to server state if dropped nowhere
      onBoardUpdate();
      return;
    }

    const activeCardId = Number(active.id);
    const overId = over.id.toString();

    const sourceColumn = localBoard.columns.find((col) =>
      col.cards.some((c) => c.id === activeCardId),
    );
    if (!sourceColumn) return;

    let targetColumn;
    if (isColumnId(overId)) {
      targetColumn = localBoard.columns.find(
        (col) => col.id === fromColumnId(overId),
      );
    } else {
      targetColumn = localBoard.columns.find((col) =>
        col.cards.some((c) => c.id === Number(overId)),
      );
    }

    if (!targetColumn) return;

    const overCard = targetColumn.cards.find((c) => c.id === Number(overId));
    const newOrder = overCard ? overCard.order : targetColumn.cards.length;

    try {
      await updateCard(activeCardId, {
        columnId: targetColumn.id,
        order: newOrder,
      });
      // Sync with server after successful update
      onBoardUpdate();
    } catch (err) {
      console.error("Failed to move card:", err);
      // Reset to server state if API call fails
      onBoardUpdate();
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
        {localBoard.columns.map((column) => (
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
