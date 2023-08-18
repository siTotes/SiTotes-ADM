async function sjjs() {
  // Ini adalah contoh asynchronus operasi yang menghasilkan kesalahan
  try {
    // Ini adalah contoh operasi yang dapat menghasilkan kesalahan
    let response = await fetch('https://www.example.com/nonexistent');
    let data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

sjjs().catch(async _ => console.log('*Terjadi kesalahan Coba ulang kak,\njika masih tidak bisa, tolong bagikan ke owner:*\n\n```' + _ + '```'))