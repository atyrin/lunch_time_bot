# Installation
1. clone source code
2. download the latest NODE.JS framework
3. install dependencies: `npm install`
4. start bot with: `npm start`

## Tokens
There are 2 ways to pass secret tokens to the app:
1. Through npm params:  
    `npm start "bot_token" "zomato_token" "translator_token"`

2. Create an .env file in the root directory.  
  ```config
  YANDEX_TOKEN="trnsl.1.1.sdfdsfb58.3e987248"
  ZOMATO_TOKEN=cc12312321323133344543c7
  BOT_TOKEN=333333:AAGSWJFDLKJII46_F0sPs
  ```  

Zomato token you can get here: https://developers.zomato.com/api  
Bot token is producing by Telegram Bot Father.  
Yandex Translator token you can generate here: https://translate.yandex.com/developers/keys


# Test Run
`npm test`

# Heroku Deploy
1. Create a dyno with nodejs
2. Put the token variables in settings
3. Deploy from a git repo