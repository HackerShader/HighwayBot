/**
 * @param {String} name 
 * @param {String} value 
 */
module.exports = (name, value) => {
    const edit = require("edit-json-file")
        , file = edit('./status.json')
    try {
        file.set(`${name}`, `${value}`)
        file.save()
    } catch (error) {

    }
}