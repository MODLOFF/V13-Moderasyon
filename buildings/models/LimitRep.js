const mongoose = require("mongoose")

const modloff_limitler = new mongoose.Schema({
    guildID: String,
    userID: String,
    banLimit: Number,
    muteLimit: Number,
    vmuteLimit: Number,
    jailLimit: Number
})

module.exports = mongoose.model("limits", modloff_limitler)