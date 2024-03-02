import { Client, GatewayIntentBits, Events, REST, Routes, SlashCommandBuilder, ActivityType, ComponentType, ForumChannel, GuildForumThreadManager } from 'discord.js';
import { Primer } from './Commands/GetVideo/Primer.js';
import { LastVideo } from './Commands/GetVideo/LastVideo.js';
import { CreateTyanData } from './Commands/Stable Diffusion/createtyan.js';
import { CreateDonateData, ButtonsDonateRow } from './Commands/donate.js';
import { CreateEmbedMessage, SetEmbedMessage } from './Commands/embed_message.js';
import { CreateMessForOpenData, SendDMMessage } from './Commands/create_krutki.js';
import Tenor from './Commands/SendCommandsGifsFold/send_gif.js';
import SetCommandForGifs, { CommandsForGifs } from './Commands/SendCommandsGifsFold/many_commands_gifs.js';
import { GenerateAIImage } from './Commands/Stable Diffusion/command.js';
import { MusicCommands } from './Commands/Music/SlashComandsBuilder.js';
import MusicFunc from './Commands/Music/index.js';
import { config } from 'dotenv';
config();
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});

const clientId = '968941724347027456';
const guildId = '473149231763423242'; //546024597166882855

const token = process.env.DISCORD_ID
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
setInterval(() => {
  Primer().then(v => {
    const NewVideo = v.items[0]
    //console.log(v);
    if (NewVideo != null) {
      LastVideo(NewVideo, client);
    }
  }).catch(e => {
    //console.log(e)
  })
}, 5000);

const commands = []
commands.push(CreateTyanData)
commands.push(CreateDonateData)
commands.push(CreateEmbedMessage)
commands.push(CreateMessForOpenData)
CommandsForGifs.map((el) => {
  var data = new SlashCommandBuilder()
  if (el?.Games == undefined) {
    data.setName(el.CmdName).setDescription(el.Desc).addUserOption(option =>
      option.setName('user')
        .setDescription("Пользователь которому вы хотите отправить сообщение")
        .setRequired(true))
  } else {
    data.setName(el.CmdName).setDescription(el.Desc).addStringOption(option =>
      option.setName('games').setDescription('Игру которою вы хотите выбрать')
        .setRequired(true))
    el?.Games?.map(el => {
      data.options[0].addChoices({ name: el.Name, value: el.Value })
    })
  }
  commands.push(data.toJSON())
})
/*GameCommands.map((el) => {
  commands.push(el);
})*/
MusicCommands.map((el) => {
  commands.push(el);
});
const rest = new REST({ version: '9' }).setToken(token);
(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
client.on("messageCreate", async msg => {
  if (msg.author.bot) {
    return;
  }
  if (msg.channelId == "896396740918403122") {
    msg.react("✅");
    msg.react("❌");
  }
  else if (msg.channelId == "969007612060373032") {
    if (msg.content.startsWith("!")) {
      Tenor.Search.Query(msg.content, "1").then((res) => {
        msg.channel.send(res[0].url);
      })
    }
    else {
      return;
    }
  }
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  //AdminCmds(interaction);

  if (interaction.commandName === "donate") {
    await interaction.reply({
      content: "Пожертвования GAMES OF STREAMS",
      components: [ButtonsDonateRow]
    });
  }
  
  if (interaction.commandName === "embed_mess") {
    const title = interaction.options.getString("title");
    const ping_all = interaction.options.getBoolean("ping_all");
    const description = interaction.options.getString("description");
    const image = interaction.options.getAttachment("image_url");
    const channel = interaction.options.getChannel('channel');
    if (interaction.member.roles.cache.has("896389216584486913")) {
      await interaction.reply("Сообщение добавлено");
      const Embed = SetEmbedMessage(title, image.url, description);
      client.channels.cache.get(channel.id).send({ content: ping_all ? "@everyone" : "", embeds: [Embed] });
    } else {
      await interaction.reply({ content: "Нет прав на использование команды", ephemeral: true });
    }

  }
  if (interaction.commandName === "send_dm_for_twists") {

    let user = client.users.fetch('392301006245068801');
    SendDMMessage(interaction.options.getString("count"), interaction.options.getString("game"), user, interaction.user)
    await interaction.reply({ content: "Успешно отправлено на рассмотрение", ephemeral: true })
  }
  SetCommandForGifs(interaction, interaction.user);
  MusicFunc(interaction,streamer);
  if (interaction.commandName === "generate_art") {
    await interaction.deferReply({ ephemeral: false });
    GenerateAIImage(interaction);
    const collector = interaction.channel.createMessageComponentCollector({ ComponentType: ComponentType.Button });
    collector.on('collect', async i => {
      const forum = client.channels.fetch("1166781231581634610")
      forum.then((res) => {
        res.threads.create({
          name: i.user.displayName + " выложил картинку сгенерированную в Боте, оценивайте)",
          message: {
            content: "",
            files: [i.message.attachments.first().url]
          },

        })
      })
      
    });
  }
});
//
client.login(token);