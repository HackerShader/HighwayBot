module.exports = {
    name: "clear",
    description: "Clear the console",
    async execute() {
        console.clear()
        console.log('Console cleared')
    }
}