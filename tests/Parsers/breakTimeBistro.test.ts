
import { Menu } from "../../src/Restaurants/Restaurant";
import { BreakTimeBistro } from "../../src/Restaurants/BreakTimeBistro";


test('get break time bistro menu', async () => {
  jest.setTimeout(30000);
  console.log("start test");
    let kolkovna = new BreakTimeBistro()
  let menu:string = await kolkovna.getMenuPicture()
  console.log(menu);
  });