import { Restaurant, Menu, Dish } from "./Restaurant";

const phantom = require('phantom');
const HTMLParser = require('node-html-parser');

export class BreakTimeBistro implements Restaurant {
    private readonly URL: string = "https://m.facebook.com/pg/breaktimebistro/menu/";

    getName(): string {
        return "Break Time Bistro (Внизу)"
    }

    async getMenuPicture(): Promise<string> {
        console.log("Loading menu for Break Time Bisto")

        const instance = await phantom.create();
        const page = await instance.createPage();
        const isjs = await page.setting("javascriptEnabled");
        const ua = await page.setting('userAgent');
        console.log("js enabled: " + isjs);
        console.log("user agent: " + ua);


        const status = await page.open(this.URL);
        console.log(`Status: ${status}`);
        const content = await page.property('content');
        //console.log(content);

        //const contentURL = HTMLParser.parse(content).querySelector('#root > div > div > ul > a + a + a + a');
        //console.warn(contentURL);
        //console.warn(contentURL? contentURL.href : "NO HREF PROPERY");

        let qs = await page.invokeMethod('evaluate', function() {
            return document.querySelector('#root > table > tbody > tr > td > ul > a + a + a + a');
        })

        console.log(qs);
        let url = await page.invokeMethod('evaluate', function() {
            var iqs = document.querySelector('#root > div > div > ul > a + a + a + a');
            console.log(iqs);
            return iqs.getAttribute("href");
        })
        console.log(url);
        await instance.exit();
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
