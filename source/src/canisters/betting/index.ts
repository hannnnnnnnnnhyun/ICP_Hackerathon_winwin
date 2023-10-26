import { Canister, query, StableBTreeMap, text, update, Record, Vec, bool, Principal, Opt, nat, nat8, nat64, ic, Variant, int32, None, Null, blob, TimerId } from 'azle';
import { Challenge, Bet, Betting } from "../types";

const token = Canister({
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

let bettings = StableBTreeMap(Principal, Betting, 0);
const amount = 10n;
const e8s = 100000000n;

export default Canister({

    createBetting: update([Principal], Betting, (eventId) => {
        const caller = ic.caller();
        const bettingOpt = bettings.get(eventId);
        if (!('None' in bettingOpt))
            throw new Error('Already create')
        const new_betting: typeof Betting = {
            id: eventId, finish: false, totalAmount: 0n, bets: []
        }
        bettings.insert(eventId, new_betting)
        return new_betting;
    }),

    insertBet: update([Principal, Principal], Betting, (eventId, txId) => {
        const bettingOpt = bettings.get(eventId);
        if ('None' in bettingOpt)
            throw new Error('Betting not found')

        const betting = bettingOpt.Some;
        if (betting.finish)
            throw new Error('Betting finished')
        const new_bet: typeof Bet = {
            id: txId, users: []
        };

        for (let i = 0; i < betting.bets.length; i++) {
            if (betting.bets[i].id.toString() === txId.toString())
                throw new Error('Already register')
        }

        const new_betting: typeof Betting = {
            id: betting.id, finish: false, totalAmount: betting.totalAmount, bets: [...betting.bets, new_bet]
        }
        bettings.insert(eventId, new_betting);
        return new_betting;
    }),

    bet: update([Principal, Principal], bool, async (bettingId, txId) => {
        const caller = ic.caller();
        const bettingOpt = bettings.get(bettingId);
        if ('None' in bettingOpt)
            return false;
        const betting = bettingOpt.Some;
        if (betting.finish)
            return false;
        for (let i = 0; i < betting.bets.length; i++) {
            if (betting.bets[i].id.toString() === txId.toString()) {
                console.log(betting.bets[i].users)
                betting.bets[i].users.push(caller);
            }
        }

        const new_betting: typeof Betting = {
            id: betting.id, finish: false, totalAmount: betting.totalAmount + amount, bets: betting.bets
        }
        await ic.call(tokenCanister.icrc2_transfer_from, {
            args: [{to: {owner: ic.id(), subaccount: None}, fee: None, spender_subaccount: None, from: {owner: caller, subaccount: None}, memo: None, created_at_time: None, amount: amount * e8s}]
        })
        bettings.insert(bettingId, new_betting);
        return true;
    }),

    exitBetting: update([Principal, Principal], bool, async (eventId, txId) => {
        let winner;
        const bettingOpt = bettings.get(eventId);
        if ('None' in bettingOpt)
            return false;
        const betting = bettingOpt.Some;
        if (betting.finish)
            return false;
        const bets = betting.bets;
            
        for (let i = 0; i < bets.length; i++) {
            if(bets[i].id.toString() === txId.toString())
                winner = bets[i];
        }
        const winners = winner.users;
        console.log('======================================')
        for (let i = 0; i < winners.length; i++) {
            console.log(winners[i].toString())
            console.log(Number(betting.totalAmount))
            await ic.call(tokenCanister.icrc2_transfer_from, {
                args: [{to: {owner: winners[i], subaccount: None}, fee: None, spender_subaccount: None, from: {owner: ic.id(), subaccount: None}, memo: None, created_at_time: None, amount: (betting.totalAmount / BigInt(winners.length) * e8s)}]
            })
        }
        const new_betting: typeof Betting = { id: betting.id, finish: true, totalAmount: 0n, bets: [] };
        bettings.insert(eventId, new_betting);
        return true;
    })

})
