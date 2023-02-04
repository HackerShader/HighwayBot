const fs = require('node:fs');
/**
 * @param {String} path Path to text
 * @param {Object} param
 * @returns {String}
 */
module.exports = function (path, ...param) {
    delete require.cache[require.resolve('../settings.json')];
    const fs = require('node:fs')
    const lang = fs.existsSync('./settings.json') ? require('../settings.json').lang : 'en';
    const translate = require('@vitalets/google-translate-api')
    let output = ''
    let index = require(`./${lang == 'en' || lang == 'vi' ? lang : 'en'}`)
    path.split('.').forEach((param) => {
        if (!index[param]) {
            console.log({ path, param, index, _index: index[param] });
            throw new Error(`invalid path: ${lang}.${path}`)
        }
        index = index[param]
    })
    if (typeof index != 'function') throw new Error(`index ${path} is not a function`)
    output = index(...param)
    return output
};
