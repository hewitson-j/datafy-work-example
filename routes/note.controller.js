import { Router } from "express";
import AppDataSource from "../AppDataSource.js";
import { Note } from "../entity/note.entity.js";

const router = Router();
const noteRepository = AppDataSource.getRepository(Note);

router.get("/notes", async (_, res) => {
  const notes = await noteRepository.find();
  return res.json(notes);
});

export default router;
