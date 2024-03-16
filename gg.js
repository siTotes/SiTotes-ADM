const { TiktokDownloader } = require("@tobyg74/tiktok-api-dl")

// const tiktok_url = "https://vt.tiktok.com/ZSF8yy3na/" //gambar
const tiktok_url = "https://vt.tiktok.com/ZSFamLSCN/" //video

TiktokDownloader(tiktok_url, {
  version: "v3" //  version: "v1" | "v2" | "v3"
}).then((result) => {
  console.log(result)
})