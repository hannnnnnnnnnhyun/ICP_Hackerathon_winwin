# #!/bin/bash
set -e
dfx stop && dfx start --background --clean --host 127.0.0.1:8321
rm -rf ../src/frontend/dist || true

dfx canister create frontend
echo "created frontend"
pushd src/frontend
pwd
echo "pushsh frontend"
npm install
echo "installed frontend"
npm run build
echo "built frontend"
popd
echo "popd frontend"
dfx build frontend || true
echo "built frontend"
# dfx canister install -m upgrade frontend
dfx canister install frontend
echo "installed frontend"
# dfx deploy frontend

# echo "===== VISIT DEFI FRONTEND ====="
echo "http://127.0.0.1:8321?canisterId=$(dfx canister id frontend)"
# echo "===== VISIT DEFI FRONTEND ====="