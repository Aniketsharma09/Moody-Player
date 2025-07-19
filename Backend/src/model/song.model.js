const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title : String,
    artist : String,
    audio : String,
    mood : String,
    originalname : String,
})

const song = mongoose.model('song', songSchema);
module.exports = song;