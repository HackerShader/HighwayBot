const fs = require('node:fs');
/**
 * @param {String} path Path to text
 * @param {Object} param
 * @returns {String}
 */
module.exports = function (path, ...param) {
    const fs = require('node:fs')
    if (fs.existsSync('./settings.json')) delete require.cache[require.resolve('../settings.json')];
    const lang = fs.existsSync('./settings.json') ? require('../settings.json').lang : 'en';
    const translate = require('@vitalets/google-translate-api')
    const path_ = `./${lang == 'en' || lang == 'vi' ? lang : 'en'}`
    delete require.cache[require.resolve(path_)];
    let output = ''
    let index = require(path_)
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
