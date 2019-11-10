import { MenuManager } from "./LunchMenu";
import Telegraf, { ContextMessageUpdate, Extra } from "telegraf";
require('dotenv').config()

console.log("Register Bot")
console.log(process.argv)
let port = process.argv && process.argv[2] ? process.argv[2] : process.env.BOT_TOKEN
const bot: Telegraf<ContextMessageUpdate> = new Telegraf(port)
bot.start((ctx) => ctx.reply('Привет, это бот, который аггрегирует меню из ближайших заведений'))
bot.help((ctx) => ctx.reply('Для отображения меню ближайших ресторанов используйте команду /menu'))


console.log("Create custom commands")

let mm = new MenuManager();
bot.command('menu', async (ctx) => {
    console.log(ctx.from);
    (await mm.getMenus()).map(
        m => {
            if (m.pictureLink) {
                ctx.replyWithPhoto(m.pictureLink, { caption: `${m.toString()}`, parse_mode: "Markdown" })
            }
            else {
                ctx.reply(
                    `${m.toString()}`,
                    Extra.markdown().markup((m) => m.inlineKeyboard([
                        m.callbackButton('Translate', 'translateToRussian'),
                    ])))
            }
        });
});

bot.action('translateToRussian', (ctx) => {
    console.log(ctx.from);
    console.log(ctx.callbackQuery.message.text);
    ctx.editMessageText(
        `Message \n[${ctx.callbackQuery.message.text}] \nbut in russian`,
        Extra.markdown().markup((m) => m.inlineKeyboard([
            m.callbackButton('Translate back', 'translateToCzech'),
        ])))
})

bot.action('translateToCzech', (ctx) => {
    console.log(ctx.from);
    console.log(ctx.callbackQuery.message.text);
    ctx.editMessageText(
        `Message [${ctx.callbackQuery.message.text}] but in original czech`,
        Extra.markdown().markup((m) => m.inlineKeyboard([
            m.callbackButton('Translate', 'translateToRussian'),
        ])))
})

console.log("Start Bot")
bot.launch()