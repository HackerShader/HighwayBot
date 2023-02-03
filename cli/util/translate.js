const Translate = require('@vitalets/google-translate-api');
const settings = require('../../settings.json');
/**
 * 
 * @param {String | null} color Color code
 * @param {String | null} text Text to log
 */
module.exports = async (color, text) => {
    if (settings.lang === 'en') return console.log(color == null ? '' : color, text);
    return new Promise(async (resolve, reject) => {
        delete require.cache[require.resolve('../../settings.json')];
        const settings_new = require('../../settings.json');
        await Translate(text, { to: settings_new.lang }).then(async (res, err) => {
            if(err) reject(err);
            resolve(console.log(color == null ? '' : color, res.text));
        });
    });
};