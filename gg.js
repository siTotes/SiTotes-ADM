const daftarVideoText = `
•━━( 1 )━━━━━━━━━━━━━━━━━━•
*🍂: Subil contoh & his Russian friend*
📎: https://www.contoh.com/video-6kc7q11/

•━━( 2 )━━━━━━━━━━━━━━━━━━•
*🍂: contoh Photography - by Sapphic Ero...*
📎: https://www.contoh.com/video-ct4pxf2/contoh_photography_-

•━━( 3 )━━━━━━━━━━━━━━━━━━•
*🍂: ghi contoh*
📎: https://www.contoh.com/video-18ui51ee/l

•━━( 4 )━━━━━━━━━━━━━━━━━━•
*🍂: uwuw contoh with Natural wiwi contoh...*
📎: https://www.contoh.com/video-hyo4982/l

•━━( 5 )━━━━━━━━━━━━━━━━━━•
*🍂: whuw TRAINING contoh whuw sucking and...*
📎: https://www.contoh.com/ontoh_


(#)xdl
`;

function tampilkanVideo(userNgirim, daftarVideoText) {
    const regexx = /🍂:\s(.*?)\*\n📎:\s(.*?)\n/g;
    let matchh;
    let i = 1;

    while ((matchh = regexx.exec(daftarVideoText)) !== null) {
        const judul = matchh[1];
        const link = matchh[2];

        if (i === userNgirim) {
            console.log(`Judul: ${judul}`);
            console.log(`Link: ${link}`);
            break;
        }

        i++;
    }

    if (i < userNgirim) {
        console.log("Nomor video tidak valid.");
    }
}

// Menggunakan contoh userNgirim = 4
let userNgirim = 4;
tampilkanVideo(userNgirim, daftarVideoText);

const regexxx = /\(#\)(\w+)/;
const matchhh = daftarVideoText.match(regexxx);

if (matchhh) {
    const xdlValue = matchhh[1];
    console.log(xdlValue);
} else {
    console.log("xdl not found");
}