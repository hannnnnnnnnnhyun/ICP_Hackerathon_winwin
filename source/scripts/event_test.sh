# !/bin/bash
set -e

azle betting || true
dfx generate betting
dfx deploy betting

# export BETTING_CANISTER_ID=$(dfx canister id betting)
echo "Betting Canister Id: $BETTING_CANISTER_ID"
echo "Deploying event canister"

azle event || true
dfx generate event
# dfx deploy event
dfx deploy event --argument "( principal \"$(dfx canister id betting)\")"