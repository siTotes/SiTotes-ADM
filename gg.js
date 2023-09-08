const puppeteer = require('puppeteer');

async function scrapeYouTubeMusic(url) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Tunggu sejenak agar konten selesai dimuat (Anda dapat menyesuaikan timeout sesuai kebutuhan).
    await page.waitForTimeout(5000);

    // Ambil judul dari halaman
    const title = await page.title();

    // Ambil deskripsi dari halaman
    const description = await page.evaluate(() => {
      const descriptionElement = document.querySelector('.style-scope.ytmusic-player-queue-item-renderer');
      return descriptionElement ? descriptionElement.textContent : '';
    });

    // Ambil URL gambar besar
    const imageUrl = await page.evaluate(() => {
      const imageElement = document.querySelector('.style-scope.ytmusic-player-queue-item-renderer img');
      return imageElement ? imageElement.src : '';
    });

    console.log('Judul:', title);
    console.log('Deskripsi:', description);
    console.log('URL Gambar Besar:', imageUrl);

    await browser.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

const url = 'https://music.youtube.com/watch?v=TTrdYIdxmy0&si=6WbmkztDCQcw2_iA';
scrapeYouTubeMusic(url);