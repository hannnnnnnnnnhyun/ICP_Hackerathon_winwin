set -e
dfx stop && dfx start --background --clean --host 127.0.0.1:8322

dfx identity use minter
export MINTER=$(dfx identity get-principal)
export TOKEN_NAME="My Token"
export TOKEN_SYMBOL="XMTK"

dfx identity use default
export DEFAULT=$(dfx identity get-principal)
export PRE_MINTED_TOKENS=10_000_000_000
export TRANSFER_FEE=10_000
export ARCHIVE_CONTROLLER=$(dfx identity get-principal)
export TRIGGER_THRESHOLD=2000
export NUM_OF_BLOCK_TO_ARCHIVE=1000
export CYCLE_FOR_ARCHIVE_CREATION=10000000000000
export FEATURE_FLAGS=true


dfx deploy icrc1_ledger_canister --specified-id mxzaz-hqaaa-aaaar-qaada-cai --argument "(variant {Init = 
record {
     token_symbol = \"${TOKEN_SYMBOL}\";
     token_name = \"${TOKEN_NAME}\";
     minting_account = record { owner = principal \"${MINTER}\" };
     transfer_fee = ${TRANSFER_FEE};
     metadata = vec {};
     feature_flags = opt record{icrc2 = ${FEATURE_FLAGS}};
     initial_balances = vec { record { record { owner = principal \"${DEFAULT}\"; }; ${PRE_MINTED_TOKENS}; }; };
     archive_options = record {
         num_blocks_to_archive = ${NUM_OF_BLOCK_TO_ARCHIVE};
         trigger_threshold = ${TRIGGER_THRESHOLD};
         controller_id = principal \"${ARCHIVE_CONTROLLER}\";
         cycles_for_archive_creation = opt ${CYCLE_FOR_ARCHIVE_CREATION};
     };
 }
})"
dfx generate icrc1_ledger_canister
dfx generate backend
dfx deploy backend

# dfx canister update-settings icrc1_ledger_canister --add-controller bkyz2-fmaaa-aaaaa-qaaaq-cai  




# echo "===== VISIT DEFI FRONTEND ====="
# echo "http://127.0.0.1:8122?canisterId=$(dfx canister id frontend)"
# echo "===== VISIT D.EFI FRONTEND ====="
