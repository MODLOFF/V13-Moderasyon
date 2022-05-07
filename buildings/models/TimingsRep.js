const mongoose = require("mongoose")

const modloff_zamman = new mongoose.Schema({
    guildID: String,
    userID: String,
    isimler: Array
})

module.exports = mongoose.model("isimler", modloff_zamman)