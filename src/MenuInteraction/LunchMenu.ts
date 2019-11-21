import { Menu } from "../Restaurants/Restaurant";


export class LunchMenuMessage {
    restaurantName: string;
    today: Menu;
    pictureLink: string;

    public constructor(init?: Partial<LunchMenuMessage>) {
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