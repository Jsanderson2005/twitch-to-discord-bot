# twitch-to-discord-bot

### How to setup:

1. Run `yarn` or `npm install` to install dependencies needed.
2. Configure the program using `config.json` (details below)
3. Run the program, using `yarn start` or `npm start`



### How to configure

| Config Name           | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| `channelID`           | The discord channel ID for syncing the chat to. To get the ID, [enable developer mode](https://discordia.me/en/developer-mode), right click on the channel name and copy the ID. |
| ```twitch Channels``` | The channel names where you want to sync the chat from.      |
| `discordToken`        | Discord bot token. You will need to invite the bot to the server and give the right permissions to it: create Web Hooks, manage channels and delete messages. You can create a bot [Here](https://discord.com/developers). |
| `twitchUsername`      | The username of the account you want to use for the bot.     |
| `twitchPassword`      | The [Oauth token](https://twitchapps.com/tmi/) for the account you want to use for the bot. |
| `twitchClientID`      | The client ID for a twitch app. Create one [here](https://dev.twitch.tv/console/apps/create). |
| `maxWebhooks`         | The chat is delivered by Web Hooks. Discord rate limits them. If you have a busy chat, you will need to have more Web Hooks. (The discord bot will generate it for you.) |



### Docker

To run in docker, configure the program using the guide above, then build the container:

```
docker build --tag twitch-to-discord .
```

Then run the image:

```
docker run --name twitch-to-discord -it twitch-to-discord
```

