import { MenuManager, AvailablePlaces, Places } from "../MenuInteraction/MenuManager";
import Telegraf, { ContextMessageUpdate, Markup } from "telegraf";
import { replyForMenu } from "./MenuActions";


export function registerPlacesCommand(bot: Telegraf<ContextMessageUpdate>) {
    bot.command('places', ({ reply }) => {
        return reply('List of available places', Markup
            .keyboard([
                [
                    AvailablePlaces[AvailablePlaces.Kolkovna],
                    AvailablePlaces[AvailablePlaces.LaCasaTrattoria]
                ],
                [
                    AvailablePlaces[AvailablePlaces.BreakTimeBistro],
                    AvailablePlaces[AvailablePlaces.CafeInmago]
                ]
            ])
            .resize()
            .extra()
        )
    })
}

export function registerRestaurantNameMessage(mm: MenuManager, bot: Telegraf<ContextMessageUpdate>) {
    bot.hears(/.+/, async (ctx) => {
        const requestedRestaurant = Places.get(AvailablePlaces[ctx.match[0]]);
        if (!requestedRestaurant) {
            ctx.reply(`Sorry, Place: ${ctx.match[0]} is not supported yet`)
        }
        const menu = await mm.getMenu(requestedRestaurant);
        replyForMenu(menu, ctx);
    })
}