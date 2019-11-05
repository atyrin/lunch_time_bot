const Telegraf = require('telegraf')

console.log("Register Bot")
const bot = new Telegraf("1012104538:AAGSWMzzqEtOQrE1o46_F0zMnTZ7KnQ7nTs")//process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()