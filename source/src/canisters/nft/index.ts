import { Canister, query, StableBTreeMap, text, update, Record, Vec, bool, Principal, Opt, nat, nat8, nat64, ic, Variant, int32, None, Null, blob, Recursive } from 'azle';
import { NFT } from "../types";

// const nfts = StableBTreeMap(Principal, NFT, 0);
const owners = StableBTreeMap(Principal, Vec(int32), 0);
const nfts = StableBTreeMap(int32, NFT, 1);

export default Canister({
    mint: update([NFT, text], int32, (nft, to) => {
        const id = nfts.keys().length + 1;
        const new_nft: typeof NFT = {
            id: id,
            metadata: nft.metadata,
            owner: Principal.fromText(to),
        };
        nfts.insert(id, new_nft);

        const owner = owners.get(new_nft.owner);
        if ('None' in owner) {
            owners.insert(new_nft.owner, [id]);
        } else {
            const new_owner = owner.Some.concat([id]);
            owners.insert(new_nft.owner, new_owner);
        }

        return id;
    }),

    getTokenId: query([int32], Opt(NFT), (id) => {
        return nfts.get(id);
    }),

    getNftByOwner: query([Principal], Vec(NFT), (_owner) => {
        const ids = owners.get(_owner);
        if ('None' in ids) {
            return [];
        } else {
            const nftList = [];
            for (let i = 0; i < ids.Some.length; i++) {
                const new_nft = nfts.get(ids.Some[i]);
                if ('None' in new_nft) {
                    continue;
                } else {
                    nftList.push(new_nft.Some);
                }
            }
            return nftList;
        }
    }),

    getOwnerCount: query([Principal], int32, (owner) => {
        const ids = owners.get(owner);
        if ('None' in ids) {
            return 0;
        } else {
            return ids.Some.length;
        }
    }),

    getTokenIdByOwner: query([Principal], Vec(int32), (owner) => {
        const ids = owners.get(owner);
        if ('None' in ids) {
            return [];
        } else {
            return ids.Some;
        }
    }),


});