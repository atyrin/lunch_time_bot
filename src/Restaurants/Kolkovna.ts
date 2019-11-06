import { Restaurant, Menu, Dish } from "./Restaurant";
const fetch = require('node-fetch');
const HTMLParser = require('node-html-parser');

export class Kolkovna implements Restaurant {
    private readonly URL: string = "https://www.kolkovna.cz/en/kolkovna-argentinska-23";

    getName(): string {
        return "Kolkovna Argentinska"
    }

    async getTodayMenu(): Promise<Menu> {
        return await fetch(this.URL)
            .then((response: Response) => response.text())
            .then(text => {
                const root: HTMLElement = HTMLParser.parse(text);
                let date: any = root.querySelector('div.dailyMenuWeek h2.brown').childNodes[0];
                let table = root.querySelector('div.dailyMenuWeek table.menu.dailyMenu').childNodes;

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
                return new Menu({
                    date: date.rawText,
                    dishes: dishes
                });
            });
    }

    async getWeekMenu(): Promise<Array<Menu>> {
        return [await this.getTodayMenu()];
    }
}