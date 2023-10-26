# Play Sample
* [Setup](#setup)
* [Build](#build)
* [Run](#run)
* [Project Structure](#project-structure)
* [Bootstrap Files Structure](#bootstrap-files-structure)
* [License](#license)

## Setup
- Install [Node.js](https://nodejs.org/en/download/) (Node v16.15.0)
- Install [DFINITY Canister SDK](https://sdk.dfinity.org/docs/quickstart/local-quickstart.html)

## Build
- `npm install`

## Run
- `make install`


## Project Structure
```
src/
├── canisters/
│   ├── betting/
│   │   ├── #Betting canister
│   ├── event/
│   │   ├── #Event canister
│   ├── nft/
│   │   ├── #NFT canister
│   ├── types.ts 
│   │   ├── #Event / Betting / NFT canister types
├── frontend
│   ├── frontend canister
scripts/
├── #make scripts
dfx.json
```
## Bootstrap Files Structure
```
frontend/
├── public/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── theme-teal.min.css
│   │   │   ├── custom.css
│   │   ├── fonts/
│   │   │   ├── bootstrap-icons
│   │   │   ├── boxicons
│   │   │   ├── iconsmind
│   │   │   ├── webfonts
│   │   ├── images/
│   │   ├── js/
│   │   │   ├── theme.bundle.min.js
│   │   └── vender/
│   │       ├── ...
```

## License
- MIT License

