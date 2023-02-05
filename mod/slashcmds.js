
const { REST, Routes } = require('discord.js');
const commands = require("../conf/cmds")
//REGISTER
module.exports = () => {
  const rest = new REST({ version: '10' }).setToken(process.env.token);
  (async () => {
    try {
      console.log('Started refreshing application (/) commands.');
      await rest.put(Routes.applicationCommands("1049394211839033415"), { body: commands });
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  })();
}