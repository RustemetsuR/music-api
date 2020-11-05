const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
    username: {
        type: String,
        ref: "User",
        required: true
    },
    track: {
        type: Schema.Types.ObjectId,
        ref: "Track",
        required: true
    },
    dateTime:{
        type: String,
    },
});

const TrackHistory = mongoose.model("TrackHistory", TrackHistorySchema);
module.exports = TrackHistory;