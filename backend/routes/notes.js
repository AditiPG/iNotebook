const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//route1: get all the notes of a user

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    var userId = req.user.id;
    const notes = await Note.find({ user: userId });
    res.json(notes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: "Something went wrong" });
  }
});

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.send(savednote);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ Error: "Something went wrong" });
    }
  }
);

//Route 2: Update notes

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(401).send("Not found");
    }
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.send(note);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: "Something went wrong" });
  }
});

//Router 3: Delete Note

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(401).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Succes: "Note has been deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: "Something went wrong" });
  }
});

module.exports = router;
