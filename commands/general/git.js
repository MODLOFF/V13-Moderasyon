const Command = require("../../buildings/CommandClass");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const roles = require("../../configs/roles");
const server = require("../../configs/server");
const emojis = require("../../configs/emojis");
const channels = require("../../configs/channels")
const text = require("../../configs/text")
const moment = require("moment")
require("moment-duration-format");
moment.locale("tr")

module.exports = class Git extends Command {
    constructor(client) {
        super(client, {
            name: "git",
            description: "Kullanıcının yanına gitmeye yarar..",
            options: [
                {
                    name: "kullanıcı",
                    description: "Geçerli bir kullanıcı etiketlemelisin.",
                    type: "USER",
                    required: true,
                }
            ],
            type: "CHAT_INPUT",
            usage: "git",
            category: "genel"
        });
    }
    async run(client, interaction) {
        const user = interaction.options.getMember("kullanıcı")
        if(!user) return interaction.reply({content: "Geçerli bir kullanıcı etiketlemelisin."})
        if(!user.voice.channel) return interaction.reply({content: "Kullanıcı seste bulunmuyor."})
        
        const filter = (reaction, member) => {
            return ([emojis.noname, emojis.okname].includes(reaction.emoji.name) && member.id === user.id);
        };

        const embeds = new MessageEmbed()
        .setTitle(`Odaya gelme isteği`)
        .setDescription(`Merhaba ${user}. ${interaction.member} ${text.general_git1} ${text.general_git4}`)
        .setColor("BLACK")

        let mesaj = await interaction.channel.send({content: `${user}`, embeds: [embeds]})

        await mesaj.react(emojis.ok);
        await mesaj.react(emojis.no);

        mesaj.awaitReactions({filter, max: 1, time: 60000, errors: ["time"] }).then(collected => {
        const reaction = collected.first();
        if (reaction.emoji.name === emojis.okname) {
        let kabul = new MessageEmbed()
        .setTitle(`Kabul`)
        .setDescription(`${interaction.member} ${text.general_git1} ${user} ${text.general_git3}`)
        .setColor("BLACK")
        interaction.channel.send({embeds: [kabul]}).then(msg => { setTimeout(() => msg.delete(), 10000) })
        interaction.member.voice.setChannel(user.voice.channel);
        } else {
        let redd = new MessageEmbed()
        .setTitle(`Red`)
        .setDescription(`${user} ${text.general_git1} ${interaction.member} ${text.general_git2}`)
        .setColor("BLACK")
        message.channel.send({embeds: [redd]}).then(msg => { setTimeout(() => msg.delete(), 10000) })
        }
        })


    }
};
