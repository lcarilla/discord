require('dotenv').config();
const fs = require("fs");
const { Client, GatewayIntentBits } = require('discord.js');
require("./mod/slashcmds")();
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const client = new Client({ intents: [GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.Guilds] });
client.on('interactionCreate', async interaction => {
  if(interaction.commandName === "johnxina"){
    if (!interaction.member.voice.channel) { 
        interaction.reply("join a voice channel to use this command")
    }else{
        const resource = createAudioResource('./johnxina.ogg');
        const lyrics = fs.readFileSync("./bingchilling.txt").toString();
        interaction.reply(lyrics)
        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.member.voice.channel.guild.id,
            adapterCreator: interaction.member.voice.channel.guild.voiceAdapterCreator,
        });
        const player = createAudioPlayer();
        const sub = connection.subscribe(player);
        player.play(resource);
        player.on(AudioPlayerStatus.Idle, () => {
            sub.unsubscribe();
            connection.destroy();
            interaction.editReply("https://i.scdn.co/image/ab6761610000e5eb5ade2bbfc5fb33914d5ed14f");
        });
    }
  }
  if(interaction.commandName === "bingchilling"){
    if (!interaction.member.voice.channel) { 
        interaction.reply("join a voice channel to use this command")
    }else{
        const bingchilling = createAudioResource('./bingchilling.ogg');
        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.member.voice.channel.guild.id,
            adapterCreator: interaction.member.voice.channel.guild.voiceAdapterCreator,
        });
        const player = createAudioPlayer();
        const sub = connection.subscribe(player);
        player.play(bingchilling);
        interaction.reply("https://i.scdn.co/image/ab6761610000e5eb5ade2bbfc5fb33914d5ed14f");
        player.on(AudioPlayerStatus.Idle, () => {
            sub.unsubscribe();
            connection.destroy();
        });
    }
  }
})
client.login(process.env.token);