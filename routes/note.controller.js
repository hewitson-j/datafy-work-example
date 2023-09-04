import { Router } from "express";
import AppDataSource from "../AppDataSource.js";
import { Note } from "../entity/note.entity.js";

const router = Router();
const noteRepository = AppDataSource.getRepository(Note);

// Create new record
router.post("/notes", async (req, res) => {
  const { title, body } = req.body;
  if (title === "") {
    console.log("Note title can't be empty.");
    return res.status(400).json({ error: "Unable to create note" });
  }
  if (body === "") {
    console.log("Note body can't be empty.");
    return res.status(400).json({ error: "Unable to create note" });
  }

  const note = new Note();
  note.title = title;
  note.body = body;

  try {
    const savedNote = await noteRepository.save(note);
    console.log("Record added successfully.");
    return res.status(201).json(savedNote);
  } catch (error) {
    return res.status(500).json({ error: "Unable to create note" });
  }
});

// Get All
router.get("/notes", async (_, res) => {
  const notes = await noteRepository.find();
  console.log("All records returned successfully.");
  return res.json(notes);
});

// Get by ID
router.get("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const note = await noteRepository.findOne(id);

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  return res.json(note);
});

// Update by ID
router.put("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  if (title === "") {
    console.log("Note title can't be empty.");
    return res.status(400).json({ error: "Unable to create note" });
  }
  if (body === "") {
    console.log("Note body can't be empty.");
    return res.status(400).json({ error: "Unable to create note" });
  }

  try {
    await noteRepository.update(id, { title, body });
    const updatedNote = await noteRepository.findOne(id);
    return res.json(updatedNote);
  } catch (error) {
    return res.status(500).json({ error: "Unable to update note" });
  }
});

// Delete by ID
router.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;

  if (id === null) {
    console.log("Must include ID in search.");
    return res.status(400).json({ error: "ID missing." });
  }
  try {
    const note = await noteRepository.findOne(id);

    if (note) {
      try {
        // if id exists
        await noteRepository.delete(id);
        console.log(`Note ${id} deleted.`);
        // return 200

        // else return 400
        return res.status(200).send();
      } catch (error) {
        return res.status(500).json({ error: "Unable to delete note" });
      }
    }
  } catch {
    console.log(`Note not found with id ${id}`);
    return res.status(404).json({ error: "Note not found" });
  }
});

export default router;
