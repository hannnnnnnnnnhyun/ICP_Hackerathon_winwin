import { Canister, query, StableBTreeMap, text, update, Record, Vec, bool, Principal, Opt, nat, nat8, nat64, ic, Variant, int32, None, Null, blob } from 'azle';
import { NFT } from "./types";

function getCaller(): string {
    const caller = ic.caller().toString();
    if (caller === null) {
      throw new Error("Caller is null");
    }
    return caller;
}
 
const nfts = StableBTreeMap(int32, NFT, 0);

export default Canister({
    initalize: update([Vec(NFT)], text, (input) => {
        const owner = getCaller();

        input.forEach((nft, index) => {
            const id = generateId();
            nfts.insert(index, nft);
        });

        // const nft = NFT({
        //     id: 1,
        //     metadata: {
        //         name: "NFT",
        //         description: "NFT",
        //         image: new Uint8Array(),
        //     },
        //     owner: Principal.fromText(owner),
        //     price: 1,
        //     onSale: true,
        // });
        return "NFTs initialized";
    }),
});

function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}