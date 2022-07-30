module.exports = {
    name: "err",
    description: "!For developer testing only!",
    aliases: ['test', 'error'],
    /**
     * 
     * @param {String[]} args 
     */
    execute(args) {
        if (args.slice(1).length != 0) throw new Error(args.slice(1).join(' '))
        else throw new Error('Soi mói cái jề mà soi. Bỏ nghen chưa -_-')
    }
};