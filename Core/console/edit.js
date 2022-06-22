const editJsonFile = require("edit-json-file")

module.exports = (name, value) => {
    const file = editJsonFile('./Core/console/status.json')
    try {
        file.set(`${name}`, `${value}`)
        file.save()
    } catch (error) {
        console.log(error)
    }
}