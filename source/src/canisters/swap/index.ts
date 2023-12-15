import { Canister, query, StableBTreeMap, text, update, Record, Vec, bool, Principal, Opt, nat, nat8, nat64, ic, Variant, int32, None, Null, blob, init } from 'azle';

const token = Canister({
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
});

const ledger = Canister({
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
    icrc1_balance_of: query([Record({
        'owner': Principal,
        'subaccount': Opt(Vec(nat8))
    })], nat)
})

const tokenCanister = token(
    Principal.fromText('mxzaz-hqaaa-aaaar-qaada-cai')
);

const ledgerCanister = ledger(
    Principal.fromText('b77ix-eeaaa-aaaaa-qaada-cai')
);

let Balance = 0n

export default Canister({

    get: query([], nat, () => {
        return Balance;
    }),

    LedgerToToken: update([], bool, async () => {

        const balance = await ic.call(ledgerCanister.icrc1_balance_of, {
            args: [{ owner: ic.id(), subaccount: None }]
        })

        const insert = balance - Balance;
        Balance = balance;

        const token_result = await ic.call(tokenCanister.icrc2_transfer_from, {
            args: [{ to: { owner: ic.caller(), subaccount: None }, fee: None, spender_subaccount: None, from: { owner: ic.id(), subaccount: None }, memo: None, created_at_time: None, amount: insert * 95n / 100n }]
        })

        if ('Ok' in token_result)
            return true;
        else
            return false;
    }),


    TokenToLedger: update([nat], bool, async (amount) => {

        if(amount > Balance)
            return false;
        Balance -= amount;
        await ic.call(ledgerCanister.icrc1_transfer, {
            args: [{ to: { owner: ic.caller(), subaccount: None }, fee: None, memo: None, from_subaccount: None, created_at_time: None, amount: amount * 95n / 100n }]
        }).catch(e => console.log(e.toString()));


        const token_result = await ic.call(tokenCanister.icrc2_transfer_from, {
            args: [{ to: { owner: ic.id(), subaccount: None }, fee: None, spender_subaccount: None, from: { owner: ic.caller(), subaccount: None }, memo: None, created_at_time: None, amount }]
        })

        if ('Ok' in token_result)
            return true;
        else
            return false;
    })

});