const createPhantomPool = require('phantom-pool')

export default class Phantom {
    private readonly URL: string;
    private static pool = Phantom.getPhantomPool()

    constructor(url: string) {
        this.URL = url;
    }

    executeSelector = async (selector: string): Promise<any> => {
        return await Phantom.pool.use(
            async (instance) => {
                const page = await instance.createPage();
                await page.setting('userAgent', "Mozilla/5.0 (Unknown; Linux x86_64) AppleWebKit/538.1 (KHTML, like Gecko) PhantomJS/2.1.1 Safari/538.1");
                const status = await page.open(this.URL);
                console.log(`[phantom] Page loading response status: ${status}`);

                const uiObj: string = await page.invokeMethod('evaluate', function (s) {
                    return document.querySelector(s);
                }, selector);
                console.log(`[phantom] Method was executeds`);
                return uiObj;
            }
        )
    };

    public static getPhantomPool() {
        return createPhantomPool({
            max: 5, // default
            min: 1, // default
            // how long a resource can stay idle in pool before being removed
            idleTimeoutMillis: 30000, // default.
            // maximum number of times an individual resource can be reused before being destroyed; set to 0 to disable
            maxUses: 50, // default
            // function to validate an instance prior to use; see https://github.com/coopernurse/node-pool#createpool
            validator: () => Promise.resolve(true), // defaults to always resolving true
            // validate resource before borrowing; required for `maxUses and `validator`
            testOnBorrow: true, // default
            // For all opts, see opts at https://github.com/coopernurse/node-pool#createpool
            phantomArgs: [['--disk-cache=true'], {
            }], // arguments passed to phantomjs-node directly, default is `[]`. For all opts, see https://github.com/amir20/phantomjs-node#phantom-object-api
        })
    }
}