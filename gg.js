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
    nama1: "saipul",
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


text = '.rate seberapa cocok nabila dan Saipul'

for(let i = 0; i<dataRekayasa.length; i++){
    if (text.toLowerCase().includes(dataRekayasa[i].nama1) && text.toLowerCase().includes(dataRekayasa[i].nama2)) {
        let rating = Math.floor(Math.random() * 41) + dataRekayasa[i].outPersen;
        console.log(`Rate: ${text} (${rating}%)`)
        break
    } else {
        if(i === dataRekayasa.length - 1){
            let rating = Math.floor(Math.random() * 101)
            console.log(`Rate: ${text} (${rating}%)`)
        }
    }
}