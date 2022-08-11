const fs = require('fs')
const superagent = require('superagent');

const download = async (url, path) => {
    const file = fs.createWriteStream(path);
    const response = await superagent.get(url);
    response.pipe(file);
    return new Promise((resolve, reject) => {
        file.on('finish', resolve);
        file.on('error', reject);
    });
}

download('https://codeload.github.com/HackerShader/HighwayBot/legacy.zip/062922', '__dirname');


