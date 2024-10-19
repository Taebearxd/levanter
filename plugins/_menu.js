const bot = require('../lib/events')
const {
  addSpace,
  textToStylist,
  PREFIX,
  getUptime,
  PLUGINS,
  getRam,
  getDate,
  getPlatform,
} = require('../lib/')
const { VERSION } = require('../config')
bot.addCommand(
  {
    pattern: 'help ?(.*)',
    dontAddCommandList: true,
  },
  async (message, match) => {
    const sorted = bot.commands.sort((a, b) => {
      if (a.name && b.name) {
        return a.name.localeCompare(b.name)
      }
      return 0
    })
    const [date, time] = getDate()
    let CMD_HELP = `╭────────────────╮
						𝗞𝝣̸̷⃨⃞⃞⃞⃞⃞⃞⃞⃞⃞⃞⃞𝗩𝝞𝝢̶
╰────────────────╯

╭────────────────
│ 𝐏𝐫𝐞𝐟𝐢𝐱 : ${PREFIX}
│ 𝐔𝐬𝐞𝐫 : ${message.pushName}
│ 𝐓𝐢𝐦𝐞 : ${time}
│ 𝐃𝐚𝐲 : ${date.toLocaleString('en', { weekday: 'long' })}
│ 𝐃𝐚𝐭𝐞 : ${date.toLocaleDateString('hi')}
│ 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 : ${VERSION}
│ 𝐏𝐥𝐮𝐠𝐢𝐧𝐬 : ${PLUGINS.count}
│ 𝐑𝐚𝐦 : ${getRam()}
│ 𝐔𝐩𝐭𝐢𝐦𝐞 : ${getUptime('t')}
│ 𝐏𝐥𝐚𝐭𝐟𝐫𝐨𝐦 : ${getPlatform()}
╰────────────────
╭────────────────
`
    sorted.map(async (command, i) => {
      if (command.dontAddCommandList === false && command.pattern !== undefined) {
        CMD_HELP += `│ ${i + 1} ${addSpace(i + 1, sorted.length)}${textToStylist(
          command.name.toUpperCase(),
          'mono'
        )}\n`
      }
    })

    CMD_HELP += `╰────────────────`
    return await message.send('```' + CMD_HELP + '```')
  }
)

bot.addCommand(
  {
    pattern: 'list ?(.*)',
    dontAddCommandList: true,
  },
  async (message, match) => {
    let msg = ''
    const sorted = bot.commands.sort((a, b) => {
      if (a.name && b.name) {
        return a.name.localeCompare(b.name)
      }
      return 0
    })
    sorted.map(async (command, index) => {
      if (command.dontAddCommandList === false && command.pattern !== undefined) {
        msg += `${index + 1} ${command.name}\n${command.desc}\n\n`
      }
    })
    await message.send('```' + msg.trim() + '```')
  }
)
bot.addCommand(
  {
    pattern: 'menu ?(.*)',
    dontAddCommandList: true,
  },
  async (message, match) => {
    const commands = {}
    bot.commands.map(async (command, index) => {
      if (command.dontAddCommandList === false && command.pattern !== undefined) {
        let cmdType = command.type.toLowerCase()
        if (!commands[cmdType]) commands[cmdType] = []
        let isDiabled = command.active === false
        let cmd = command.name.trim()
        commands[cmdType].push(isDiabled ? cmd + ' [disabled]' : cmd)
      }
    })
    const [date, time] = getDate()
    let msg = `\`\`\`╭═══ 𝗞𝝣̸̷⃨⃞⃞⃞⃞⃞⃞⃞⃞⃞⃞⃞𝗩𝝞𝝢̶ ═══⊷
┃𖹭╭──────────────
┃𖹭│ 𝐏𝐫𝐞𝐟𝐢𝐱 : ${PREFIX}
┃𖹭│ 𝐔𝐬𝐞𝐫 : ${message.pushName}
┃𖹭│ 𝐓𝐢𝐦𝐞 : ${time}
┃𖹭│ 𝐃𝐚𝐲 : ${date.toLocaleString('en', { weekday: 'long' })}
┃𖹭│ 𝐃𝐚𝐭𝐞 : ${date.toLocaleDateString('hi')}
┃𖹭│ 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 : ${VERSION}
┃𖹭│ 𝐏𝐥𝐮𝐠𝐢𝐧𝐬 : ${PLUGINS.count}
┃𖹭│ 𝐑𝐚𝐦 : ${getRam()}
┃𖹭│ 𝐔𝐩𝐭𝐢𝐦𝐞 : ${getUptime('t')}
┃𖹭│ 𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦 : ${getPlatform()}
┃𖹭╰───────────────
╰═════════════════⊷\`\`\`\n`

    if (match && commands[match]) {
      msg += ` ╭─❏ ${textToStylist(match.toLowerCase(), 'smallcaps')} ❏\n`
      for (const plugin of commands[match])
        msg += ` │ ${textToStylist(plugin.toUpperCase(), 'calluna')}\n`
      msg += ` ╰─────────────────`

      return await message.send(msg)
    }
    for (const command in commands) {
      msg += ` ╭─❏ ${textToStylist(command.toLowerCase(), 'smallcaps')} ❏\n`
      for (const plugin of commands[command])
        msg += ` │ ${textToStylist(plugin.toUpperCase(), 'calluna')}\n`
      msg += ` ╰─────────────────\n`
    }
    await message.send(msg.trim())
  }
)
