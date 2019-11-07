import { MenuManager } from "./LunchMenu";
import Telegraf, { ContextMessageUpdate } from "telegraf";

console.log("Register Bot")
console.log(process.argv)
let port = process.argv && process.argv[2] ? process.argv[2] : process.env.BOT_TOKEN
const bot: Telegraf<ContextMessageUpdate>  = new Telegraf(port)
bot.start((ctx) => ctx.reply('Привет, это бот, который аггрегирует меню из ближайших заведений'))
bot.help((ctx) => ctx.reply('Команда /menu'))


console.log("Create custom commands")
let mm = new MenuManager();
bot.command('menu', async (ctx) => {
    console.log(ctx.from);
    (await mm.getMenus()).map(m => {
        if(m.pictureLink){
            ctx.replyWithPhoto(m.pictureLink, { caption: `${m.toString()}`, parse_mode:"Markdown"})
        }
        else{
            ctx.reply(`${m.toString()}`, {parse_mode:"Markdown"})
        }
    });
})

console.log("Start Bot")
bot.launch()