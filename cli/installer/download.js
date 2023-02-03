const fs = require('fs');
const superagent = require('superagent');
const color = require('./../util/colorcode')
const string = require('../../language/translate')

//download file from url

async function download() {
console.log(string('cli.installer.download.get_information'));
superagent.get('https://api.github.com/repos/HackerShader/HighwayBot/releases/latest')
    .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36')
    .end(async (err, res) => {
        console.log(string('cli.installer.download.downloading'));
        const json = JSON.parse(res.text);
        superagent.get(json.zipball_url)
            .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36')
            .end(async (err, res) => {
                if (err) return;
                fs.writeFileSync('./HighwayBotResource.zip', res.body);
                console.log(string('cli.installer.download.done'));
                require('./unzip');
            });
    });
}
download()