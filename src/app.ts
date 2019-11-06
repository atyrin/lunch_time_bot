import { MenuManager } from "./LunchMenu";
import Telegraf, { ContextMessageUpdate } from "telegraf";

console.log("Register Bot")
const bot: Telegraf<ContextMessageUpdate>  = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Привет, это бот, который аггрегирует меню из ближайших заведений'))
bot.help((ctx) => ctx.reply('Команда /menu'))


console.log("Create custom commands")
let mm = new MenuManager();
bot.command('menu', async (ctx) => {
    console.log(ctx.from);
    ctx.reply(`${(await mm.getMenus()).map(m => m.toString())}`, {parse_mode:"Markdown"})
})

console.log("Start Bot")
bot.launch()