const Command = require("../../buildings/CommandClass");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const roles = require("../../configs/roles");
const server = require("../../configs/server");
const emojis = require("../../configs/emojis");
const channels = require("../../configs/channels");
const text = require("../../configs/text")
const moment = require("moment")
require("moment-duration-format");
moment.locale("tr")
const Cezalarmı = require("../../buildings/models/PunishmentRep.js")

module.exports = class Avatar extends Command {
    constructor(client) {
        super(client, {
            name: "avatar",
            description: "Kullanıcının avatarına bakmaya yarar..",
            options: [
                {
                    name: "kullanıcı",
                    description: "Geçerli bir kullanıcı etiketlemelisin.",
                    type: "USER",
                    required: true,
                }
            ],
            type: "CHAT_INPUT",
            usage: "avatar",
            category: "genel"
        });
    }
    async run(client, interaction) {
        if(interaction.channel.id !== channels.botkomut) return interaction.reply({content: "Bu komutu bot komut kanalında kullanmalısın."})
        const user = interaction.options.getMember("kullanıcı")
        if(!user) return interaction.reply({content: "Geçerli bir kullanıcı etiketlemelisin."})
        let avatar = user.user.avatarURL({ dynamic: true, size: 2048 });
        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(user.user.tag, user.user.avatarURL({dynamic: true}))
        .setDescription(`${user} ${text.general_avatar}`)
        .setImage(avatar)
        interaction.reply({embeds: [embed]})

    }
};