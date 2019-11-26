import { PetPenez } from "../../src/Restaurants/PetPenez";
import { Menu } from "../../src/Restaurants/Restaurant";
require('dotenv').config();


describe('check pet penez', () => {
	test('parse pet penez', async () => {
        let petPenez = new PetPenez();
		let menu: Menu = await petPenez.parseMenu(REGULAR_JSON_MENU.daily_menus, async (a)=>a);

		expect(menu.date).toBe("2019-11-26 00:00:00");

		expect(menu.dishes[0].name).toBe("Minestrone");
		expect(menu.dishes[0].price).toBe("35 Kč");

		expect(menu.dishes[3].name).toBe("Smažený květák , vařené brambory sypané pažitkou, domácí tatarka");
		expect(menu.dishes[3].price).toBe("130 Kč");
    });

    test('parse pet penez regular menu present', () => {
		let petPenez = new PetPenez();
		let isMenuPresent: boolean = petPenez.isMenuPresent(REGULAR_JSON_MENU);

		expect(isMenuPresent).toBe(true);
    });
    
    test('parse pet penez weekend menu', () => {
		let petPenez = new PetPenez();
		let isMenuPresent: boolean = petPenez.isMenuPresent(WEEKEND_JSON_MENU);

		expect(isMenuPresent).toBe(false);
    });
    
    test('parse pet penez null menu', async () => {
		let petPenez = new PetPenez();
		let menu: Menu = await petPenez.parseMenu(null, async (a)=>a);

		expect(menu).toBeNull();
	});
});


const REGULAR_JSON_MENU = {
    "daily_menus": [
      {
        "daily_menu": {
          "daily_menu_id": "20692000",
          "start_date": "2019-11-26 00:00:00",
          "end_date": "2019-11-26 23:59:59",
          "name": "",
          "dishes": [
            {
              "dish": {
                "dish_id": "699220204",
                "name": "Minestrone",
                "price": "35 Kč"
              }
            },
            {
              "dish": {
                "dish_id": "699220205",
                "name": "Marinované kuřecí prsíčko s pikantními fazolemi a restovanou chorizo klobásou, bramborové resty",
                "price": "130 Kč"
              }
            },
            {
              "dish": {
                "dish_id": "699220206",
                "name": "Casaroccia s kuřecím masem, brokolicí a smetanou, sypané parmazánem",
                "price": "132 Kč"
              }
            },
            {
              "dish": {
                "dish_id": "699220207",
                "name": "Smažený květák , vařené brambory sypané pažitkou, domácí tatarka",
                "price": "130 Kč"
              }
            },
            {
              "dish": {
                "dish_id": "699220208",
                "name": "Flank steak 180gr se jemnou pepřovou omáčkou a pečené brambory grenaille, zdobené polníčkem",
                "price": "144 Kč"
              }
            },
            {
              "dish": {
                "dish_id": "699220209",
                "name": "Velký zeleninový salát s filírovaným kuřecím prsíčkem, česnekový dresink, opečená tortilla",
                "price": "138 Kč"
              }
            },
            {
              "dish": {
                "dish_id": "699220210",
                "name": "Domácí limonáda z rakytníku",
                "price": "45 Kč"
              }
            },
            {
              "dish": {
                "dish_id": "699220211",
                "name": "Domácí limonády - malinová , okurková, bezinková, citronáda, zázvorová, levandulová",
                "price": "40 Kč"
              }
            },
            {
              "dish": {
                "dish_id": "699220212",
                "name": "Nealkoholický vinný nápoj 0,3l",
                "price": "24 Kč"
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