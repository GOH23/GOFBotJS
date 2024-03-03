import ytdl from 'ytdl-core';
import { createAudioPlayer, joinVoiceChannel, createAudioResource, NoSubscriberBehavior, AudioPlayerStatus, VoiceConnectionStatus  } from '@discordjs/voice';

export default async function MusicFunc(interaction) {
  const player = createAudioPlayer({
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Pause,
    },
  })
  if (interaction.commandName == 'play') {

    let stream = ytdl(interaction.options.getString("url"), {
      filter: "audioonly",
    });
    const connection = await joinVoiceChannel({
      channelId: interaction.member.voice.channel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.member.voice.channel.guild.voiceAdapterCreator
    })

    const resource = createAudioResource(stream)
    connection.subscribe(player)
    player.play(resource);
    player.on('error', error => {
      console.error(`Error: ${error.message} with resource ${error.resource.metadata}`);
      //player.play(getNextResource());
    });
    await interaction.reply("Успешно");
  }
  if (interaction.commandName == "queue") {

  }
  if(interaction.commandName == "pause"){
    //player.pause();
    await interaction.reply("Пока в разработке!");
  }
  if(interaction.commandName == "resume"){
    player.unpause();
    await interaction.reply("Пока в разработке!");
  }
  player.on(AudioPlayerStatus.Idle,()=>{
    //soon queue
    //player.play(getNextResource());
  })
}