import { Restaurant, Menu, Dish } from "./Restaurant";

const phantom = require('phantom');

export class BreakTimeBistro implements Restaurant {
    private readonly URL: string = "https://m.facebook.com/pg/breaktimebistro/menu/";

    getName(): string {
        return "Break Time Bistro (Внизу)"
    }

    async getMenuPicture(): Promise<string> {
        console.log("Loading menu for Break Time Bisto")

        const instance = await phantom.create();
        const page = await instance.createPage();

        await page.open(this.URL);

        let qs = await page.invokeMethod('evaluate', function() {
            return document.querySelector('#root > div > div > ul > a + a + a + a');
        })
        console.log(qs);
        let url = await page.invokeMethod('evaluate', function() {
            var iqs = document.querySelector('#root > div > div > ul > a + a + a + a');
            console.log(iqs);
            return iqs.getAttribute("href");
        })
        console.log(url);
        console.log("Break Time Bisto done")
        return url;
    }

    async getTodayMenu(): Promise<Menu> {        
        return null;
    }

    async getWeekMenu(): Promise<Array<Menu>> {
        return [await this.getTodayMenu()];
    }
}
