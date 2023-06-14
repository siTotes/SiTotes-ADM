//━━━[ Bahasa sehari hari ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
exports.contoh = (prefix, command, style, style2 = "query") => {
    return `Contoh penggunaan: \n${prefix + command} ${style2}\n\n${prefix + command} ${style}`
}
exports.wait = () => {
    return `⏳ Mohon tunggu sebentar`
}
exports.ok = () => {
    return `✅ Done.`
}
exports.sending = (pe) => {
    if (pe) {
        return 'Sedang Mengirim → ✈️' + `\n${pe}`
    } else {
        return 'Sedang Mengirim → ✈️'
    }
}

exports.waitt = () => {
    return '⏳'
}
exports.sendingg = () => {
    return '✈️'
}
exports.okk = () => {
    return `✅`
}

//━━━[ Game ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
exports.JwbTrue = (soalapa, rpmoney, totalxp, mainlagi) => {
    return `╭─❒ 「 *🎉 SELAMAT 🎉* 」 
├ _🎊Jawaban Anda benar 🎊_ 
│
├→ ╭─( *🎁 Hadiah* )
│     │
│     ├💰 *Rp: ${rpmoney}* 
│     ├ 🧩 + *${totalxp}* _XP_ 
│     ╰→
╰❒ *${soalapa}* 


ketik Perintah:
*#${mainlagi}*

Untuk bermain lagi 👍`
}

exports.JwbHampir = () => {
    return `*🧐 _Ya, dikit lagi Kak_ 😅*`
}
exports.JwbErr = () => {
    return `*😮‍💨 Jawaban Salah 👻*
━━━━━━━━━━━━
 ` + '```Ketik Perintah:``` ' + `
*#bantuan*
untuk meminta bantuan 😌dan

*#nyerah*
untuk menyerah 😵`
}


//━━━[ Sticker ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
exports.SmemeErr = (prefix, command) => {
    return `Kirim/Reply Foto Dengan Caption ${prefix + command} *teks nya*`
}
exports.NoToStik = (prefix, command) => {
    return `Kirim/Reply Gambar/Video Dengan Caption ${prefix + command}\n\nDurasi Sticker Video 1-9 Detik`
}