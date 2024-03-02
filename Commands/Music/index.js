import ytdl from 'ytdl-core';
import { createAudioPlayer, joinVoiceChannel, createAudioResource, NoSubscriberBehavior, AudioPlayerStatus, VoiceConnectionStatus } from '@discordjs/voice';

export default async function MusicFunc(interaction) {
  if (interaction.commandName == 'play') {


    //console.log("Finished playing video " + res);

    // let stream = ytdl(interaction.options.getString("url"), {
    //   filter: "audioonly",

    // });
    // const connection = await joinVoiceChannel({
    //   channelId: interaction.member.voice.channel.id,
    //   guildId: interaction.guild.id,
    //   adapterCreator: interaction.member.voice.channel.guild.voiceAdapterCreator
    // })
    // const player = createAudioPlayer({
    //   behaviors: {
    //     noSubscriber: NoSubscriberBehavior.Pause,
    //   },
    // })
    // const resource = createAudioResource(stream)

    // connection.subscribe(player)
    // player.play(resource);
    // player.on('error', error => {
    //   console.error(`Error: ${error.message} with resource ${error.resource.metadata}`);
    //   //player.play(getNextResource());
    // });
    await interaction.reply("Успешно");
  }
  if (interaction.commandName == "test") {


  }
}