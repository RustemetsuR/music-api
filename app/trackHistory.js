const router = require("express").Router();
const User = require("../models/User");
const Track = require("../models/Tracks");
const TrackHistory = require("../models/TrackHistory");

router.get("/", async (req, res) => {
    const trackHistory = await TrackHistory.find();
    res.send(trackHistory)
});

router.post("/", async (req, res) => {
    const token = req.get("Authorization");
    if (!token) {
        return res.status(401).send({ error: "No token presented" });
    };
    const user = await User.findOne({token});
    if(!user){
        return res.status(401).send({error: "Wrong token"});
    }
    const track = await Track.findById(req.body.track);
    if (!track) {
        return res.status(400).send('Track does not exist');
    } else {
        const date = new Date();
        req.body.dateTime = date.toISOString();
        const trackHistory = new TrackHistory(req.body);
        try {
            await trackHistory.save();
            res.send(trackHistory);
        } catch (e) {
            res.send(e);
        };
    };
});


module.exports = router;