# #!/bin/bash
# set -e
# dfx stop && dfx start --background --clean --host 127.0.0.1:8321

pushd src/frontend
pwd
npm install
echo "npm installed"
npm run build || true
echo "npm build frontend"
dfx build frontend || true
echo "dfx built frontend"
dfx canister install -m upgrade frontend
echo "installed frontend"

# echo "===== VISIT DEFI FRONTEND ====="
echo "http://$(dfx canister id frontend).localhost:8321/"
# echo "===== VISIT DEFI FRONTEND ====="

