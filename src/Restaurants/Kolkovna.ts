import { Restaurant, Menu, Dish } from "./Restaurant";
const fetch = require('node-fetch');
const HTMLParser = require('node-html-parser');

export class Kolkovna implements Restaurant {
    private readonly URL: string = "https://www.kolkovna.cz/en/kolkovna-argentinska-23";

    getName(): string {
        return "Kolkovna Argentinska"
    }

    getMenuPicture(): Promise<string> {
        return null;
    }

    async getTodayMenu(): Promise<Menu> {
        const rawHtml = await this.loadMenu();
        return this.parse(rawHtml);
    }

    async loadMenu(): Promise<string> {
        return await fetch(this.URL)
            .then((response: Response) => {
                if (response.status !== 200) {
                    console.error(`[kolkovna] non successfull response: ${response.body}`)
                }
                return response.text();
            })
            .catch(error => console.warn(error));
    }

    parse(text: string): Menu {
        const root: HTMLElement = HTMLParser.parse(text);
        let date: string = this.ejectDate(root);
        let dishes: Array<Dish> = this.ejectDishes(root);
        if (date && dishes) {
            return new Menu({
                date: date,
                dishes: dishes
            });
        }
        return null;
    }

    private ejectDate(block: HTMLElement): string {
        let dateBlock: any = block.querySelector('div.dailyMenuWeek h2.brown')
        let date: string = dateBlock ? dateBlock.childNodes[0].rawText : null;
        return date;
    }

    private ejectDishes(block: HTMLElement): Array<Dish> {
        const tableBlock = block.querySelector('div.dailyMenuWeek table.menu.dailyMenu');
        if (!tableBlock) return null;

        const table = tableBlock.childNodes;
        let dishes: Array<Dish> = [];
        for (const item of table) {
            if (item.nodeType !== 1) continue; //not htmlelement
            let h = item as HTMLElement;

            let dname: any = h.querySelector('.name').childNodes[0];
            let dprice: any = h.querySelector('.price').childNodes[0];
            dishes.push(new Dish({
                name: dname.rawText,
                translatedname: dname.rawText,
                price: dprice.rawText
            }))
        }
        return dishes;
    }
}