const Discord = require("discord.js");
const client = new Discord.Client();
const commandPrefix = process.env.prefix;

client.on("ready", () => {
  client.user.setActivity('press F-help to be gay', { type: 'PLAYING' });
   client.user.setStatus("idle");
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
 //
});

 
client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

//set some basic vars
var testing = false;
var spamInterval;
var spambool = false;
var profanitybool = false;
var keywords = ["Banana", "Orange", "Apple", "Mango"];
var keycomebacks = ["Banana", "Orange", "Apple", "Mango"];
var logbotguilds = process.env.logbotguilds;

client.on("message", async message => {

  if(message.channel.id != process.env.messagelog)
  { 
    //log messages
    client.channels.find("FrostbotDatabase", message.guild.id.toString()).send(message.guild.name + ","+ message.channel.name + ","  + message.author.username + ": " + message.content);
  
  }
  //check if it's a bot
  if(message.author.bot) return;
  
  const args = message.content.slice(commandPrefix.length).trim().split(/ +/g);
  const norgs = message.content.split(/ +/g);
  const command = args.shift().toLowerCase();
  const nommand = norgs.shift().toLowerCase();
  
  /////START OF COMMANDS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  /////START OF COMMANDS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  /////START OF COMMANDS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  /////START OF COMMANDS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  if (!~logbotguilds.indexOf(message.guild.id))
  {
  if (command != "deletekey")
  {
    //set keywords and such
     client.channels.get(process.env.databaseChannel).fetchMessages({ limit: 100 })
              .then(messages => 
              { 
                var key = "";
                messages.forEach(function(element) 
                {
                  key = key + element; 
                });
                keywords = key.split(";");
            })
            .catch(console.log("broke"));
    client.channels.get(process.env.databaseChannelComeback).fetchMessages({ limit: 100 })
              .then(messages => 
              { 
                var come = "";
                messages.forEach(function(element) 
                {
                  come = come + element; 
                });
                keycomebacks = come.split(";");
            })
            .catch(console.log("broke"));
    
    
    //ok, check for keyword. If is, send.
    for (i = 0; i < keywords.length; i++) 
      {
        if (message.content.replace(" ","").toLowerCase() == keywords[i].replace(" ","").toLowerCase())
        {
            message.channel.send(keycomebacks[i]);
        }
      }
  }
 
  
//check for words even more contained in message
  if (~message.content.indexOf("shit".toLowerCase()))
  {
      const m = await message.channel.send("Lol they said shit");
  }
  if (~message.content.indexOf("fuck".toLowerCase()))
  {
      const m = await message.channel.send("Lol they said fuck");
  }
   if (~message.content.indexOf("balls".toLowerCase()))
  {
      const m = await message.channel.send("Lol they said balls");
  }
   if (~message.content.indexOf("cock".toLowerCase()))
  {
      const m = await message.channel.send("Lol they said cock");
  }
   if (~message.content.indexOf("dick".toLowerCase()))
  {
      const m = await message.channel.send("Lol they said dick");
  }
  if (~message.content.indexOf("damn".toLowerCase()))
  {
      const m = await message.channel.send("Lol they said damn");
  }
  if (~message.content.indexOf("ass".toLowerCase()))
  {
      const m = await message.channel.send("Lol they said ass");
  }
  if(message.content.indexOf(commandPrefix) !== 0) return;
 
  
  
 if(command === "lenny") 
 {
   message.delete(10);
   const m = await message.channel.send("( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°)");
 }

  if(command === "keyword") 
  {
     // if (nommand.includes(','))
      //{
     if (~message.content.indexOf(";"))
     {
        var numberof = 0;
        client.channels.get(process.env.databaseChannel).fetchMessages({ limit: 100 })
              .then(messages => 
              { 
               
                messages.forEach(function(element) 
                {
                  if(element.content != null)
                  {
                   numberof = numberof + 1;
                  }
                });
          
               if(numberof < 100)
                  {
                   const messagenocommand = message.content.slice(commandPrefix.length + command.length).trim();
                    const localArgs = messagenocommand.split(";");
                     client.channels.get(process.env.databaseChannel).send(localArgs[0] + ";");
                     client.channels.get(process.env.databaseChannelComeback).send(localArgs[1] + ";");
                     message.channel.send("Ok, got it.");
                    
                    client.channels.get(process.env.databaseChannel).fetchMessages({ limit: 100 })
              .then(messages => 
              { 
                var key = "";
                messages.forEach(function(element) 
                {
                  key = key + element; 
                });
                keywords = key.split(";");
            })
            .catch(console.log("broke"));
    client.channels.get(process.env.databaseChannelComeback).fetchMessages({ limit: 100 })
              .then(messages => 
              { 
                var come = "";
                messages.forEach(function(element) 
                {
                  come = come + element; 
                });
                keycomebacks = come.split(";");
            })
            .catch(console.log("broke"));
    
    for (i = 0; i < keywords.length; i++) 
      {
        if (message.content.replace(" ","").toLowerCase() == keywords[i].replace(" ","").toLowerCase())
        {
            message.channel.send(keycomebacks[i]);
        }
      }
                    
                  }
          if(numberof > 99)
                  {
                     message.channel.send("Too many keywords currently.");
                  }
            })
            .catch(console.log("broke"));
       
            
       
     }
  }
  if(command === "deletekey") 
  {
    var finalmessageid;
    var finalmessageid2;
     await client.channels.get(process.env.databaseChannel).fetchMessages({ limit: 100 })
        .then(messages => {
       messages.forEach(function(element) 
                {
                   finalmessageid = element.id;
                });})
        .catch();
     await client.channels.get(process.env.databaseChannelComeback).fetchMessages({ limit: 100 })
        .then(messages => {
       messages.forEach(function(element) 
                {
                   finalmessageid2 = element.id;
                });})
        .catch();
     await client.channels.get(process.env.databaseChannel).fetchMessage(finalmessageid)
           .then(message => {
                message.delete()
       .then(msg => console.log(`Deleted message from ${msg.author.username}`))
  .catch(console.error);
            })
          .catch(console.error);
     await client.channels.get(process.env.databaseChannelComeback).fetchMessage(finalmessageid2)
           .then(message => {
                message.delete()
       .then(msg => console.log(`Deleted message from ${msg.author.username}`))
  .catch(console.error);
     })
          .catch(console.error);
  }
   if (command === "spam") 
   {      
     if(message.author.id != process.env.gamingdudester && !message.member.roles.some(r=>["spammer"].includes(r.name)) || process.env.spam == "false" && message.author.id != process.env.gamingdudester)
      return message.reply("Sorry, you don't have permission to use this!");
     
     const spamMessage = args.join(" ");
     if  (spamMessage.length > 0 && spambool == false )
     {
            spambool = true;
             spamInterval = setInterval (function () 
             {
              message.channel.send(spamMessage)
             }, 2000);
     }
   }
  
  if (command === "quitspam") 
   { 
      if(message.author.id != process.env.gamingdudester && !message.member.roles.some(r=>["spammer"].includes(r.name)) || process.env.spam == "false" && message.author.id != process.env.gamingdudester)
      return message.reply("Sorry, you don't have permission to use this!");
      clearInterval (spamInterval);
     spambool = false;
   }
  
  if(command === "help") 
  {
    const m = await message.channel.send("Current commands: F-ping, F-say <message>, F-purge <int>, F-id, F-profanity (Not accessable through command),"
                                         + "F-lenny, F-spam <message>, F-quitspam," 
                                         + "F-keyword <keyword>;<comeback>, F-deletekey");
  }
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping s an average latency between the bot and the websocket server (one-way, not round-tripnst m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  if(command === "id") 
  {
    // And we get the bot to say the thing: 
    message.channel.send(message.channel.id);
  }
  //
  if(command === "say") {
  
    const sayMessage = args.join(" ");
     message.delete(20);
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
  if(command === "purge") {
    var messagecount = parseInt(args[0]);
  message.channel.fetchMessages({limit: messagecount})
    .then(messages => message.channel.bulkDelete(messages)
    .catch(message.reply("Ok <->")));
  }
}
}
  );
//END OF COMMANDS!
client.login(process.env.BOT_TOKEN);
