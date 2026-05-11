import { Router } from "express";
import {
  createCard,
  updateCard,
  deleteCard,
} from "../controllers/cardController";

const router = Router();

router.post("/columns/:id/cards", createCard);
router.patch("/cards/:id", updateCard);
router.delete("/cards/:id", deleteCard);

export default router;
