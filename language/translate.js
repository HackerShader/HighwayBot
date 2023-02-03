/**
 * @param {String} path Path to text
 * @param {Object} param
 * @returns {String}
 */
module.exports = function (path, ...param) {
    const fs = require('node:fs')
    const lang = fs.existsSync('./settings.json') ? require('../settings.json').lang || 'en' : 'en';
    let index = require('./' + lang)
    path.split('.').forEach((param) => {
        if (index[param] == undefined) throw new Error(`invalid path: ${path}`)
        index = index[param]
    })
    if (typeof index != 'function') throw new Error(`index ${path} is not a function`)
    return index(...param)
};