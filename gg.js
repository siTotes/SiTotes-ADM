const songList = `*•━━━━[ 🎶 YouTube Music 🎵]━━━━•*
Menemukan Lagu, pilih salah satu untuk memainkan, dengan membalas pesan ini dan ketik angka yang ingin di pilih

•━━( 1 )━━━━━━━━━━━━━━━━━━•
*🍂: DJ NOT YOU*
*🍀: Satu Production*
📎: 4kDHF9AkdNU

•━━( 2 )━━━━━━━━━━━━━━━━━━•
*🍂: DJ NOT YOU SLOW BEAT MANGKANE*
*🍀: BOJES FVNKY*
📎: 6alf6w6L6u4

•━━( 3 )━━━━━━━━━━━━━━━━━━•
*🍂: DJ Not You Slow Remix*
*🍀: DJ Oped*
📎: jT0S-l3LsdQ

(#)ytmp3
(#€)`;

const extractSongs = (songList) => {
  const regex = /\((\d+)\)\s+\*🍂:\s+(.*?)\*\n\*🍀:\s+(.*?)\*\n📎:\s+(.*)/gm;
  let match;
  const songs = [];

  while ((match = regex.exec(songList)) !== null) {
    const [, index, title, artist, link] = match;
    songs.push({ index, title, artist, link });
  }

  return songs;
};

const songs = extractSongs(songList);
const selectedSongIndex = 2; // Ganti dengan nomor lagu yang dipilih oleh pengguna
const selectedSong = songs.find((song) => song.index === String(selectedSongIndex));

if (selectedSong) {
  console.log(`(${selectedSong.index}) Title: ${selectedSong.title}\n   Artist: ${selectedSong.artist}\n   Link: ${selectedSong.link}`);
} else {
  console.log("Nomor lagu tidak valid.");
}