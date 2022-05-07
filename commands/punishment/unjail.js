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

module.exports = class UNJail extends Command {
    constructor(client) {
        super(client, {
            name: "unjail",
            description: "Kullanıcının jail cezasını açmaya yarar.",
            options: [
                {
                    name: "kullanıcı",
                    description: "Geçerli bir kullanıcı etiketlemelisin.",
                    type: "USER",
                    required: true,
                }
            ],
            type: "CHAT_INPUT",
            usage: "unjail",
            category: "cezalar"
        });
    }
    async run(client, interaction) {
        if(!interaction.member.roles.cache.some(x => roles.jailHammer.includes(x.id)) && !interaction.member.permissions.has("MANAGE_ROLES")) return;

        const user = interaction.options.getMember("kullanıcı")
        if(!user) return interaction.reply({content: "Geçerli bir kullanıcı etiketlemelisin."})
        await Database.findOne({ user: user.id}, async (err, doc) => {
            if(!doc) return interaction.reply({content:`${user} veritabanında cezalı olarak bulunmuyor.`})
            if(doc.jail == false) return interaction.reply({content:`${user} veritabanında cezalı olarak bulunmuyor.`})
            doc.delete().catch(e => console.error(e))
            user.roles.cache.has(roles.booster) ? user.roles.set([roles.booster, roles.unregister]) : user.roles.set([roles.unregister]).catch(e => console.error(e))
            interaction.reply({content: `${user} adlı kişinin başarılı şekilde jail cezası kaldırıldı.`})
        })
    }
};