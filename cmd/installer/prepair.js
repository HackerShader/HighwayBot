const prompt = require('prompt');

console.log('alo');
prompt.start();
prompt.get(['confirm'], (err, result) => {
    if (err) return;
    console.log(result);
});
