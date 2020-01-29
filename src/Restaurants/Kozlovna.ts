import { CommonZomatoRestaurant } from "./CommonZomatoRestaurant";

export class Kozlovna extends CommonZomatoRestaurant {
  
	constructor(){
		super(16506954);
	}

	getName(): string {
		return "Holešovická Kozlovna"
	}
}

/*

"restaurant": {
        "R": {
          "has_menu_status": {
            "delivery": -1,
            "takeaway": -1
          },
          "res_id": 16506954
        },
        "apikey": "",
        "id": "16506954",
        "name": "Holešovická Kozlovna",
        "url": "https://www.zomato.com/praha/holešovická-kozlovna-holešovice-praha-7?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
        "location": {
          "address": "Dělnická 28, Holešovice, Praha 7",
          "locality": "Holešovice",
          "city": "Praha 7",
          "city_id": 84,
          "latitude": "50.1030554531",
          "longitude": "14.4487360865",
          "zipcode": "",
          "country_id": 54,
          "locality_verbose": "Holešovice, Praha 7"
        },
        "switch_to_order_menu": 0,
        "cuisines": "Czech",
        "timings": "11:00 to 23:00 (Mon-Fri),11:30 to 23:00 (Sat-Sun)",
        "average_cost_for_two": 620,
        "price_range": 3,
        "currency": "Kč",
        "highlights": [
          "Cash",
          "Lunch",
          "Credit Card",
          "Takeaway Available",
          "Dinner",
          "Garden",
          "Indoor Seating",
          "Disabled Friendly",
          "Fullbar",
          "Sodexo",
          "Ticket Restaurant",
          "Kid Friendly",
          "Private Dining Area Available",
          "Wifi",
          "Lunch Menu",
          "Tank Beer",
          "Cheque Dejeuner"
        ],
        "offers": [],
        "opentable_support": 0,
        "is_zomato_book_res": 0,
        "mezzo_provider": "OTHER",
        "is_book_form_web_view": 0,
        "book_form_web_view_url": "",
        "book_again_url": "",
        "thumb": "https://b.zmtcdn.com/data/res_imagery/16506954_RESTAURANT_b67278bf51b7126e347049abe9daf156.jpeg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
        "user_rating": {
          "aggregate_rating": "3.8",
          "rating_text": "Good",
          "rating_color": "9ACD32",
          "rating_obj": {
            "title": {
              "text": "3.8"
            },
            "bg_color": {
              "type": "lime",
              "tint": "600"
            }
          },
          "votes": "53"
        },
        "all_reviews_count": 33,
        "photos_url": "https://www.zomato.com/praha/holešovická-kozlovna-holešovice-praha-7/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
        "photo_count": 93,
        "photos": [
          {
            "photo": {
              "id": "u_zk1MjgzODE3Mjc",
              "url": "https://b.zmtcdn.com/data/reviews_photos/821/3a6c413e01afb21523b4d8d4d89ef821_1508141370.jpg",
              "thumb_url": "https://b.zmtcdn.com/data/reviews_photos/821/3a6c413e01afb21523b4d8d4d89ef821_1508141370.jpg?impolicy=newcropandfit&cropw=3024&croph=3024&cropoffsetx=0&cropoffsety=0&cropgravity=NorthWest&fitw=200&fith=200&fittype=ignore",
              "user": {
                "name": "Nokianen",
                "zomato_handle": "nokianen",
                "foodie_level": "Connoisseur",
                "foodie_level_num": 13,
                "foodie_color": "e95151",
                "profile_url": "https://www.zomato.com/nokianen?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "profile_image": "https://b.zmtcdn.com/data/user_profile_pictures/c78/d639cc6bf3da6016f8ca9fc784e47c78.jpg?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A",
                "profile_deeplink": "zomato://u/31515185"
              },
              "res_id": 16506954,
              "caption": "",
              "timestamp": 1508141371,
              "friendly_time": "Oct 16, 2017",
              "width": 3024,
              "height": 3024
            }
          },
          {
            "photo": {
              "id": "u_NzYyMTM3MjU5ND",
              "url": "https://b.zmtcdn.com/data/reviews_photos/58b/8dff97b536489aac284507e9a8ffe58b_1506368362.jpg",
              "thumb_url": "https://b.zmtcdn.com/data/reviews_photos/58b/8dff97b536489aac284507e9a8ffe58b_1506368362.jpg?impolicy=newcropandfit&cropw=3024&croph=3024&cropoffsetx=0&cropoffsety=0&cropgravity=NorthWest&fitw=200&fith=200&fittype=ignore",
              "user": {
                "name": "Nokianen",
                "zomato_handle": "nokianen",
                "foodie_level": "Connoisseur",
                "foodie_level_num": 13,
                "foodie_color": "e95151",
                "profile_url": "https://www.zomato.com/nokianen?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "profile_image": "https://b.zmtcdn.com/data/user_profile_pictures/c78/d639cc6bf3da6016f8ca9fc784e47c78.jpg?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A",
                "profile_deeplink": "zomato://u/31515185"
              },
              "res_id": 16506954,
              "caption": "",
              "timestamp": 1506368363,
              "friendly_time": "Sep 26, 2017",
              "width": 3024,
              "height": 3024
            }
          },
          {
            "photo": {
              "id": "u_MDM4NDgyNDIxMj",
              "url": "https://b.zmtcdn.com/data/reviews_photos/0c1/aaf497aded0b4d45086c50a1069580c1_1517126861.jpg",
              "thumb_url": "https://b.zmtcdn.com/data/reviews_photos/0c1/aaf497aded0b4d45086c50a1069580c1_1517126861.jpg?impolicy=newcropandfit&cropw=3024&croph=3024&cropoffsetx=0&cropoffsety=0&cropgravity=NorthWest&fitw=200&fith=200&fittype=ignore",
              "user": {
                "name": "Nokianen",
                "zomato_handle": "nokianen",
                "foodie_level": "Connoisseur",
                "foodie_level_num": 13,
                "foodie_color": "e95151",
                "profile_url": "https://www.zomato.com/nokianen?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                "profile_image": "https://b.zmtcdn.com/data/user_profile_pictures/c78/d639cc6bf3da6016f8ca9fc784e47c78.jpg?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A",
                "profile_deeplink": "zomato://u/31515185"
              },
              "res_id": 16506954,
              "caption": "",
              "timestamp": 1517126862,
              "friendly_time": "Jan 28, 2018",
              "width": 3024,
              "height": 3024
            }
          },
*/