import { Router } from "express";
import {
  getBoards,
  createBoard,
  deleteBoards,
} from "../controllers/boardController";

const router = Router();

router.get("/", getBoards);
router.post("/", createBoard);
router.delete("/:id", deleteBoards);

export default router;
