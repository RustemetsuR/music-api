const router = require("express").Router();
const User = require("../models/User");
const Track = require("../models/Tracks");
const TrackHistory = require("../models/TrackHistory");

router.get("/", async (req, res) => {
    const trackHistory = await TrackHistory.find();
    res.send(trackHistory);
});

router.post("/", async (req, res) => {
    const token = req.get("Authorization");
    if (!token) {
        return res.status(401).send({ error: "No token presented" });
    };
    const user = await User.findOne({token});
    if(!user){
        return res.status(401).send({error: "Wrong token"});
    };
    const trackID = req.get("track");
    const track = await Track.findById(trackID);
    if (!track) {
        return res.status(400).send({error: 'Track does not exist'});
    } else {
        req.body.dateTime = new Date().toISOString();
        req.body.track = trackID;
        const trackHistory = new TrackHistory(req.body);
        try {
            await trackHistory.save();
            res.send(trackHistory);
        } catch (e) {
            res.status(400).send(e);
        };
    };
});


module.exports = router;