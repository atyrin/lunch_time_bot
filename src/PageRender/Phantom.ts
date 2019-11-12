const phantom = require('phantom');

export default class Phantom {
    private readonly URL: string;
    private instance;
    private page;

    constructor(url: string) {
        this.URL = url;
    }

    open = async () => {
        this.instance = await phantom.create();
        this.page = await this.createPhantomPage();
        const status = await this.page.open(this.URL);
        console.log(`[phantom] Page loading response status: ${status}`);
    }

    close = async () => {
        if(this.instance) this.instance.exit();
    }

    executeSelector = async (selector: string): Promise<any> => {
        try {
            await this.open();
            const uiObj: string = await this.page.invokeMethod('evaluate', function (s) {
                return document.querySelector(s);
            }, selector)
            console.log(`[phantom] Ejected Object: ${uiObj}`);
            return uiObj;
        }
        finally {
            await this.close();
        }
    }

    private async createPhantomPage() {
        const page = await this.instance.createPage();
        await page.setting('userAgent', "Mozilla/5.0 (Unknown; Linux x86_64) AppleWebKit/538.1 (KHTML, like Gecko) PhantomJS/2.1.1 Safari/538.1");
        return page;
    }
}