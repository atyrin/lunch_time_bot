import { Restaurant, TranslatableRestaurant } from "../Restaurants/Restaurant";
import { Kolkovna } from "../Restaurants/Kolkovna";
import { LaCasaTrattoria } from "../Restaurants/LaCasaTrattoria";
import { BreakTimeBistro } from "../Restaurants/BreakTimeBistro";
import YandexTranslator from "../Translator/YandexTranslator";
import { LunchMenuMessage } from "./LunchMenu";
import { CafeInmago } from "../Restaurants/CafeInmago";
import { PetPenez } from "../Restaurants/PetPenez";


export class MenuManager {
    private TOP_PLACES: Array<AvailablePlaces> = [AvailablePlaces.Kolkovna, AvailablePlaces.LaCasaTrattoria, AvailablePlaces.PetPenez];

    async getMenus(): Promise<Array<LunchMenuMessage>> {
        return Promise.all(this.TOP_PLACES.map(
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
        if (text.includes("peněz")) return new PetPenez();
        return null;
    }
}


export enum AvailablePlaces{
    Kolkovna,
    LaCasaTrattoria,
    BreakTimeBistro,
    CafeInmago,
    PetPenez
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
            case AvailablePlaces.PetPenez: { 
                return new PetPenez();
            } 
            default: { 
                console.log(`Unknown restaurant name: ${restaurantName}`)
                return null; 
            } 
         }
      }
}