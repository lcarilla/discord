module.exports = (interaction) => {
if (!interaction.member.voice.channel) { 
    interaction.reply("bruh. JOIN A VC")
}else{
    const connection = joinVoiceChannel({
        channelId: interaction.member.voice.channel.id,
        guildId: interaction.member.voice.channel.guild.id,
        adapterCreator: interaction.member.voice.channel.guild.voiceAdapterCreator,
    });
    const player = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause,
        },
    });
    player.play(resource);
    connection.subscribe(player);
    player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy();
    });
}
}