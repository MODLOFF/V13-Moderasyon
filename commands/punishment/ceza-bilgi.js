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
const Datacık = require("../../buildings/models/LimitRep.js")
const Cezalarmı = require("../../buildings/models/BreachRep.js")

module.exports = class CezaBilgi extends Command {
    constructor(client) {
        super(client, {
            name: "ihlaller",
            description: "Kullanıcının ihlallerine bakmaya yarar..",
            options: [
                {
                    name: "kullanıcı",
                    description: "Geçerli bir kullanıcı etiketlemelisin.",
                    type: "USER",
                    required: true,
                }
            ],
            type: "CHAT_INPUT",
            usage: "ihlaller",
            category: "cezalar"
        });
    }
    async run(client, interaction) {
        if(!interaction.member.roles.cache.some(x => roles.jailHammer.includes(x.id)) && !interaction.member.permissions.has("MANAGE_ROLES")) return;

        const user = interaction.options.getMember("kullanıcı")
        if(!user) return interaction.reply({content: "Geçerli bir kullanıcı etiketlemelisin."})

        const Database = Cezalarmı.findOne({guildID: interaction.guild.id, userID: user.id})

        interaction.reply({content: `\`\`\`${user.user.tag} kullanıcısının ceza bilgileri aşağıda belirtilmiştir \n\nChat Mute: ${Database.mute ? Database.mute : 0} kez.\nSes Mute: ${Database.vmute ? Database.vmute : 0} Kez.\nCezalı Bilgisi: ${Database.jail ? Database.jail : 0} Kez.\nBan Bilgisi: ${Database.ban ? Database.ban : 0} Kez.\`\`\``})

    }
};