import { LaCasaTrattoria } from '../../src/Restaurants/LaCasaTrattoria'
import { Menu } from '../../src/Restaurants/Restaurant';

require('dotenv').config();

describe('check la casa trattoria', () => {
	test('parse trattoria menu', async () => {
        let trattoria = new LaCasaTrattoria();
		let menu: Menu = await trattoria.parseMenu(REGULAR_JSON_MENU.daily_menus, async (a)=>a);

		expect(menu.date).toBe("2019-11-06 00:00:00");

		expect(menu.dishes[0].name).toBe("Polévka z červené čočky s toskánskými uzeninami");
		expect(menu.dishes[0].price).toBe("39 Kč");

		expect(menu.dishes[3].name).toBe("Filet sumce afrického na hráškovém pyré a salsou ze sušených rajčat");
		expect(menu.dishes[3].price).toBe("139 Kč");
    });

    test('parse trattoria regular menu present', () => {
		let trattoria = new LaCasaTrattoria();
		let isMenuPresent: boolean = trattoria.isMenuPresent(REGULAR_JSON_MENU);

		expect(isMenuPresent).toBe(true);
    });
    
    test('parse trattoria weekend menu', () => {
		let trattoria = new LaCasaTrattoria();
		let isMenuPresent: boolean = trattoria.isMenuPresent(WEEKEND_JSON_MENU);

		expect(isMenuPresent).toBe(false);
    });
    
    test('parse trattoria null menu', async () => {
		let trattoria = new LaCasaTrattoria();
		let menu: Menu = await trattoria.parseMenu(null, async (a)=>a);

		expect(menu).toBeNull();
	});
});

const REGULAR_JSON_MENU = {
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


  const WEEKEND_JSON_MENU = {
    "daily_menus": [
    ],
    "status": "success"
  }