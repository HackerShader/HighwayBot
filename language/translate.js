const settings = require('../../settings.json');

/**
 * @param {String} path Path to text
 * @param {Object} param
 * @returns {String}
 */
module.exports = function (path, ...param) {
    let index = require('../../language/' + settings.lang ? settings.lang : 'en')
    path.split('.').forEach((param) => {
        if (index[param] == undefined) throw new Error('param undefined')
        index = index[param]
    })
    if (typeof index != 'function') throw new Error('index is not a function')
    return index(...param)
};