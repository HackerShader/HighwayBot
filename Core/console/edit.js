const editJsonFile = require("edit-json-file")
/**
 * @param {String} name 
 * @param {String} value 
 */
module.exports = (name, value) => {
     const file = editJsonFile('./status.json')
    try {
        file.set(`${name}`, `${value}`)
        file.save()
    } catch (error) {

    }
}