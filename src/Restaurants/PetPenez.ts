import {Dish, Menu, TranslatableRestaurant} from "./Restaurant";
import Translator from "../Translator/Translator";

const fetch = require('node-fetch');

export class PetPenez implements TranslatableRestaurant {
    private readonly URL: string = "https://developers.zomato.com/api/v2.1/dailymenu?res_id=16506974";

	getName(): string {
		return "Pět peněz"
	}

	getMenuPicture(): Promise<string> {
		return null;
	}

	async getTodayMenu(): Promise<Menu> {
		const menu = await this.loadMenu();
		return await this.parseMenu(menu, async (a) => a);
	}

	async getTranslatedMenu(translator: Translator): Promise<Menu> {
		const menu = await this.loadMenu();
		return await this.parseMenu(menu, async (text) => await translator.translate(text));
	}

	async loadMenu() {
		return fetch(this.URL, {
			headers: {
				"user_key": this.getZomatoKey()
			}
		})
			.then((response: Response) => response.json())
			.then(json => {
				return this.isMenuPresent(json) ? json.daily_menus : null;
			});
	}

	isMenuPresent(rawJson):boolean{
		return Boolean(rawJson.daily_menus[0]);
	}

	async parseMenu(dailymenus, translate: (o: string) => Promise<string>): Promise<Menu> {
		if(!dailymenus) return null;

		let menu = dailymenus[0].daily_menu;
		let date = menu.start_date;
		let dishes: Promise<Array<Dish>> = Promise.all(menu.dishes.map(async (item) => {
			return new Dish({
				name: item.dish.name,
				translatedname: await translate(item.dish.name),
				price: item.dish.price
			})
		}));
		return new Menu({
			date: date,
			dishes: await dishes
		});
	}

	private getZomatoKey() {
		return process.env.ZOMATO_TOKEN ? process.env.ZOMATO_TOKEN : process.argv[3]
	}
}