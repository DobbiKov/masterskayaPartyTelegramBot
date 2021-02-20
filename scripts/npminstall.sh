set -eu

mkdir "$HOME/.ssh"

echo "${{ secrets.key }}" > "$HOME/.ssh/key"

chmod 600 "$HOME/.ssh/key"

ssh -i $HOME/.ssh/key root@185.206.212.246 -o StrictHostKeyChecking=no 
cd /root/MasterskayaPartyBot/ 
npm install
