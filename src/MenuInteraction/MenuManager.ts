import { Restaurant, TranslatableRestaurant } from "../Restaurants/Restaurant";
import { Kolkovna } from "../Restaurants/Kolkovna";
import { LaCasaTrattoria } from "../Restaurants/LaCasaTrattoria";
import { BreakTimeBistro } from "../Restaurants/BreakTimeBistro";
import YandexTranslator from "../Translator/YandexTranslator";
import { LunchMenuMessage } from "./LunchMenu";
import { CafeInmago } from "../Restaurants/CafeInmago";


export class MenuManager {

    async getMenus(): Promise<Array<LunchMenuMessage>> {
        const size = Object.keys(AvailablePlaces).length / 2;
        return Promise.all([...Array(size).keys()].map(
            async (place:number) => await this.getMenu(Places.get(place))
        ))
    }

    async getTranslatedMenu(place: TranslatableRestaurant): Promise<LunchMenuMessage> {
        if (!place) throw "Unsuppotred restaurant for translation";

        const tranlator = new YandexTranslator();
        return new LunchMenuMessage({
            restaurantName: place.getName(),
            today: await place.getTranslatedMenu(tranlator),
            pictureLink: await place.getMenuPicture()
        });
    }

    async getMenu(place: Restaurant): Promise<LunchMenuMessage> {
        if (!place) throw "Unsupported restaurant";

        return new LunchMenuMessage({
            restaurantName: place.getName(),
            today: await place.getTodayMenu(),
            pictureLink: await place.getMenuPicture()
        });
    }

    getTranslatableRestaurant(text: string): TranslatableRestaurant {
        if (text.includes("Kolkovna")) return new Kolkovna();
        if (text.includes("Trattoria")) return new LaCasaTrattoria();
        return null;
    }
}


export enum AvailablePlaces{
    Kolkovna,
    LaCasaTrattoria,
    BreakTimeBistro,
    CafeInmago
}


export class Places{
    static get(restaurantName: AvailablePlaces): Restaurant {
        switch(restaurantName) { 
            case AvailablePlaces.Kolkovna: { 
               return new Kolkovna();
            } 
            case AvailablePlaces.LaCasaTrattoria: { 
               return new LaCasaTrattoria();
            }
            case AvailablePlaces.BreakTimeBistro: { 
                return new BreakTimeBistro();
            } 
            case AvailablePlaces.CafeInmago: { 
                return new CafeInmago();
            } 
            default: { 
                console.log(`Unknown restaurant name: ${restaurantName}`)
                return null; 
            } 
         }
      }
}