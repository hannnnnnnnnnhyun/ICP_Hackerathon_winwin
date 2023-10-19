import { Principal, Record, Vec, nat, text, bool } from "azle";

export const User = Record({
    eventIds: Vec(Principal)
});

export const Challenge = Record({
    id: Principal,
    pic: text,
    challenger: Principal,
});

export const Event = Record({
    id: Principal,
    name: text,
    location: text,
    logo: text,
    category: text,
    price: nat,
    creator: Principal,
    finish: bool,
    transactions: Vec(Challenge),
});



// pick

