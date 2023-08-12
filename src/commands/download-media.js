//━━━[ untuk memanggil code yang di luar folder ini ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const home = (path) => __base + path
require(home('./src/options/settings'))

//━━━[ ALL MODULE ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const fs = require('fs')
const moment = require("moment-timezone")
const chalk = require('chalk')

//━━━[ @SITOTES LIB ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const svdata = () => fs.writeFileSync(home(`/src/.sitotes/data/database.json`), JSON.stringify(db, null, 2))
const {
    smsg,
    getGroupAdmins,
    formatp,
    tanggal,
    tanggal_,
    tanggal__,
    formatDate,
    getTime,
    isUrl,
    sleep,
    clockString,
    runtime,
    fetchJson,
    getBuffer,
    jsonformat,
    format,
    logic,
    generateProfilePicture,
    parseMention,
    getRandom
} = require(home('./lib/myfunc'))
const lang = require(home('./src/options/lang_id'))

//━━━[ @BOCHILTEAM ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const {
    tiktokdl,
    youtubedl,
    youtubedlv2,
    youtubedlv3
} = require('@bochilteam/scraper')

//━━━[ DATA BASE ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\


//━━━[ If user chat download-media ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
module.exports = onic = async (onic, m, command, mek) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') && m.message.listResponseMessage.singleSelectReply.selectedRowId ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ""
        var budy = (typeof m.text == 'string' ? m.text : '')
        const content = onic.addProsMsg(mek.message)
        const type = Object.keys(mek.message)[0];
        const isCmd = mek.key.fromMe ? /^[$]/.test(body) : /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/$%^&.+-,\\\©^]/.test(body)
        const prefix = isCmd ? budy[0] : ''
        const salam = moment(Date.now()).tz(timezone).locale('id').format('a')
        const pushname = m.pushName || "No Name"
        const args = body.trim().split(/ +/).slice(1)
        const text = q = args.join(" ")
        const nrgs = args[0]

        let nua = 0
        const reply = async (teks) => {
            if (nua < 4) {
                nua = 999
                return await onic.sendFakeLink(m.chat, teks, salam, pushname, ownername, logo, myweb, m)
            } else {
                return await onic.sendMessage(m.chat, {
                    text: teks
                }, {
                    quoted: m
                })
            }
        }

        switch (command) {
            case 'tt':
            case 'tiktok': {
                if (!text){
                    await onic.sendReaction(m.chat, m.key, '❓')
                    return reply(lang.contoh(prefix, command, 'Url / link Video Tiktok'))
                }
                if (!isUrl(nrgs) && !nrgs.includes('tiktok.com')){
                    await onic.sendReaction(m.chat, m.key, '❓')
                    return reply(lang.contoh(prefix, command, text + ' 👈Ini bukan Url / Link Video tiktok'))
                }

                await onic.addProsMsg()
                await onic.sendReaction(m.chat, m.key, '⏳')
                let noerr = true
                const {
                    video
                } = await tiktokdl(nrgs).catch(async _ => noerr = false)

                if (noerr) {
                    const url = video.no_watermark_raw || video.no_watermark || video.no_watermark_hd || video.with_watermark
                    await onic.sendReaction(m.chat, m.key, '✈️')
                    await onic.sendVideoUrl(m.chat, url, false).catch(async _ => {
                        await onic.sendReaction(m.chat, m.key, '🤔')
                        await onic.sendVideoUrl(m.chat, url, false).catch(async _ => {
                            await onic.sendReaction(m.chat, m.key, '❌')
                            await onic.sendMessage(m.chat, {
                                text: 'Download Berhasil 📁.\nTetapi bot Gagal Mengirimkan video ke anda. Coba ulang ya 😔,\n\njika terjadi kesalahan terus menerus coba tanyakan owner ya 😉'
                            }, {
                                quoted: m
                            })
                            return ''
                        })
                    })
                    await onic.sendReaction(m.chat, m.key, '✅')
                } else {
                    await onic.sendReaction(m.chat, m.key, '❌')
                    await onic.sendMessage(m.chat, {
                        text: 'Terjadi Kesalahan 🤔,\nPeriksa link anda apakah error, jika tidak Coba kirim ulang,\n\njika terjadi kesalahan terus menerus coba tanyakan owner ya😉'
                    }, {
                        quoted: m
                    })
                }
            }
            break
            case 'youtube':
            case 'youtubedownload':
            case 'youtubedl':
            case 'ytdl':
            case 'youtubemp4':
            case 'youtubemp3':
            case 'ytmp4':
            case 'ytmp3': {
                if (!text){
                    await onic.sendReaction(m.chat, m.key, '❓')
                    return reply(lang.contoh(prefix, command, 'https://youtu.be/b-LInciXTmE'))
                }
                if (!isUrl(q)){
                    await onic.sendReaction(m.chat, m.key, '❓')
                    return reply(lang.contoh(prefix, command, 'https://youtu.be/b-LInciXTmE'))
                }
                if (!text.includes('youtu.be') && !text.includes('youtube.com')){
                    await onic.sendReaction(m.chat, m.key, '❓')
                    return reply(lang.contoh(prefix, command, 'https://youtu.be/7wfSvv4AHsQ'))
                }
                
                await onic.addProsMsg()
                await onic.sendReaction(m.chat, m.key, '⏳')
                let noerr = true
                
                const {
                    thumbnail,
                    video: _video,
                    title
                } = await youtubedl(nrgs).catch(async _ => await youtubedlv2(nrgs)).catch(async _ => noerr = false)
                
                if(noerr){
                    let resoluse = Object.getOwnPropertyNames(_video)
                    let resohigh = []
                    let listreso = 'Pilih salasatu resolusi yang sesuai contoh ketik 1 untuk yang paling hd\n'
                    for(let i = 0; i < resoluse.length; i++){
                        if(resohigh[i] == 'auto'){
                        }else{
                            resohigh.push(resoluse[i].split('p')[0])
                        }
                    }
                    resohigh = resohigh.sort(function(a, b){return b - a})
                    for(let i = 0; i < resohigh.length; i++){
                        if(resohigh[i] == 'auto'){
                        }else{
                            resohigh[i] = resohigh[i]+'p'
                        }
                        sizevid = _video[resohigh[i]].fileSize*1000
                        if(!+sizevid) sizevid = await onic.getUrlTotalSize(await _video[resohigh[0]].download())
                        listreso = listreso+'\n'+(i+1)+'. '+resohigh[i] + ' → ' + await onic.caculedSize(await sizevid)
                        if(resohigh.length -1 == i) listreso = listreso + '\n\nInfo Aja Jika ukuran nya lebih dari 48 mb video akan di kirim bentuk link, yang harus didownload manual'
                    }
                    console.log(onic.addProsMsg(listreso, null, 2))
                    reply(listreso)
                    let url = await _video[resohigh[0]].download()
                    await onic.sendReaction(m.chat, m.key, '✈️')
                    // if(_video[resohigh[0]].fileSize*1000 > 50000000){
                        // await reply(`🗃️ ${await onic.caculedSize(await _video[resohigh[0]].fileSize*1000)}\n${url}\n\nUkuran Media terlalu besar, jadi kami kirim kan link alternatif aja 😉`)
                    // }else{
                        await onic.sendVideoUrl(m.chat, url, false, lang.ok()).catch(async _ => {
                            await onic.sendReaction(m.chat, m.key, '🤔')
                            await onic.sendVideoUrl(m.chat, url, false, lang.ok()).catch(async _ => {
                                await onic.sendReaction(m.chat, m.key, '❌')
                                await onic.sendMessage(m.chat, {
                                    text: 'Download Berhasil 📁.\nTetapi bot Gagal Mengirimkan video ke anda. Coba ulang ya 😔,\n\njika terjadi kesalahan terus menerus coba tanyakan owner ya 😉'
                                }, {
                                    quoted: m
                                })
                                return ''
                            })
                        })
                    // }
                    await onic.sendReaction(m.chat, m.key, '✅')
                    
                }else{
                    await onic.sendReaction(m.chat, m.key, '❌')
                    await reply('Periksa Link anda apakah error jika tidak, coba ulang, Jika masih tidak bisa Hubungi Owner Jika perlu')
                }
                

            }
            break

        }

    } catch (err) {
        /**/console.log(onic.printErr(err))
        await m.reply('*Terjadi kesalahan, tolong bagikan ke owner:*\n\n```' + err + '```')
    } finally {
        onic.endProsMsg()
        /**/console.log(__filename.replace('/data/data/com.termux/files/home', '.'), '→ Save');
        svdata()
    }
}