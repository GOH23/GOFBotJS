import { SlashCommandBuilder } from 'discord.js'
const PlayMusic = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Команда запуска музыки бота').addStringOption(option =>
        option.setName('url')
            .setDescription("Ссылка на видео или музыку на ютубе")
            .setRequired(true));
const Queue = new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Показывает плейлист всех песен");
const ResumeCommand = new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Возобновляет песню");
const PauseCommand = new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Приостанавливает песню");
export const MusicCommands = [
    Queue.toJSON(),
    PlayMusic.toJSON(),
    ResumeCommand.toJSON(),
    PauseCommand.toJSON()
]
