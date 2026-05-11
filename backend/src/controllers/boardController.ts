import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { CreateBoardInput } from "../types";

// GET /api/boards
export const getBoards = async (req: Request, res: Response) => {
  try {
    const boards = await prisma.board.findMany({
      include: {
        columns: {
          orderBy: { order: "asc" },
          include: {
            cards: {
              orderBy: { order: "asc" },
            },
          },
        },
      },
    });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch boards" });
  }
};

// POST /api/boards
export const createBoard = async (req: Request, res: Response) => {
  try {
    const { title }: CreateBoardInput = req.body;
    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }
    const board = await prisma.board.create({
      data: {
        title,
        columns: {
          create: [
            { title: "Saved", order: 0 },
            { title: "Applied", order: 1 },
            { title: "Interview", order: 2 },
            { title: "Offer", order: 3 },
            { title: "Rejected", order: 4 },
          ],
        },
      },
      include: {
        columns: true,
      },
    });
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ error: "Failed to create board" });
  }
};

// DELETE /api/boards/:id
export const deleteBoards = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.board.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Board deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete board" });
  }
};
