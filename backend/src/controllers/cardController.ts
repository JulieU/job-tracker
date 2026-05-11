import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { CreateCardInput, UpdateCardInput } from "../types";
import { getCompanyLogo } from "../services/logoService";

// POST /api/columns/:id/cards
export const createCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cardData: CreateCardInput = req.body;
    if (!cardData.title || !cardData.company) {
      res.status(400).json({ error: "Title and company are required" });
      return;
    }
    const card = await prisma.card.create({
      data: {
        ...cardData,
        columnId: Number(id),
      },
    });
    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ error: "Failed to create card" });
  }
};

// PATCH /api/cards/:id
export const updateCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cardData: UpdateCardInput = req.body;
    const card = await prisma.card.update({
      where: { id: Number(id) },
      data: cardData,
    });
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: "Failed to update card" });
  }
};

// DELETE /api/cards/:id
export const deleteCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const card = await prisma.card.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete card" });
  }
};

// GET /api/logo?company=CompanyName
export const fetchCompanyLogo = async (req: Request, res: Response) => {
  try {
    const { company } = req.query;
    if (!company || typeof company !== "string") {
      res.status(400).json({ error: "Company name is required" });
      return;
    }

    const result = await getCompanyLogo(company);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch company logo" });
  }
};
