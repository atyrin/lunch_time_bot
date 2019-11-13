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
    private readonly PLACES: Array<Restaurant> = [new Kolkovna(), new LaCasaTrattoria(), new BreakTimeBistro()];

    async getMenus(): Promise<Array<LunchMenu>> {
        return await Promise.all(this.PLACES.map(
            async (place: Restaurant) => await this.getMenu(place)
        ))
    }

    async getTranslatedMenu(place: TranslatableRestaurant): Promise<LunchMenu> {
        if (!place) throw "Unsuppotred restaurant for translation";

        const tranlator = new YandexTranslator();
        return new LunchMenu({
            restaurantName: place.getName(),
            today: await place.getTranslatedMenu(tranlator),
            pictureLink: await place.getMenuPicture()
        });
    }

    async getMenu(place: Restaurant): Promise<LunchMenu> {
        if (!place) throw "Unsupported restaurant";

        return new LunchMenu({
            restaurantName: place.getName(),
            today: await place.getTodayMenu(),
            pictureLink: await place.getMenuPicture()
        });
    }

    getRestaurantInstance(text: string): TranslatableRestaurant {
        if (text.includes("Kolkovna")) return new Kolkovna();
        if (text.includes("Trattoria")) return new LaCasaTrattoria();
        return null;
    }
}