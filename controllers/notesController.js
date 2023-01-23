const Note = require("../models/Note");
const User = require('../models/User')

const asyncHandler = require("express-async-handler");

// @desc Get all notes
// @route GET /notes
// @access Private

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean();
  if (!notes?.length) {
    return res.status(400).json({ message: "No notes found" });
  }

//   add the username to each note before sending the res back
  const notesWithUser = await Promise.all(notes.map(async (note) => {
    const user = await User.findById(note.user).lean().exec()
    return { ...note, usernamer: user.username }
  }))
  res.json(notesWithUser);
});

// @desc Create new note
// @route POST /note
// @access Private

const createNewNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;

  // confirm data
  if (!user || !title || !text){
    return res.status(400).json({ message: "All fields are required" });
  }
  // check for duplicates
  const duplicate = await Note.findOne({ title }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate Note Title" });
  }
  

  const noteObject = {
    user,
    title,
    text,
  };

  // create and store new note
  const note = await Note.create(noteObject);
  if (note) {
    res.status(201).json({ message: `New note created` });
  } else {
    res.status(400).json({ message: "Ivalid note data recieved" });
  }
});

// @desc Update note
// @route PATCH/note
// @access Private

const updateNote = asyncHandler(async (req, res) => {
  const { user, title, text, completed, id } = req.body;

  // Confirm data
  if (
    !user ||
    !title ||
    !text ||
    typeof completed !== "boolean" ||
    !id
  ) {
    return res
      .status(400)
      .json({ message: "All fields are required" });
  }

  // Does the note exist to update?
  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }

  // Check for duplicate title
  const duplicate = await Note.findOne({ title }).lean().exec();

  // Allow updates to the original note
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate note title" });
  }

  note.user = user;
  note.title = title;
  note.text = text;
  note.completed = completed;

  const updatedNote = await note.save();

  res.json({ message: `${updatedNote.title} updated` });
});

// @desc Delete note
// @route DELETE /note
// @access Private

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Note ID Required" });
  }

  // Does the note exist to delete?
  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }

  const result = await note.deleteOne();

  const reply = `Note: ${result.title} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
};
