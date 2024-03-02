import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } from 'discord.js';
const D100r = new ButtonBuilder()
    .setLabel('Донат 100руб')
    .setURL("https://www.donationalerts.com/r/gos_live")
    .setStyle('Link');

const D200r = new ButtonBuilder()
    .setLabel('Донат 200руб')
    .setURL("https://www.donationalerts.com/r/gos_live")
    .setStyle('Link');
const data = new SlashCommandBuilder()
    .setName('donate')
    .setDescription('Команда для того чтобы вы могли сделать пожертвование Games of Stream');
export const CreateDonateData = data.toJSON();
export const ButtonsDonateRow = new ActionRowBuilder()
    .addComponents(D100r, D200r);
