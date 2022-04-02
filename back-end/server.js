const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/musiclibrary', {
  useNewUrlParser: true
});


app.listen(3000, () => console.log('Server listening on port 3000!'));

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});


// Mongo scheme for records in the music library that are uploaded
const recordSchema = new mongoose.Schema({
  title: String,
  artist: String,
  year: String,
  genre: String,
  path: String,
});

// Model for records 
const Records = mongoose.model('Record', recordSchema);


// Upload a photo. Uses the multer middleware for the upload and then returns the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400); // error status code
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});


// CREATE: add a new record to the music library
app.post('/api/records', async (req, res) => {
  const newRecord = new Record({
    title: req.body.title,
    artist: req.body.artist,
    year: req.body.year,
    genre: req.body.genre,
    path: req.body.path,
  });
  try {
    await newRecord.save();
    res.send(newRecord);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// READ: get a list of all of the records
app.get('/api/records', async (req, res) => {
  try {
    let records = await Record.find();
    res.send(records);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// UPDATE: edit a record
app.put('/api/records/:id', async (req, res) => {
  try {
    let recordToEdit = await Record.findOne({ _id: req.params.id })
    recordToEdit.title = req.body.title;
    recordToEdit.description = req.body.artist;
    recordToEdit.description = req.body.year;
    recordToEdit.description = req.body.genre;
    recordToEdit.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// DELETE: deleting a record from the database (by id)
app.delete('/api/records/:id', async (req, res) => {
  try {
    await Record.deleteOne({ _id: req.params.id })
    res.sendStatus(200); // successful deletion
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});