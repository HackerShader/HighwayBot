const Translate = require('@vitalets/google-translate-api');
const settings = require('../../settings.json');
module.exports = async (color, text) => {
    if (settings.lang === 'en') return console.log(color, text);
    return new Promise(async (resolve, reject) => {
        await Translate(text, {to: settings.lang}).then(async (res) => {
            resolve(console.log(color, res.text));
        });
    });
};
