import { Principal, Record, Vec, nat, text, bool, blob, int32 } from "azle";

export const User = Record({
    eventIds: Vec(Principal)
});

export const Challenge = Record({
    id: Principal,
    pic: blob,
    challenger: Principal,
    pick: bool,
});

export const Event = Record({
    id: Principal,
    name: text,
    location: text,
    logo: blob,
    category: text,
    price: nat,
    creator: Principal,
    state: text,
    transactions: Vec(Challenge),
});

export const Attributes = Record({
    key: text,
    value: text,
})

export const Metadata = Record({
    name: text,
    description: text,
    image: blob,
    attributes: Vec(Attributes),
});

export const NFT = Record({
    id: int32,
    metadata: Metadata,
    owner: Principal,
});
// pick
export const Bet = Record({
    id: Principal, // TransactionId랑 같음
    users: Vec(Principal), // User 투표 하면 추가 =
});

export const Betting = Record({
    id: Principal,
    finish: bool, 
    totalAmount: nat,
    bets: Vec(Bet),
});