import { MenuManager } from "./MenuInteraction/MenuManager";
import Telegraf, { ContextMessageUpdate } from "telegraf";
import { registerMenuCommand, registerTranslationAction } from "./UserActions/MenuActions";
import { registerPlacesCommand, registerRestaurantNameMessage } from "./UserActions/PlacesActions";
require('dotenv').config();

console.log("Register Bot");
console.log(`Arguments: ${process.argv}`);
const port = process.env.BOT_TOKEN ? process.env.BOT_TOKEN : process.argv[2];

const bot: Telegraf<ContextMessageUpdate> = new Telegraf(port);
bot.start((ctx) => ctx.reply('Привет, это бот, который аггрегирует меню из ближайших заведений'))
bot.help((ctx) => ctx.reply('Для отображения меню ближайших ресторанов используйте команду /menu \n Для отображения доступных мест — команду /places'))

console.log("Create custom commands");

const mm = new MenuManager();

registerMenuCommand(mm, bot);

registerTranslationAction(mm, bot);

registerPlacesCommand(bot);
registerRestaurantNameMessage(mm, bot);

console.log("Start Bot");
bot.launch()