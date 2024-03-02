import { SlashCommandBuilder,EmbedBuilder } from 'discord.js'
export function SetEmbedMessage(title,image_url,description){
    const NewNotifMess = new EmbedBuilder()
        .setColor(0xa52a2a)
        .setTitle(title)
        .setDescription(description)
        .setImage(image_url)
    return NewNotifMess
}
const data = new SlashCommandBuilder()
    .setName('embed_mess')
    .setDescription('ИИ генерирует арт после присылается фото')
    .addChannelOption(option => option.setName("channel")
        .setDescription("Канал куда нужно скинуть сообщение")
        .setRequired(true))
    .addBooleanOption(option => option.setName("ping_all")
        .setDescription("Добавить ли пинг всех пользователей в сообщение")
        .setRequired(true))
    .addStringOption(option =>
        option.setName('title')
            .setDescription("Название сообщения"))
    .addStringOption(option =>
        option.setName("description")
        .setDescription("Задайте описание к сообщению"))
    .addAttachmentOption(option =>
        option.setName('image_url')
            .setDescription("Ссылка на картинку"));
export const CreateEmbedMessage = data.toJSON();