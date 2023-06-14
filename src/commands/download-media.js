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
        const content = JSON.stringify(mek.message)
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
                if (!text) return reply(lang.contoh(prefix, command, 'url tiktok video'))
                if (!isUrl(nrgs) && !nrgs.includes('tiktok.com')) return reply(lang.contoh(prefix, command, 'url tiktok video'))

                await onic.addProses()
                await onic.sendReaction(m.chat, m.key, '⏳')
                await reply(lang.wait())
                let noerr = true
                const {
                    video
                } = await tiktokdl(nrgs).catch(async _ => noerr = false)

                if (noerr) {
                    const url = video.no_watermark_raw || video.no_watermark || video.no_watermark_hd || video.with_watermark
                    await onic.sendReaction(m.chat, m.key, '✈️')
                    await reply(lang.sending(`🗃️ ${await onic.getUrlTotalSize(url)}`))
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
                if (!text) return reply(lang.contoh(prefix, command, 'https://youtu.be/b-LInciXTmE'))
                if (!isUrl(q)) return reply(lang.contoh(prefix, command, 'https://youtu.be/b-LInciXTmE'))
                if (!text.includes('youtu.be') && !text.includes('youtube.com')) return reply(lang.contoh(prefix, command, 'https://youtu.be/7wfSvv4AHsQ'))
                
                await onic.addProses()
                await onic.sendReaction(m.chat, m.key, '⏳')
                await reply(lang.wait())
                let noerr = true
                
                const {
                    thumbnail,
                    video: _video,
                    title
                } = await youtubedl(nrgs).catch(async _ => await youtubedlv2(nrgs)).catch(async _ => noerr = false)
                
                if(noerr){
                    let resoluse = Object.getOwnPropertyNames(_video)
                    let resohigh = []
                    for(let i = 0; i < resoluse.length; i++){
                        resohigh.push(resoluse[i].split('p')[0])
                    }
                    resohigh = resohigh.sort(function(a, b){return b - a})
                    for(let i = 0; i < resohigh.length; i++){
                        if(resohigh[i] == 'auto'){
                        }else{
                            resohigh[i] = resohigh[i]+'p'
                        }
                    }
                    let url = await _video[resohigh[0]].download()
                    await onic.sendReaction(m.chat, m.key, '✈️')
                    await reply(lang.sending(`🗃️ ${await onic.caculedSize(await _video[resohigh[0]].fileSize*1000)}`))
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
                    await onic.sendReaction(m.chat, m.key, '✅')
                    
                }else{
                    await onic.sendReaction(m.chat, m.key, '❌')
                    await reply('Periksa Link anda apakah error jika tidak, coba ulang, Jika masih tidak bisa Hubungi Owner Jika perlu')
                }
                

            }
            break

        }

    } catch (err) {
        console.log(onic.printErr(err))
    } finally {
        onic.endProses()
        console.log(__dirname + ' Done ')
        svdata()
    }
}