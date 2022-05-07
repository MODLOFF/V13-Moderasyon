const Command = require("../../buildings/CommandClass");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const roles = require("../../configs/roles");
const server = require("../../configs/server");
const emojis = require("../../configs/emojis");
const channels = require("../../configs/channels")
const moment = require("moment")
require("moment-duration-format");
moment.locale("tr")
const Database = require("../../buildings/models/OwnRep.js")

module.exports = class Kayıtlae extends Command {
    constructor(client) {
        super(client, {
            name: "kbilgi",
            description: "Kullanıcı'nın kayıt bilgilerini görmeye yarar..",
            options: [
                {
                    name: "kullanıcı",
                    description: "Geçerli bir kullanıcı etiketlemelisin.",
                    type: "USER",
                    required: true,
                }
            ],
            type: "CHAT_INPUT",
            usage: "kbilgi",
            category: "kayıt"
        });
    }
    async run(client, interaction) {
        if(!interaction.member.roles.cache.some(x => roles.registerHammer.includes(x.id)) && !interaction.member.permissions.has("MANAGE_ROLES")) return;

        const member = interaction.options.getMember("kullanıcı")
        if(!member) return interaction.reply({content: "Geçerli bir kullanıcı etiketlemelisin."})

        Database.findOne({user: member.id}, async(err, res) => {
            if(!res) return interaction.reply({content: `${member} adlı kişinin kayıt bilgisi bulunmuyor.`})
            const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(interaction.user.tag, interaction.user.avatarURL({dynamic: true}))
            .setDescription(`${member} adlı kişinin kayıt bilgileri:\nErkek: ${res.erkek}\nKız ${res.kız}\n Toplam: ${res.toplam}`)
            interaction.reply({embeds: [embed]})
          });

        
    }
};