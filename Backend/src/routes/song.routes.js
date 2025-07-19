const express = require("express");
const multer = require("multer");
const uploadFile = require('../service/storage.service');
const songModel = require("../model/song.model");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/songs", upload.single("audio"), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const fileData = await uploadFile(req.file);
    const song = await songModel.create({
        title : req.body.title,
        artist : req.body.artist,
        audio : fileData.url,
        mood : req.body.mood,
        originalname : req.file.originalname,
    })
    
    res.status(201).json({
      message: "song is uploaded successfully",
      song
    });
});

router.get('/songs', async(req, res) => {
    const {mood} = req.query;
    const song = await songModel.find({
        mood : mood
    })
    res.status(200).json({
        message : "song is fetch succesfull",
        song
    })
})
module.exports = router;
