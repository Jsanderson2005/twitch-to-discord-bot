const config = require('./config.json')

function TestConfig() {
    if (config.channelID === "") {throw new Error('Bad Configuration. "channelID" is empty.');}
    if (config.twitchChannels === "") {throw new Error('Bad Configuration. "twitchChannels" is empty.');}
    if (config.discordToken === "") {throw new Error('Bad Configuration. "discordToken" is empty.');}
    if (config.twitchUsername === "") {throw new Error('Bad Configuration. "twitchUsername" is empty.');}
    if (config.twitchPassword === "") {throw new Error('Bad Configuration. "twitchPassword" is empty.');}
    if (config.twitchClientID === "") {throw new Error('Bad Configuration. "twitchClientID" is empty.');}
    if (config.maxWebhooks === 0) {throw new Error('Bad Configuration. "maxWebhooks" is empty.');}
}   

exports.TestConfig = TestConfig