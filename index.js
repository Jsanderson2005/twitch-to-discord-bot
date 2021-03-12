const Discord = require('discord.js');
const tmi = require('tmi.js');
const config = require('./config.json')
const express = require('express')


const app = express()
const port = process.env.PORT || 5000


const opts = {
    identity: {
        username: config.twitchUsername,
        password: config.twitchPassword
    },
    channels: config.twitchChannels
};


const client = new tmi.client(opts);
const bot = new Discord.Client();


let webhooks = [];
var webhookNumber = 1;


client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);


client.connect();
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
bot.login(config.discordToken);


app.get('/', (req, res) => {
    res.send('Twitch to Discord Bot')
  })

async function onMessageHandler(target, context, msg, self) {
    if (self) { return; }
    client.api({
        url: `https://api.twitch.tv/kraken/channels/${context['user-id']}`,
        method: "GET",
        headers: {
            "Accept": "application/vnd.twitchtv.v5+json",
            "Client-ID": config.twitchClientID
        }
    }, (err, res, body) => {
        var userLogo = body.logo;
        webhooks[webhookNumber].send(msg, {
            username: context.username,
            avatarURL: userLogo,
        });
    });
    if (webhookNumber >= config.maxWebhooks) {
        webhookNumber = 1
    }
}

function onConnectedHandler(addr, port) {
    console.log(`Connected to ${addr}:${port}`);
}

bot.on('ready', async () => {
    const channel = bot.channels.cache.get(config.channelID)
    channel.fetchWebhooks()
        .then(hooks => {
            if (hooks.size < config.maxWebhooks) {
                console.log("Not enough webhooks... Generating some now...")
                for (var i = 1; i < config.maxWebhooks + 1; i++) {
                    channel.createWebhook(`Twitch Webhook ${i}`, {
                        avatar: ''
                    }).then(webhook => {
                        console.log(`Created webhook ${webhook}`)
                        webhooks[i] = webhook
                    });
                }
            }
            else {
                console.log("Enough webhooks...")
                webhooks = hooks.first(config.maxWebhooks);
            }
        })
    console.log('Discord Bot Ready');
});

bot.on('message', (msg) => { });