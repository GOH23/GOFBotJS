import fs from "fs";
import {EmbedBuilder} from 'discord.js'
export function LastVideo(ParserData, client) {
    const exampleEmbed = new EmbedBuilder()
        .setColor(0xa52a2a)
        .setTitle(ParserData.title)
        .setURL(ParserData.link)
        .setAuthor({ name: 'Games of Stream', iconURL: 'https://yt3.googleusercontent.com/ytc/APkrFKYkXL98SmNkGWWep7sBKNiqpt3_eMXfc5KPKwROZw=s176-c-k-c0x00ffffff-no-rj', url: 'https://www.youtube.com/@gofsoff' })
        .setImage(`https://i.ytimg.com/vi/${ParserData.id.substring(9)}/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCEgWiF_7TxMGJdg4i0kd49Y4bmlg`)
        .setTimestamp(new Date(ParserData.pubDate))
        .setFooter({ text: ParserData.author, iconURL: 'https://yt3.googleusercontent.com/ytc/APkrFKYkXL98SmNkGWWep7sBKNiqpt3_eMXfc5KPKwROZw=s176-c-k-c0x00ffffff-no-rj' });
    fs.readFile('config.json', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            const DataInFile = JSON.parse(data);
            if (DataInFile.id == ParserData.id) {
                //console.log("Видео уже было на канале");
                return;
            }
            else {
                var json = JSON.stringify(ParserData);
                fs.writeFile('config.json', json, err => {
                    if (err) {
                        console.log(err.message);
                        throw err;
                    }
                });
                client.channels.cache.get('1074751072373067867').send({content: "@everyone",embeds: [exampleEmbed]});
            }
        }
    });
}