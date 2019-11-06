const fetch = require('node-fetch');
const HTMLParser = require('node-html-parser');

interface LunchMenu {
    restaurantName: string;
    day: string;
    dishes: Array<string>
}

interface Dish {
    name: string;
    translatedname: string;
    price: string;
}

export class MenuManager {

    async getMenus(): Promise<Array<LunchMenu | void>> {

        return [await this.kolkovna()];
    }

    async kolkovna(): Promise<LunchMenu | void> {
        return await fetch("https://www.kolkovna.cz/en/kolkovna-argentinska-23")
            .then((response: Response) => response.text())
            .then(text => {
                const root: HTMLElement = HTMLParser.parse(text);
                let date: any = root.querySelector('div.dailyMenuWeek h2.brown').childNodes[0];
                let table = root.querySelector('div.dailyMenuWeek table.menu.dailyMenu').childNodes;
                //console.log(table)

                let dishes: Array<Dish> = [];
                for (const item of table) {
                    if (item.nodeType !== 1) continue; //not htmlelement
                    let h = item as HTMLElement;
                    //console.log(h)

                    let dname: any = h.querySelector('.name').childNodes[0];
                    let dprice: any = h.querySelector('.price').childNodes[0];
                    dishes.push({
                        name: dname.rawText,
                        translatedname: dname.rawText,
                        price: dprice.rawText
                    })
                }
                return ({
                    restaurantName: "Kolkovna",
                    day: date.rawText,
                    dishes: dishes
                });
            });
    }
}