const dataRekayasa = [
  {
    nama1: "saiful",
    nama2: "bila",
    outPersen: 60
  },
  {
    nama1: "anam",
    nama2: "bila",
    outPersen: 60
  },
  {
    nama1: "yoga",
    nama2: "monic",
    outPersen: 60
  },
  {
    nama1: "yoga",
    nama2: "onichiwa",
    outPersen: 80
  },
  {
    nama1: "yoga",
    nama2: "oniciwa",
    outPersen: 80
  },
  {
    nama1: "yoga",
    nama2: "monika",
    outPersen: 60
  },
  {
    nama1: "yoga",
    nama2: "monik",
    outPersen: 60
  },
  {
    nama1: "akbar",
    nama2: "adist",
    outPersen: 60
  },
  {
    nama1: "akbar",
    nama2: "adis",
    outPersen: 60
  },
  {
    nama1: "maul",
    nama2: "adis",
    outPersen: 60
  }
]

for(let i = 0; i<dataRekayasa.length; i++){
    if (text.toLowerCase().includes(dataRekayasa[i].nama1) && text.toLowerCase().includes(dataRekayasa[i].nama2)) {
        let rating = Math.floor(Math.random() * 11) + dataRekayasa[i].outPersen;
        await reply(`Rate: ${text} (${rating}%)`)
    } else {
        let rating = Math.floor(Math.random() * 101)
        await reply(`Rate: ${text} (${rating}%)`)
    }
}




