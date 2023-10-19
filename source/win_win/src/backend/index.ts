import { Canister, query, StableBTreeMap, text, update, Record, Vec, bool, Principal, Opt, nat, nat8, nat64, ic, Variant, int32, None, Null } from 'azle';
import { Challenge, Event, User } from "./types";
// This is a global variable that is stored on the heap
let message = '';

let users = StableBTreeMap(Principal, User, 0);
let events = StableBTreeMap(Principal, Event, 1);

const token = Canister({
    icrc1_balance_of: query([Record({
        'owner': Principal,
        'subaccount': Opt(Vec(nat8))
    })], nat),
    icrc1_transfer: update([Record({
        'to': Record({
            'owner': Principal,
            'subaccount': Opt(Vec(nat8))
        }),
        'fee': Opt(nat),
        'memo': Opt(Vec(nat8)),
        'from_subaccount': Opt(Vec(nat8)),
        'created_at_time': Opt(nat64),
        'amount': nat
    })], Variant({
        'OK': nat,
        'Err': Variant({
            'GenericError': Record({ 'message': text, 'error_code': nat }),
            'TemporarilyUnavailable': Null,
            'BadBurn': Record({ 'min_burn_amount': nat }),
            'Duplicate': Record({ 'duplicate_of': nat }),
            'BadFee': Record({ 'expected_fee': nat }),
            'CreatedInFuture': Record({ 'ledger_time': nat64 }),
            'TooOld': Null,
            'InsufficientFunds': Record({ 'balance': nat })
        })
    })),
    icrc2_transfer_from: update([Record({
        'to': Record({
            'owner': Principal,
            'subaccount': Opt(Vec(nat8))
        }),
        'fee': Opt(nat),
        'spender_subaccount': Opt(Vec(nat8)),
        'from': Record({
            'owner': Principal,
            'subaccount': Opt(Vec(nat8))
        }),
        'memo': Opt(Vec(nat8)),
        'created_at_time': Opt(nat64),
        'amount': nat
    })], Variant({
        'Ok': nat,
        'Err': Variant({
            'GenericError': Record({ 'message': text, 'error_code': nat }),
            'TemporarilyUnavailable': Null,
            'InsufficientAllowance': Record({ 'allowance': nat }),
            'BadBurn': Record({ 'min_burn_amount': nat }),
            'Duplicate': Record({ 'duplicate_of': nat }),
            'BadFee': Record({ 'expected_fee': nat }),
            'CreatedInFuture': Record({ 'ledger_time': nat64 }),
            'TooOld': Null,
        })
    }))
})

const tokenCanister = token(
    Principal.fromText('mxzaz-hqaaa-aaaar-qaada-cai')
);

export default Canister({

    createEvent: update([Event], bool, async (event) => {
        const caller = ic.caller();
        const userOpt = users.get(caller);
        const id = generateId();
        await ic.call(tokenCanister.icrc2_transfer_from, {
            args: [{to: {owner: ic.id(), subaccount: None}, fee: None, spender_subaccount: None, from: {owner: caller, subaccount: None}, memo: None, created_at_time: None, amount: event.price}]
        })
        const new_event: typeof Event = {
            id: id,
            name: event.name,
            location: event.location,
            logo: event.logo,
            category: event.category,
            price: event.price,
            creator: caller,
            finish: false,
            transactions: []
        };
        events.insert(id, new_event);
        if ('None' in userOpt) {
            console.log("USER DOES NOT EXIST");
            const new_user: typeof User = {
                eventIds: [id]
            };
            users.insert(caller, new_user);
        } else {
            console.log("USER EXISTS");
            const events = userOpt.Some;
            const new_user: typeof User = {
                eventIds: [...events.eventIds, id]
            };
            users.insert(caller, new_user);
        }
        return true
    }),

    getAllEvents: query([], Vec(Event), () => {
        return events.values();
    }),

    getEvents: query([int32, int32], Vec(Event), (page, limit) => {
        const start = (page - 1) * limit;
        const end = page * limit;
        console.log("[0]: " + events.values()[0]);
        console.log("Page: " + page);
        console.log("Limit: " + limit);
        console.log("START: " + start);
        console.log("END: " + end);
        // console.log("length: " + events.values().slice(start, end).length);
        return events.values().slice(start, end);
    }),

    getEventByUser: query([Principal], Vec(Event), (principal) => {
        const userOpt = users.get(principal);
        if ('None' in userOpt) {
            return [];
        }
        const eventIds = userOpt.Some.eventIds;
        if (eventIds.length === 0) {
            return [];
        }
        return eventIds.map((id) => events.get(id).Some!);
    }),

    getTransactions: query([Principal, int32, int32], Vec(Challenge), (principal, page, limit) => {
        const eventOpt = events.get(principal);
        if ('None' in eventOpt) {
            return [];
        } else {
            const transactions = eventOpt.Some.transactions;
            const start: int32 = page * limit - 1;
            const end: int32 = page * (limit - 1);
            return transactions.slice(start, end);
        }
    }),

    getAllTransactions: query([Principal], Vec(Challenge), (principal) => {
        const eventOpt = events.get(principal);
        if ('None' in eventOpt) {
            return [];
        }
        return eventOpt.Some.transactions;
    }),

    createTransaction: update([Principal, Challenge], bool, (eventId, challenge) => {
        const eventOpt = events.get(eventId);
        if ('None' in eventOpt) {
            return false;
        }
        const event = eventOpt.Some;
        const id = generateId();

        const new_challenge: typeof Challenge = {
            id: id,
            pic: challenge.pic,
            challenger: challenge.challenger,
        };

        const new_event: typeof Event = {
            id: event.id,
            name: event.name,
            location: event.location,
            logo: event.logo,
            category: event.category,
            price: event.price,
            creator: event.creator,
            finish: event.finish,
            transactions: [...event.transactions, new_challenge]
        };
        events.insert(eventId, new_event);
        return true;
    }),

    exitEvent: update([Principal, Opt(Challenge)], bool, (eventId, challenge) => {
        const caller = ic.caller();
        const eventOPt = events.get(eventId);
        if (challenge === None)
            return true;

        if ('None' in eventOPt)
            return false;
        const event = eventOPt.Some;

        if (event.creator !== caller)
            return false;
        event.finish = true;
        const winner = challenge.Some!.challenger;
        const amount = event.price - 1n;
        ic.call(tokenCanister.icrc1_transfer, {
            args: [{ to: { owner: winner, subaccount: None }, fee: None, memo: None, from_subaccount: None, created_at_time: None, amount}]
        })
        return true;
    })
});

function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}