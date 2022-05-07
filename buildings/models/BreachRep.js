const mongoose = require("mongoose")

const modloff_ihlaller = new mongoose.Schema({
    guildID: String,
    userID: String,
    ban: Number,
    mute: Number,
    vmute: Number,
    jail: Number,
    toplam: Number
})

module.exports = mongoose.model("ihlaller", modloff_ihlaller)