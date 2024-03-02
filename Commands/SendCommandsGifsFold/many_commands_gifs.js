import random from "random";
import { Colors, EmbedBuilder } from 'discord.js';
import Tenor from "./send_gif.js";
export const CommandsForGifs = [{
    CmdName: 'hug',
    Desc: 'Обнять другого пользователя сервера',
    Tags: ["HUG", "ANIME SAD HUG", "HUGS", "HUG ANIME COUPLE"],
    ReplyMess: "обнял пользователя"
}, {
    CmdName: 'kiss',
    Desc: 'Поцеловать другого пользователя сервера',
    Tags: ["KISS", "ANIME KISS", "KISS", "KISS ANIME COUPLE GIF", "KISSING"],
    ReplyMess: "поцеловал пользователя"
}, {
    CmdName: 'snap',
    Desc: 'Ударить другого пользователя сервера',
    Tags: ["SNAP KISS", "SNAP", "SNAP ANIME COUPLE GIF"],
    ReplyMess: "щелкнул пользователя"
}, {
    CmdName: 'random',
    Desc: 'Рандомная гифка с персонажем из разных игр',
    Games: [{
        Name: "Tomb Raider",
        Value: "Tomb Raider",
        Tags: ["TOMB RAIDER","LARA CROFT"]
    }, {
        Name: "Genshin Impact",
        Value: "Genshin Impact",
        Tags: ["GENSHIN IMPACT CHARACTERS","GENSHIN"]
    }, {
        Name: "Atomic Heart",
        Value: "Atomic Heart",
        Tags: ["ATOMIC HEART"]
    }, {
        Name: "MORTAL KOMBAT 1",
        Value: "MORTAL KOMBAT 1",
        Tags: ["MORTAL KOMBAT 1 MORTAL KOMBAT MORTAL KOMBAT 12 MK1"]
    }, {
        Name: "Dota 2",
        Value: "Dota 2",
        Tags: ["DOTA2"]
    }, {
        Name: "Stray",
        Value: "Stray",
        Tags: ["STRAY CAT STRAYGAME"]
    }, {
        Name: "CyberPunk2077",
        Value: "CyberPunk2077",
        Tags: ["CYBERPUNK2077", "CYBERPUNK EDGERUNNERS EDGERUNNERS"]
    }, {
        Name: "Little Nightmares",
        Value: "Little Nightmares",
        Tags: ["LITTLE NIGHTMARES", "LITTLE NIGHTMARES2"]
    }, {
        Name: "Metal gear solid",
        Value: "Metal gear solid",
        Tags: ["METAL GEAR SOLID"]
    }, {
        Name: "Titanfall",
        Value: "Titanfall",
        Tags: ["TITANFALL2","BT7274"]
    }, {
        Name: "Death Stranding",
        Value: "Death Stranding",
        Tags: ["DEATH STRANDING"]
    }],
    ReplyMess: ""
},]
export default function SetCommandForGifs(interaction, FromUser) {

    CommandsForGifs.map(async (el) => {
        try{
            if (interaction.commandName === el.CmdName) {

                const ToUserId = interaction.options.getMember("user")?.user
                if (el?.Games?.length == 0) {
                    Tenor.Search.Query(el.Tags[random.int(0, el.Tags.length-1)], "50").then(async (res) => {
                        await interaction.reply({ content: `${FromUser} ${el.ReplyMess} ${ToUserId}`, embeds: [new EmbedBuilder().setColor(Colors.Aqua).setImage(res[random.int(0, 50)].media_formats.gif.url)] });
                    }).catch(async (err) => {
                        await interaction.reply({ content: "Ошибка, попробуйте еще раз!", ephemeral: true });
                    })
                } else {
                    const Game = interaction.options.getString("games")
                    var Tags = el?.Games?.filter(el => el.Name == Game)[0].Tags
                    Tenor.Search.Query(Tags[random.int(0, Tags?.length-1)], "50").then(async (res) => {
                        await interaction.reply({ content: `${FromUser}`, embeds: [new EmbedBuilder().setColor(Colors.Aqua).setImage(res[random.int(0, 50)].media_formats.gif.url)] });
                    }).catch(async (err) => {
                        await interaction.reply({ content: "Ошибка, попробуйте еще раз!", ephemeral: true });
                    })
                }
    
    
            }
        }
        catch{ await interaction.reply({ content: "Ошибка,возможно команда немного не доработана попробуйте еще раз!", ephemeral: true }); }
    })
}