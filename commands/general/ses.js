const Command = require("../../buildings/CommandClass");

const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const roles = require("../../configs/roles");
const server = require("../../configs/server");
const emojis = require("../../configs/emojis");
const channels = require("../../configs/channels")
const text = require("../../configs/text")
module.exports = class Ses extends Command {
    constructor(client) {
        super(client, {
            name: "ses",
            description: "Sunucudaki sesteki kişileri sayar.",
            type: "CHAT_INPUT",
            usage: "sesli",
            category: "genel"
        });
    }
    async run(client, interaction) {
    if(!interaction.member.roles.cache.some(x => roles.registerHammer.includes(x.id)) && !interaction.member.permissions.has("MANAGE_ROLES")) return;
    
    let sesli = interaction.guild.members.cache.filter(x => x.voice.channel).size
    
    const embed = new MessageEmbed()
     .setAuthor(interaction.user.tag, interaction.user.avatarURL({dynamic: true}))
     .setColor("RANDOM")
     .setDescription(`\`>\` ${text.general_ses} **${sesli}** ${text.general_ses1}`)
      interaction.reply({ embeds: [embed] });
    }
};