const fetch = require('node-fetch');

export class YandexTranslator {
    private readonly BASE_URL: string = "https://translate.yandex.net/api/v1.5/tr.json/translate?lang=cs-ru";
    private _token: string;


    constructor(token: string = null) {
        this._token = token ? token : this.getApiTokenFromEnv();
    }

    private getApiTokenFromEnv(): string {
        this._token = process.env.YANDEX_TOKEN ? process.env.YANDEX_TOKEN: process.argv[4]
        return this._token
    }

    async translate(text: string): Promise<string> {
        console.log("Token: " + this._token);
        return await fetch(this.BASE_URL + `&key=${this._token}`, {
            method: 'POST',
            body: `text=${text}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
            .then(response => response.json())
            .then(json => {
                if (json.code !== 200) {
                    console.error(json.message);
                }
                return json.text
            });
    }

}