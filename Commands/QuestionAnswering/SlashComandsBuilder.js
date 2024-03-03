import { SlashCommandBuilder } from 'discord.js'
export const text_generationPipeline = new SlashCommandBuilder()
    .setName('text_generation')
    .setDescription('Test AI command').addStringOption(option =>
        option.setName('text_to_generation')
            .setDescription("Текст для генерации его продолжения")
            .setRequired(true));