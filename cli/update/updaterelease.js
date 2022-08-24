const superagent = require('superagent')
const info = require('./../../package.json')
const consolelog = require('./../util/translate')
const color = require('./../util/colorcode')

if (info.build === undefined) consolelog('',"\x1b[31m[X] HighwayBot not installed!\x1b1");

async function Update() {
    await superagent.get('https://api.github.com/repos/HackerShader/HighwayBot/releases/latest')
    .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36')
    .end(async (err, res) => {
        console.log(color.code.yellow, '[Updater] Downloading resource...');
        const json = JSON.parse(res.text);
        if (json.tag_name === info.build) console.log('No update available')   
        await superagent.get(json.zipball_url)
            .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36')
            .end(async (err, res) => {
                if (err) return;
                await fs.writeFileSync('./HighwayBotResource.zip', res.body);
                await consolelog(color.code.green,'[Done] Downloaded resource');
                await require('./../installer/unzip');
                
            });
    });
}   

Update()