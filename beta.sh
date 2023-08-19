#!/bin/bash

console.log() {
  local message="$1"
  local color="\033[93m"    # Kode ANSI untuk warna kuning
  local bold="\033[1m"      # Kode ANSI untuk gaya teks tebal
  local reset="\033[0m"     # Kode ANSI untuk mereset gaya

  echo -e "${bold}${color}${message}${reset}"
}

console.log "Membenarkan file..."
rsync -av --exclude='node_modules' ~/gay/botwa/ /storage/emulated/0/.bot/3D72-45DB/
find /storage/emulated/0/.bot/3D72-45DB/src/session/sender/ -type f ! -name 'creds.json' ! -name 'baileys_store.json' -exec rm -f {} \;
find /storage/emulated/0/.bot/3D72-45DB/src/session/Cache-Buffer/ -type f ! -name '.sitotes' -exec rm -f {} \;
echo '{"chats":[],"contacts":{},"messages":{}}' > /storage/emulated/0/.bot/3D72-45DB/src/session/sender/baileys_store.json
echo '[]' > /storage/emulated/0/.bot/3D72-45DB/src/.sitotes/data/data-msg.json
echo '{"data":{"game":{},"proses":{"reaload":{"messages":[]}}}}' > /storage/emulated/0/.bot/3D72-45DB/src/.sitotes/data/database.json

console.log "Mengupload proses..."
cd /storage/emulated/0/.bot/3D72-45DB/
node ./.git/versi
git add .
git commit -m "m"

console.log "\n\nUser  ->   siTotes"
console.log "User  ->   siTotes"
console.log "User  ->   siTotes"
console.log "User  ->   siTotes"
console.log "User  ->   siTotes"
console.log "User  ->   siTotes"
console.log ""
console.log "Token ->   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"
console.log "Token ->   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"
console.log "Token ->   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"
console.log "Token ->   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"
console.log "Token ->   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"
console.log "Token ->   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"
#git push -f origin master

console.log "Proses selesai..."