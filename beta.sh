#!/bin/bash

console.log() {
  local message="$1"
  local color="\033[93m"    # Kode ANSI untuk warna kuning
  local bold="\033[1m"      # Kode ANSI untuk gaya teks tebal
  local reset="\033[0m"     # Kode ANSI untuk mereset gaya

  echo -e "${bold}${color}${message}${reset}"
}

clear_console() {
  printf "\033c"  # Escape sequence untuk membersihkan konsol
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

versi=$(cat /storage/emulated/0/.bot/3D72-45DB/versi)
IFS='.' read -ra angka <<< "$versi"

for i in "${!angka[@]}"; do
    angka[i]=$(echo "${angka[i]}" | tr -d '[:alpha:]')
done

if [ "${angka[2]}" -lt 23 ]; then
    angka[2]=$((angka[2] + 1))
else
    angka[2]=0
    angka[1]=$((angka[1] + 1))

    if [ "${angka[1]}" -gt 17 ]; then
        angka[1]=0
        angka[0]=$((angka[0] + 1))
    fi
fi
clear_console
versi="${angka[0]}.${angka[1]}.${angka[2]}"
console.log "Versi Pembaruan: $versi\n==================================================="

git add .
git commit -m "m"

console.log ""
console.log "User  ->   siTotes"
console.log "User  ->   siTotes"
console.log "User  ->   siTotes"
console.log ""
console.log "Token ->   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"
console.log "Token ->   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"
console.log "Token ->   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"
console.log ""
git push -f origin master
echo "$versi" > /storage/emulated/0/.bot/3D72-45DB/versi


console.log "Proses selesai: $versi"