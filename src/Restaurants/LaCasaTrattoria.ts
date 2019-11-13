import { Dish, Menu, TranslatableRestaurant } from "./Restaurant";
import Translator from "../Translator/Translator";

const fetch = require('node-fetch');

export class LaCasaTrattoria implements TranslatableRestaurant {
	private readonly URL: string = "https://developers.zomato.com/api/v2.1/dailymenu?res_id=18722781";

	getName(): string {
		return "La Casa Trattoria (Итальянцы)"
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


/*

v{
        "R": {
          "has_menu_status": {
            "delivery": -1,
            "takeaway": -1
          },
          "res_id": 18722781
        },
        "id": "18722781",
        "name": "La Casa Trattoria",
        "url": "https://www.zomato.com/praha/la-casa-trattoria-1-holešovice-praha-7?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
        "location": {
          "address": "Tusarova 26, Holešovice, Praha 7, Praha",
          "locality": "Holešovice",
          "city": "Praha 7",
          "city_id": 84,
          "latitude": "50.1013610000",
          "longitude": "14.4482190000",
          "zipcode": "",
          "country_id": 54,
          "locality_verbose": "Holešovice, Praha 7"
        },
        "switch_to_order_menu": 0,
        "cuisines": "Italian",
        "timings": "11 AM to 11 PM (Mon-Sat), Sun Closed",
        "average_cost_for_two": 800,
        "price_range": 4,
        "currency": "Kč",
        "highlights": [
          "Takeaway Available",
          "Cash",
          "Serves Alcohol",
          "Dinner",
          "Lunch",
          "Credit Card",
          "Private Dining Area Available",
          "Lunch Menu",
          "Indoor Seating",
          "Fullbar"
        ],
        "offers": [],
        "opentable_support": 0,
        "is_zomato_book_res": 0,
        "mezzo_provider": "OTHER",
        "is_book_form_web_view": 0,
        "book_form_web_view_url": "",
        "book_again_url": "",
        "thumb": "https://b.zmtcdn.com/data/reviews_photos/31e/815b5bff48c2503ed20c04ab42bc031e_1534358712.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
        "user_rating": {
          "aggregate_rating": "3.3",
          "rating_text": "Average",
          "rating_color": "CDD614",
          "rating_obj": {
            "title": {
              "text": "3.3"
            },
            "bg_color": {
              "type": "lime",
              "tint": "500"
            }
          },
          "votes": "7"
        },



        /dailymenu

        {
  "daily_menus": [
    {
      "daily_menu": {
        "daily_menu_id": "20643066",
        "start_date": "2019-11-06 00:00:00",
        "end_date": "2019-11-06 23:59:59",
        "name": "",
        "dishes": [
          {
            "dish": {
              "dish_id": "698328427",
              "name": "Polévka z červené čočky s toskánskými uzeninami",
              "price": "39 Kč"
            }
          },
          {
            "dish": {
              "dish_id": "698328428",
              "name": "Zeleninový salát s fazolovými lusky a filetem pstruha na česnekovém másle",
              "price": "119 Kč"
            }
          },
          {
            "dish": {
              "dish_id": "698328429",
              "name": "Srnčí hřbet na risotto z lesních hub",
              "price": "129 Kč"
            }
          },
          {
            "dish": {
              "dish_id": "698328430",
              "name": "Filet sumce afrického na hráškovém pyré a salsou ze sušených rajčat",
              "price": "139 Kč"
            }
          }
        ]
      }
    }
  ],
  "status": "success"
}
*/