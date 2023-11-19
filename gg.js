const gameData = {
  "gameid": "BAE5ADE459F2C48D",
  "soaltype": "f100",
  "jawaban": ["iklim panas", "alok", "iklim laut", "iklim muson"],
  "jawab": ["iklim panas", "", "iklim laut", ""],
  "hadiah": {
    "xp": 0.75,
    "coin": 30
  }
};

// Menampilkan jawaban yang benar dan memberi tanda '-' untuk yang salah
function tampilkanJawaban(gameData) {
  let hasilJawaban = ''

  gameData.jawab.forEach((jawab, index) => {
    if (jawab === gameData.jawaban[index]) {
      hasilJawaban += `${index + 1}. ${jawab} ✅\n`
    } else {
      hasilJawaban += `${index + 1}. ${gameData.jawaban[index].replace(/[bcdfghjklmnpqrstvwxyz]/ig, '_')} 🤔\n`
    }
  });

  return hasilJawaban;
}

const jawabanList = tampilkanJawaban(gameData);
console.log(jawabanList)