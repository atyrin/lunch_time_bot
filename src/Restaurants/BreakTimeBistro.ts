import { Restaurant, Menu } from "./Restaurant";
import Phantom from "../PageRender/Phantom";

export class BreakTimeBistro implements Restaurant {
    private readonly URL: string = "https://m.facebook.com/pg/breaktimebistro/menu/";

    getName(): string {
        return "Break Time Bistro"
    }

    async getMenuPicture(): Promise<string> {
        console.log("Loading menu for Break Time Bisto");

        const ph = new Phantom(this.URL);
        const menu = await ph.executeSelector('#root > table > tbody > tr > td > ul > a + a + a + a');
        const menuUrl = menu.href;

        console.log("Break Time Bisto done");
        return menuUrl;
    }

    async getTodayMenu(): Promise<Menu> {
        return null;
    }
}
