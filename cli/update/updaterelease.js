const superagent = require('superagent')
const info = require('./../../package.json')
const consolelog = require('./../util/translate')
const color = require('./../util/colorcode')
const fs = require('fs-extra')

module.exports = async () => {
    if (info.build === undefined) consolelog('', "\x1b[31m[X] HighwayBot not installed!\x1b1");
    return new Promise(async (resolve, reject) => {
        await superagent.get('https://api.github.com/repos/HackerShader/HighwayBot/releases/latest')
            .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36')
            .end(async (err, res) => {
                const json = JSON.parse(res.text);
                if (json.tag_name === info.build) return resolve(console.log('No update available'))
            })
    })
}