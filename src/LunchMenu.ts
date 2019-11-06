import { Restaurant, Menu } from "./Restaurants/Restaurant";
import { Kolkovna } from "./Restaurants/Kolkovna";
import { LaCasaTrattoria } from "./Restaurants/LaCasaTrattoria";


export class LunchMenu {
    restaurantName: string;
    today: Menu;

    public constructor(init?: Partial<LunchMenu>) {
        Object.assign(this, init);
    }

    toString() {
        return `Restaurant *${this.restaurantName}* \n${this.today ? this.today.toString() : "Меню отсутствует"}`
    }
}

export class MenuManager {

    async getMenus(): Promise<Array<LunchMenu>> {
        let places = this.getRestaurants();
        return Promise.all(places.map(
            async (place: Restaurant) => {
                return new LunchMenu({
                    restaurantName: place.getName(),
                    today: await place.getTodayMenu()
                });
            }
        ));
    }

    getRestaurants(): Array<Restaurant> {
        return [new Kolkovna(), new LaCasaTrattoria()];
    }
}