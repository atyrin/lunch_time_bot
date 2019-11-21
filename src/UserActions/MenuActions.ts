import { MenuManager } from "../MenuInteraction/MenuManager";
import Telegraf, { ContextMessageUpdate, Extra, Markup, Context } from "telegraf";
import { LunchMenuMessage } from "../MenuInteraction/LunchMenu";

export function registerMenuCommand(mm: MenuManager, bot: Telegraf<ContextMessageUpdate>) {
    bot.command('menu', async (ctx) => {
        console.log(ctx.from);
        (await mm.getMenus()).map(
            menu => {
                replyForMenu(menu, ctx);
            });
    });
}

export function registerTranslationAction(mm: MenuManager, bot: Telegraf<ContextMessageUpdate>) {

    bot.action('translateToRussian', async (ctx) => {
        const restaurantInMessage = mm.getTranslatableRestaurant(ctx.callbackQuery.message.text);
        if (!restaurantInMessage) {
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
        const restaurantInMessage = mm.getTranslatableRestaurant(ctx.callbackQuery.message.text);
        const menu = await mm.getMenu(restaurantInMessage);
        ctx.editMessageText(
            menu.toString(),
            Extra.markdown().markup((m) => m.inlineKeyboard([
                m.callbackButton('Translate', 'translateToRussian'),
            ])))
    });
}


export function replyForMenu(menu: LunchMenuMessage, ctx: ContextMessageUpdate){
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
}