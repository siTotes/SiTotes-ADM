//mengambil nama konten dari data yang Anda berikan:
const data = {
  "content": [
    {
      "type": "song",
      "videoId": "uK1-5ctdhsY",
      "playlistId": [],
      "name": "DJ Sampaikan Pada Jiwa Yang Bersedih Remix",
      // ... (data lainnya)
    },
    {
      "type": "song",
      "videoId": "eP_mW_UJEqY",
      "playlistId": [],
      "name": "Jiwa Yang Bersedih",
      // ... (data lainnya)
    },
    {
      "type": "song",
      "videoId": "X_f8EObT2Fc",
      "playlistId": [],
      "name": "DJ JIWA YANG BERSEDIH V2",
      // ... (data lainnya)
    },
    // ... (daftar konten lainnya)
  ]
};

// Mengambil nama konten dan menyusunnya dalam bentuk teks
const contentNames = (data.content.map((item, index) => `${index + 1}. ${item.name}`)).join('\n');

console.log(contentNames)