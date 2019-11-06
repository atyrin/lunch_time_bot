import { MenuManager } from "./LunchMenu";

const Telegraf = require('telegraf')

console.log("Register Bot")
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Привет, это бот который аггрегирует меню из ближайших заведений'))
bot.help((ctx) => ctx.reply('Комманда /menu'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

let mm = new MenuManager();
bot.hears('menu', async (ctx) => ctx.reply(await mm.getMenus()))
bot.command('menu', async (ctx) => ctx.reply(await mm.getMenus()))

console.log("Start Bot")
bot.launch()