import { CommonZomatoRestaurant } from "./CommonZomatoRestaurant";

export class PetPenez extends CommonZomatoRestaurant {

    constructor(){
        super(16506974);
    }

	getName(): string {
		return "Pět peněz"
	}
}