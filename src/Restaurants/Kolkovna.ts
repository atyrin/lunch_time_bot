import {Dish, Menu, TranslatableRestaurant} from "./Restaurant";
import Translator from "../Translator/Translator";

const fetch = require('node-fetch');
const HTMLParser = require('node-html-parser');

export class Kolkovna implements TranslatableRestaurant {
    private readonly URL: string = "https://www.kolkovna.cz/en/kolkovna-argentinska-23";

    getName(): string {
        return "Kolkovna Argentinska"
    }

    getMenuPicture(): Promise<string> {
        return null;
    }

    async getTodayMenu(): Promise<Menu> {
        const rawHtml = await this.loadMenu();
        return await this.parse(rawHtml, async (a)=>a);
    }

    async getTranslatedMenu(translator: Translator): Promise<Menu> {
        const rawHtml = await this.loadMenu();
        return await this.parse(rawHtml, async (text) => await translator.translate(text));
    }

    async loadMenu(): Promise<string> {
        return fetch(this.URL)
            .then((response: Response) => {
                if (response.status !== 200) {
                    console.error(`[kolkovna] non successfull response: ${response.body}`)
                }
                return response.text();
            });
    }

    async parse(text: string, translate: (o:string) => Promise<string>): Promise<Menu> {
        const root: HTMLElement = HTMLParser.parse(text);
        let date: string = this.ejectDate(root);
        let dishes: Array<Dish> = await this.ejectDishes(root, translate);
        if (date && dishes) {
            return new Menu({
                date: date,
                dishes: dishes
            });
        }
        console.log("Return null for Kolkovna menu");
        return null;
    }

    private ejectDate(block: HTMLElement): string {
        let dateBlock: any = block.querySelector('div.dailyMenuWeek h2.brown')
        return dateBlock ? dateBlock.childNodes[0].rawText : null;
    }

    private async ejectDishes(block: HTMLElement, translate: (text:string) => Promise<string>): Promise<Array<Dish>> {
        const tableBlock = block.querySelector('div.dailyMenuWeek table.menu.dailyMenu');
        if (!tableBlock) return null;

        const table = tableBlock.childNodes;
        let dishes: Array<Dish> = [];
        for (const item of table) {
            if (item.nodeType !== 1) continue; //not htmlelement
            const h = item as HTMLElement;

            const dname: any = h.querySelector('.name').childNodes[0];
            const dprice: any = h.querySelector('.price').childNodes[0];
            dishes.push(new Dish({
                name: dname.rawText,
                translatedname: await translate(dname.rawText),
                price: dprice.rawText
            }))
        }
        return dishes;
    }
}