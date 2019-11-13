import { Restaurant, TranslatableRestaurant, Menu } from "./Restaurants/Restaurant";
import { Kolkovna } from "./Restaurants/Kolkovna";
import { LaCasaTrattoria } from "./Restaurants/LaCasaTrattoria";
import { BreakTimeBistro } from "./Restaurants/BreakTimeBistro";
import YandexTranslator from "./Translator/YandexTranslator";


export class LunchMenu {
    restaurantName: string;
    today: Menu;
    pictureLink: string;

    public constructor(init?: Partial<LunchMenu>) {
        Object.assign(this, init);
    }

    toString() {
        if (this.pictureLink) {
            return `Restaurant *${this.restaurantName}*`
        }
        return `📍 *${this.restaurantName}* \n ${this.today ? this.today.toString() : "Empty menu"}`
    }

    toTranslatedString() {
        return `📍 *${this.restaurantName}* \n ${this.today ? this.today.toTranslatedString() : "Меню недоступно"} \n\nПереведено сервисом «[Яндекс.Переводчик](http://translate.yandex.ru/)»`
    }
}

export class MenuManager {

    async getMenus(): Promise<Array<LunchMenu>> {
        let places = this.getRestaurants();
        return await Promise.all(places.map(
            async (place: Restaurant) => {
                return new LunchMenu({
                    restaurantName: place.getName(),
                    today: await place.getTodayMenu(),
                    pictureLink: await place.getMenuPicture()
                });
            }
        ))
    }

    private getRestaurants(): Array<Restaurant> {
        return [new Kolkovna(), new LaCasaTrattoria(), new BreakTimeBistro()];
    }

    async getTranslatedMenu(place:TranslatableRestaurant):Promise<LunchMenu>{
        if(!place) throw "Unsuppotred restaurant for translation";

        const tranlator = new YandexTranslator();
        return new LunchMenu({
            restaurantName: place.getName(),
            today: await place.getTranslatedMenu(tranlator),
            pictureLink: await place.getMenuPicture()
        });
    }

    async getMenu(place:Restaurant):Promise<LunchMenu>{
        if(!place) throw "Unsuppotred restaurant";

        return new LunchMenu({
            restaurantName: place.getName(),
            today: await place.getTodayMenu(),
            pictureLink: await place.getMenuPicture()
        });
    }

    getRestaurantInstance(text:string):TranslatableRestaurant{
        if(text.includes("Kolkovna")) return new Kolkovna();
        if(text.includes("Trattoria")) return new LaCasaTrattoria();
        return null;
    }
}