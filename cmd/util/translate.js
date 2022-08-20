const Translate = require('@vitalets/google-translate-api')
module.exports = (color, text) => {
    return new Promise(async (resolve, reject) => {
        await Translate(text, {to: 'vi'}).then(async(res) => {
            console.log(color, `${res.text}`);
        })
    })
}