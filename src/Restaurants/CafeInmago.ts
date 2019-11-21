import { Restaurant, Menu } from "./Restaurant";
const fetch = require('node-fetch');
const HTMLParser = require('node-html-parser');

export class CafeInmago implements Restaurant {
    private readonly URL: string = "https://cafeinmago.webnode.cz/";

    getName(): string {
        return "Cafe Inmago (Итальянец)"
    }

    async getMenuPicture(): Promise<string> {
        console.log("Loading menu for cafe Inmago");

        const rawHtml = await this.loadMenu();
        return await this.parse(rawHtml);
    }

    async parse(text: string): Promise<any> {
        const root: HTMLElement = HTMLParser.parse(text);
        let dateBlock: any = root.querySelector('a.litebox');
        return dateBlock.rawAttrs.split("\"")[3];
    }

    async loadMenu(): Promise<string> {
        return fetch(this.URL)
            .then((response: Response) => {
                if (response.status !== 200) {
                    console.error(`[inmago] non successfull response: ${response.body}`)
                }
                return response.text();
            });
    }

    async getTodayMenu(): Promise<Menu> {
        return null;
    }
}
