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
        await Translate(text, { to: settings.lang }).then(async (res) => {
            resolve(console.log(color == null ? '' : color, res.text));
        });
    });
};