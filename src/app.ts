import { MenuManager } from "./LunchMenu";
import Telegraf, { ContextMessageUpdate, Extra } from "telegraf";
require('dotenv').config();

console.log("Register Bot");
console.log(`Arguments: ${process.argv}`);
const port = process.env.BOT_TOKEN ? process.env.BOT_TOKEN : process.argv[2];

const bot: Telegraf<ContextMessageUpdate> = new Telegraf(port);
bot.start((ctx) => ctx.reply('Привет, это бот, который аггрегирует меню из ближайших заведений'))
bot.help((ctx) => ctx.reply('Для отображения меню ближайших ресторанов используйте команду /menu'))

console.log("Create custom commands");

const mm = new MenuManager();
bot.command('menu', async (ctx) => {
    console.log(ctx.from);
    (await mm.getMenus()).map(
        menu => {
            if (menu.pictureLink) {
                ctx.replyWithPhoto(
                    menu.pictureLink,
                    {
                        caption: `${menu.toString()}`,
                        parse_mode: "Markdown"
                    })
            }
            else {
                ctx.reply(
                    menu.toString(),
                    Extra.markdown().markup((m) => m.inlineKeyboard([
                        m.callbackButton('Translate', 'translateToRussian'),
                    ])))
            }
        });
});

bot.action('translateToRussian', async (ctx) => {
    const restaurantInMessage = mm.getRestaurantInstance(ctx.callbackQuery.message.text);
    if(!restaurantInMessage){
        ctx.editMessageText(
            "Перевод недоступен\n" + ctx.callbackQuery.message.text,
            Extra.markdown().markup((m) => m.inlineKeyboard([
                m.callbackButton('Translate back', 'translateToCzech'),
            ])))
    }

    const menu = await mm.getTranslatedMenu(restaurantInMessage);
    ctx.editMessageText(
        menu.toTranslatedString(),
        Extra.markdown().markup((m) => m.inlineKeyboard([
            m.callbackButton('Translate back', 'translateToCzech'),
        ])))
});

bot.action('translateToCzech', async (ctx) => {
    const restaurantInMessage = mm.getRestaurantInstance(ctx.callbackQuery.message.text);
    const menu = await mm.getMenu(restaurantInMessage);
    ctx.editMessageText(
        menu.toString(),
        Extra.markdown().markup((m) => m.inlineKeyboard([
            m.callbackButton('Translate', 'translateToRussian'),
        ])))
});

console.log("Start Bot");
bot.launch()