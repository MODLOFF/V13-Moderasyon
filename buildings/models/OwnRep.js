const mongoose = require("mongoose")

const modloff_kayıtlar = new mongoose.Schema({
    guildID: String,
    userID: String,
    erkek: Number,
    kız: Number,
    toplam: Number
})

module.exports = mongoose.model("register", modloff_kayıtlar)