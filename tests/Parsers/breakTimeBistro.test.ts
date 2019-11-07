
import { Menu } from "../../src/Restaurants/Restaurant";
import { BreakTimeBistro } from "../../src/Restaurants/BreakTimeBistro";


test('get break time bistro menu', async () => {
  jest.setTimeout(30000);
    let kolkovna = new BreakTimeBistro()
	let menu:Menu = await kolkovna.getTodayMenu()
  });