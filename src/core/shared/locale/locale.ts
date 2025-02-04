import { LocaleFormat } from '../interfaces/localeFormat';
import en from './languages/en'; // Importing the English Locale
import de from './languages/de'; // Importing the German Locale
export const placeholder = `_%_`;

let defaultLanguage = 'de'; // Change to 'de' to set the default language to German

/**
 * All locales have a base language in ISO-639-1.
 * Example for English is: 'en'.
 *
 * Variables are replaced in their respective orders.
 * Variable placeholders are written with: _%_
 *
 * This file cannot be injected into during runtime.
 * Locales must be written and present at the time of bootup.
 *
 * `setLanguage` function must be used on `client-side` in order to change the language.
 */

const locales: LocaleFormat = {
    en,
    de,
    // Additional languages can be added here...
};

export class LocaleController {
    /**
     * The ISO-639-1 Code to Utilize for Language
     * @static
     * @param {string} [iso639='de']
     *
     */
    static setLanguage(iso639: string = 'de') {
        defaultLanguage = iso639;
    }

    /**
     * Get a locale based on its key value.
     * @static
     * @param {string} key
     * @param {...any[]} args
     * @return {string}
     *
     */
    static get(key: string, ...args: any[]): string {
        if (!locales[defaultLanguage][key]) {
            console.log(`Translation for ${key} was not found`);
            return key;
        }

        let message = locales[defaultLanguage][key];
        for (let i = 0; i < args.length; i++) {
            message = message.replace(placeholder, args[i]);
        }

        return message;
    }

    /**
     * Returns an object of strings with labels for WebViews.
     * @static
     * @param {string} key
     * @return {Object}
     *
     */
    static getWebviewLocale(key: string): Object {
        if (!locales[defaultLanguage][key]) {
            console.log(`Translation for ${key} was not found`);
            return {};
        }

        return locales[defaultLanguage][key];
    }
}
