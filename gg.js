async function printEverySecond() {
    while (true) {
        console.log('Pesan setiap 1 detik');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Menunggu 1 detik sebelum melanjutkan iterasi berikutnya
    }
}

printEverySecond();
printEverySecond();