set -e
dfx stop && dfx start --background --clean --host 127.0.0.1:8321
pwd
rm -rf src/frontend/dist || true

azle betting || true
dfx generate betting
dfx deploy betting

azle nft || true
dfx generate nft
dfx deploy nft

azle swap || true
dfx generate swap
dfx deploy swap

II_FETCH_ROOT_KEY=1 dfx deploy internet_identity --no-wallet --argument '(null)'

dfx identity use minter
export MINTER=$(dfx identity get-principal)
export TOKEN_NAME="My Token"
export TOKEN_SYMBOL="XMTK"

dfx identity use default
# export DEFAULT=$(dfx identity get-principal)
export DEFAULT=br5f7-7uaaa-aaaaa-qaaca-cai
export PRE_MINTED_TOKENS=10_000_000_000_000
export TRANSFER_FEE=0
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

dfx identity use minter
export MINTER_ACCOUNT_ID=$(dfx ledger account-id)

dfx identity use default

wget https://download.dfinity.systems/ic/d87954601e4b22972899e9957e800406a0a6b929/canisters/ledger-canister.wasm.gz

dfx canister create ledger_canister
mkdir -p ".dfx/local/canisters/ledger_canister"
mv ledger-canister.wasm.gz .dfx/local/canisters/ledger_canister/ledger_canister.wasm.gz


# II_FETCH_ROOT_KEY=1 dfx deploy internet_identity --no-wallet --argument '(null)'


dfx deploy --specified-id b77ix-eeaaa-aaaaa-qaada-cai ledger_canister --argument "
  (variant {
    Init = record {
      minting_account = \"$MINTER_ACCOUNT_ID\";
      initial_values = vec {
        record {
          \"df92d431e5edf30156b44e6b7a5e4a133fe49f212d718c9ea5551037a13f0dc4\";
          record {
            e8s = 10_000_000_000_000 : nat64;
          };
        };
      };
      send_whitelist = vec {};
      transfer_fee = opt record {
        e8s = 10_000 : nat64;
      };
      token_symbol = opt \"LICP\";
      token_name = opt \"Local ICP\";
    }
  })
"

dfx generate ledger_canister
echo "generated ledger_canister"

azle event || true
dfx generate event
dfx deploy event --argument "( principal \"$(dfx canister id betting)\", principal \"$(dfx canister id nft)\")"

dfx canister create frontend
pushd src/frontend
npm install
npm run build
popd
dfx build frontend || true
dfx canister install frontend
echo "http://$(dfx canister id frontend).localhost:8321/"

# dfx canister update-settings icrc1_ledger_canister --add-controller bkyz2-fmaaa-aaaaa-qaaaq-cai  




# echo "===== VISIT DEFI FRONTEND ====="
# echo "http://127.0.0.1:8122?canisterId=$(dfx canister id frontend)"
# echo "===== VISIT D.EFI FRONTEND ====="
