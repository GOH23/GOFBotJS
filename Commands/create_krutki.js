import { SlashCommandBuilder,EmbedBuilder } from 'discord.js'
export const SendDMMessage = (countTwists,Game,ToUser,FromUser)=>{
    const NewNotifMess = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle("Запрос на крутки от подписчика")
    .setThumbnail(FromUser.avatarURL())
    .setImage("https://media.tenor.com/QiUtH4YUcocAAAAC/youre-welcome-pleasure.gif")
    .setAuthor({ name: FromUser.globalName, iconURL: FromUser.avatarURL() })
    .addFields(
		{ name: 'Сколько круток', value: countTwists},
		{ name: "Игра в которой будет крутить", value: Game },
	)
    ToUser.then((user)=>{
        user.send({embeds: [NewNotifMess]});
    })
}
const data = new SlashCommandBuilder()
    .setName('send_dm_for_twists')
    .setDescription('Напишите ютуберу по HSR и Genshin Impact сколько круток хотели бы открутить в игре на видео')
    .addStringOption(option =>
        option.setName('count')
            .setDescription("Количество накопленных круток")
            .setRequired(true))
    .addStringOption(option =>
        option.setName('game')
            .setDescription('Игра в которой вы будете крутить')
            .setRequired(true)
            .addChoices(
                { name: 'Honkai Star Rail', value: 'Honkai Star Rail' },
                { name: 'Honkai Impact 3rd', value: 'Honkai Impact 3rd' },
                { name: 'Genshin Impact', value: 'Genshin Impact' },
            ));
export const CreateMessForOpenData = data.toJSON();