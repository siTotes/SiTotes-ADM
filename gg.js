global.__base = __dirname + '/';
const axios = require('axios')

const fetchJson = async (url, options) => {
    try {
        options = options || {};
        const res = await axios({
            method: 'GET',
            url: url,
            ...options,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            }
        });
        return res.data;
    } catch (err) {
        return err;
    }
}

async function alok() {
















const emoji1 = '🙃';
const response = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}`);
const results = response.results;

const formattedResults = results.map(res => {
    const tags = res.tags.join(' + ');
    const linkpath = res.url.replace('https://www.gstatic.com/android/keyboard/emojikitchen/', '');
    return `*ꈍ(   ${tags}   )ꈍ*\n\n⊡ ${linkpath}`;
});
formattedResults.push('*ꈍ(   😂 + 😇   )ꈍ*\n\n⊡ 20230301/u1f602/u1f602_u1f643.png')


const chunkSize = 12;
for (let i = 0; i < formattedResults.length; i += chunkSize) {
    let chunk = formattedResults.slice(i, i + chunkSize);
    let count = chunk.length;
    if(count<2) chunk = [chunk[0], chunk[0]]
    const prompt = `*SiTotes*\n~🆔72828282827~\n\n\nMenemukan ${count} Gambar di pinterest.\nPilih salah satu Untuk menyimpan:`;
    console.log(prompt, chunk);
}









}
alok();