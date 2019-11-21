
import { CafeInmago } from "../../src/Restaurants/CafeInmago";

test('get inmago  menu', async () => {
    jest.setTimeout(30000);
    console.log("start test");
      let bistro = new CafeInmago()
      let menuLink:any = await bistro.getMenuPicture()

      console.log(menuLink.split("\"")[3]);
    });


/*

HTMLElement {
         childNodes: [ [Object], [Circular], [Object], [Object], [Object], [Object] ],
         tagName: 'a',
         rawAttrs: 'class="litebox" href="https://cafeinmago.webnode.cz/_files/200000100-338c7338c9/Nabídka dne 22112019-page-001.jpg" width="1240" height="1754" title=""',
      */