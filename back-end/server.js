const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer');
const upload = multer({
	dest: '../front-end/public/images/',
	limits: {
		fileSize: 10000000,
	},
});

const mongoose = require('mongoose');

// Mongo scheme for records in the music library that are uploaded
const recordSchema = new mongoose.Schema({
	title: String,
	artist: String,
	year: String,
	genre: String,
	image: String,
});

// Model for records
const Record = mongoose.model('Record', recordSchema);

// connect to the database
mongoose.connect('mongodb://localhost:27017/musiclibrary', {
	useNewUrlParser: true,
});

// Upload an album cover. Uses multer middleware.
app.post('/api/images', upload.single('image'), async (req, res) => {
	if (!req.file) {
		return res.sendStatus(400);
	}
	res.send({
		path: req.file.filename,
	});
});

// CREATE: add a new record to the music library
app.post('/api/records', async (req, res) => {
	const newRecord = new Record({
		title: req.body.title,
		artist: req.body.artist,
		year: req.body.year,
		genre: req.body.genre,
		image: req.body.image,
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
		let recordToEdit = await Record.findOne({ _id: req.params.id });
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
		await Record.deleteOne({ _id: req.params.id });
		res.sendStatus(200); // successful deletion
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
