const YoutubeMusicApi = require('youtube-music-api')

const api = new YoutubeMusicApi()
api.initalize() // Retrieves Innertube Config
.then(info => {
	api.search("dj paradise", "song").then(result => console.log(result))
})