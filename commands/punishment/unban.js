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

module.exports = class UNBan extends Command {
    constructor(client) {
        super(client, {
            name: "unban",
            description: "Kullanıcının banını açmaya yarar..",
            options: [
                {
                    name: "kullanıcı",
                    description: "Geçerli bir kullanıcı etiketlemelisin.",
                    type: "STRING",
                    required: true,
                }
            ],
            type: "CHAT_INPUT",
            usage: "unban",
            category: "cezalar"
        });
    }
    async run(client, interaction) {
        if(!interaction.member.roles.cache.some(x => roles.banHammer.includes(x.id)) && !interaction.member.permissions.has("MANAGE_ROLES")) return;

        const user = interaction.options.getString('kullanıcı')
        if(!user) return interaction.reply({content: "Geçerli bir ID girmelisin."})
        const guild = client.guilds.cache.get(server.serverId)
        guild.members.unban(user);
        interaction.reply({content: `**${user}** ID'li kullanıcının banı başarılı şekile kaldırıldı.`})
    }
};