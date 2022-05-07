const Command = require("../../buildings/CommandClass");
const Client = require("../../buildings/Client");
const { MessageActionRow, Message, MessageEmbed, MessageButton } = require("discord.js");
const { stripIndents } = require("common-tags");
const roles = require("../../configs/roles");
const server = require("../../configs/server");
const emojis = require("../../configs/emojis");
const channels = require("../../configs/channels")
const moment = require("moment")
require("moment-duration-format");
moment.locale("tr")
const ms = require("ms")
const Database = require("../../buildings/models/PunishmentRep.js")
const Datacık = require("../../buildings/models/LimitRep.js")

module.exports = class UNMute extends Command {
    constructor(client) {
        super(client, {
            name: "unmute",
            description: "Kullanıcının mutesini açmaya yarar..",
            options: [
                {
                    name: "kullanıcı",
                    description: "Geçerli bir kullanıcı etiketlemelisin.",
                    type: "USER",
                    required: true,
                }
            ],
            type: "CHAT_INPUT",
            usage: "unmute",
            category: "cezalar"
        });
    }
    async run(client, interaction) {
        if(!interaction.member.roles.cache.some(x => roles.muteHammer.includes(x.id)) && !interaction.member.permissions.has("MANAGE_ROLES")) return;

        const user = interaction.options.getMember("kullanıcı")
        if(!user) return interaction.reply({content: "Geçerli bir kullanıcı etiketlemelisin."})
        if (user.voice.serverMute == true) {
            user.voice.setMute(false)
            interaction.reply({content: `${user} adlı kullanıcının ses cezası kaldırılmıştır.`})
           } if (user.roles.cache.has(roles.muted)) {
             user.roles.remove(roles.muted)
            interaction.reply({content:`${user} adlı kullanıcının metin kanallarında ki susturulması kaldırılmıştır.`})
           }
    }
};