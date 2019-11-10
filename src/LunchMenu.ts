import { Restaurant, Menu } from "./Restaurants/Restaurant";
import { Kolkovna } from "./Restaurants/Kolkovna";
import { LaCasaTrattoria } from "./Restaurants/LaCasaTrattoria";
import { BreakTimeBistro } from "./Restaurants/BreakTimeBistro";


export class LunchMenu {
    restaurantName: string;
    today: Menu;
    pictureLink: string;

    public constructor(init?: Partial<LunchMenu>) {
        Object.assign(this, init);
    }

    toString() {
        if(this.pictureLink){
            return `Restaurant *${this.restaurantName}*`
        }
        return `Restaurant *${this.restaurantName}* \n${this.today ? this.today.toString() : "Empty menu"}`
    }
}

export class MenuManager {

    async getMenus(): Promise<Array<LunchMenu>> {
        let places = this.getRestaurants();
        return Promise.all(places.map(
            async (place: Restaurant) => {
                return new LunchMenu({
                    restaurantName: place.getName(),
                    today: await place.getTodayMenu(),
                    pictureLink: await place.getMenuPicture()
                });
            }
        ));
    }

    getRestaurants(): Array<Restaurant> {
        return [new Kolkovna(), new LaCasaTrattoria(), new BreakTimeBistro()];
    }
}