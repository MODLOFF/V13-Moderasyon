const Command = require("../../buildings/CommandClass");

const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const roles = require("../../configs/roles");
const server = require("../../configs/server");
const emojis = require("../../configs/emojis");
const channels = require("../../configs/channels")
module.exports = class Sil extends Command {
    constructor(client) {
        super(client, {
            name: "temizle",
            description: "Sunucudaki yazıları silmeye yarar.",
            options: [
                {
                   name: "sayı",
                   description: "Temizlemek istedigin sayıyı girmelisin 0 - 100 arası..",
                   type: "NUMBER",
                   required: true
                }
            ],
            type: "CHAT_INPUT",
            usage: "sil",
            category: "genel"
        });
    }
    async run(client, interaction) {
      if(!interaction.member.permissions.has("MANAGE_ROLES")) return;
      const clear = interaction.options.getNumber("sayı")
      const Channel = interaction.channel;
      Channel.bulkDelete(clear, true)
      interaction.reply({ content: "**Başarılı şekilde "+ clear +" adet mesaj silindi.**" });
    }
};