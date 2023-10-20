# #!/bin/bash
set -e

azle nft || true
dfx generate nft
dfx deploy nft