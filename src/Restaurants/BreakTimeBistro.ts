import { Restaurant, Menu, Dish } from "./Restaurant";
const phantom = require('phantom');


export class BreakTimeBistro implements Restaurant {
    private readonly URL: string = "https://m.facebook.com/pg/breaktimebistro/menu/";

    getName(): string {
        return "Break Time Bistro (Внизу)"
    }

    async getMenuPicture(): Promise<string> {
        console.log("Loading menu for Break Time Bisto")

        const menuUrl = await this.renderFbPageAndEjectUrl();

        console.log("Break Time Bisto done")
        return menuUrl;
    }

    async getTodayMenu(): Promise<Menu> {
        return null;
    }

    async getWeekMenu(): Promise<Array<Menu>> {
        return [await this.getTodayMenu()];
    }

    private async createPhantomPage(instance) {
        const page = await instance.createPage();
        await page.setting('userAgent', "Mozilla/5.0 (Unknown; Linux x86_64) AppleWebKit/538.1 (KHTML, like Gecko) PhantomJS/2.1.1 Safari/538.1");
        return page;
    }

    private async renderFbPageAndEjectUrl(): Promise<string> {
        const instance = await phantom.create();
        try {
            const page = await this.createPhantomPage(instance);
            const status = await page.open(this.URL);
            console.log(`Page loading response status: ${status}`);

            const menuUrl: string = await page.invokeMethod('evaluate', function () {
                return document.querySelector('#root > table > tbody > tr > td > ul > a + a + a + a').getAttribute("href");
            })
            console.log(`Ejected URL: ${menuUrl}`);
            return menuUrl;
        }
        finally {
            await instance.exit();
        }
    }
}
