// Load up the discord.js library
const Discord = require("discord.js");
// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();
//
// Here we load the config.json file that contains our token and our prefix values. 
const commandPrefix = process.env.prefix;


client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setGame(`on ${client.guilds.size} servers`);
  
  
});

 
client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
  
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});



client.on("message", async message => {
  if(message.author.bot) return;
  
  const args = message.content.slice(commandPrefix.length).trim().split(/ +/g);
  const norgs = message.content.split(/ +/g);
  const command = args.shift().toLowerCase();
  const nommand = norgs.shift().toLowerCase();
  
 
 var testing = false;
  var spamInterval;
  var keywords;
  var keycomebacks;

  var keywordstring = new Array(225);
  var keycomebacks = new Array(225);
  
    client.channels.get(process.env.databaseChannel).fetchMessages({ limit: 2 })
        .then(messages => 
        { 
          var keywords = messages.first().edit(messages.first().content.split(','));
          var keycomebacks =  messages.last().edit(messages.last().content.split(','));
        })
        .catch(message.channel.send("teps");message.channel.send("teps"););
  
  
  
  
  //txt += nommand;
  keywords.forEach(function(element, i) 
  {
    if (~nommand.indexOf(element))
    {
        message.channel.send(keycomebacks[element]);
    }
});
  
if (~nommand.indexOf("foo"))
  {
      const m = await message.channel.send("Lol they said tib");
      process.env.test = "foo";
  }
  if (~nommand.indexOf("shit"))
  {
      const m = await message.channel.send("Lol they said shit");
  }
  if (~nommand.indexOf("fuck"))
  {
      const m = await message.channel.send("Lol they said fuck");
  }
   if (~nommand.indexOf("balls"))
  {
      const m = await message.channel.send("Lol they said balls");
  }
   if (~nommand.indexOf("cock"))
  {
      const m = await message.channel.send("Lol they said cock");
  }
   if (~nommand.indexOf("dick"))
  {
      const m = await message.channel.send("Lol they said dick");
  }
  if (~nommand.indexOf("damn"))
  {
      const m = await message.channel.send("Lol they said damn");
  }
  if (~nommand.indexOf("ass"))
  {
      const m = await message.channel.send("Lol they said ass");
  }
  if(message.content.indexOf(commandPrefix) !== 0) return;
 
 if(command === "lenny") 
 {
   message.delete(10);
   const m = await message.channel.send("( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°)");
 }
  if (command === "spam") 
   { 
     const spamMessage = args.join(" ");
     if  (spamMessage.length > 0)
     {
             spamInterval = setInterval (function () 
             {
              message.channel.send(spamMessage)
             }, 1300);
     }
   }
  
  if (command === "quitspam") 
   { 
      clearInterval (spamInterval);
   }
  
  if(command === "keyword") 
  {
     // if (nommand.includes(','))
      //{
        const localArgs = args.join().split(',');
     client.channels.get(process.env.databaseChannel).fetchMessages({ limit: 2 })
        .then(messages => {messages.first().edit(messages.first().content + localArgs[0] + ',');
                          messages.last().edit(messages.last().content + localArgs[1] + ',');})
        .catch(console.error);
  }
  
  if(command === "help") 
  {
    const m = await message.channel.send("Current commands: F-ping, F-say, F-purge, F-profanity (Not acessable through command), F-lenny, F-spam, F-quitSpam");
  }
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
  
    const sayMessage = args.join(" ");
     message.delete(20);
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  //
  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention!
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});

client.login(process.env.BOT_TOKEN);
