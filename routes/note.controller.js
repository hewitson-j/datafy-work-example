import { Router } from "express";
import AppDataSource from "../AppDataSource.js";
import { Note } from "../entity/note.entity.js";

const router = Router();
const noteRepository = AppDataSource.getRepository(Note);

// Create new record
// router.post('/notes', async (req, res) => {
//   const { title, body } = req.body;
//   const note = new Note();
//   note.title = title;
//   note.body = body;

//   try {
//     const savedNote = await noteRepository.save(note);
//     return res.status(201).json(savedNote);
//   } catch (error) {
//     return res.status(500).json({ error: 'Unable to create note' });
//   }
// });

// Get All
router.get("/notes", async (_, res) => {
  const notes = await noteRepository.find();
  return res.json(notes);
});

// Get by ID
// router.get("/notes/:id", async (req, res) => {
//   const { id } = req.params;
//   const note = await noteRepository.findOne(id);

//   if (!note) {
//     return res.status(404).json({ error: "Note not found" });
//   }

//   return res.json(note);
// });

// Update by ID
// router.put('/notes/:id', async (req, res) => {
//   const { id } = req.params;
//   const { title, body } = req.body;

//   try {
//     await noteRepository.update(id, { title, body });
//     const updatedNote = await noteRepository.findOne(id);
//     return res.json(updatedNote);
//   } catch (error) {
//     return res.status(500).json({ error: 'Unable to update note' });
//   }
// });

// Delete by ID
router.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await noteRepository.delete(id);
    console.log(`Note ${id} deleted.`);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Unable to delete note" });
  }
});

export default router;
