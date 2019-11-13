import YandexTranslator from '../../src/Translator/YandexTranslator';
require('dotenv').config()

describe('check translator module', () => {

    beforeEach(() => {
      
    });
  
    test('translate simple string', async () => {
      const defaultText = "Jak se máš?";

      const translator = new YandexTranslator();
      const translatedText = await translator.translate(defaultText);

      expect(translatedText[0]).toBe("Как у тебя дела?");
    });
  });