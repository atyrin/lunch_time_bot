export class Dish {
    name: string;
    translatedname: string;
    price: string;

    public constructor(init?:Partial<Dish>) {
        Object.assign(this, init);
    }

    public toString = (): string => {
        return `${this.name} –– ${this.price}`;
    }
}

export class Menu {
    date: string;
    dishes: Array<Dish>

    public constructor(init?:Partial<Menu>) {
        Object.assign(this, init);
    }

    public toString(): string {
        return `Menu for ${this.date} \n ${this.dishes.map(dish => `\n– ${dish.toString()}`)}`;
    }
}

export interface Restaurant {
    getName(): string;
    getTodayMenu(): Promise<Menu>
    getWeekMenu(): Promise<Array<Menu>>
}