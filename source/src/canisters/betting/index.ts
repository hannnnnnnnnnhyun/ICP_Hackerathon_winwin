import { Canister, query, StableBTreeMap, text, update, Record, Vec, bool, Principal, Opt, nat, nat8, nat64, ic, Variant, int32, None, Null, blob } from 'azle';
import { Challenge, Bet, Betting } from "../types";


let bettings = StableBTreeMap(Principal, Betting, 0);
const amount = 10n;

export default Canister({
    
    createBetting: update([Principal], Betting, (eventId) => {
        const caller = ic.caller();
        const new_betting: typeof Betting = {
            id: eventId, finish: false, totalAmount: 0n, bets: []
        }
        bettings.insert(eventId, new_betting)
        return new_betting;
    }),

    insertBet: update([Principal, Principal], bool, (eventId, txId) => {
        const bettingOpt = bettings.get(eventId);
        if('None' in bettingOpt)
            return false;

        const betting = bettingOpt.Some;
        const new_bet: typeof Bet = {
            id: txId, users: []
        };
        const new_betting: typeof Betting = {
            id: betting.id, finish: false, totalAmount: betting.totalAmount, bets: [...betting.bets, new_bet]
        }
        bettings.insert(eventId, new_betting);
        return true;
    })

    // bet: update([Principal, Principal], bool, (bettingId, txId) => {
    //     const caller = ic.caller();
    //     const bettingOpt = bettings.get(bettingId);
    //     if('None' in bettingOpt)
    //         return false;
    //     const betting = bettingOpt.Some;
    //     const bets = betting.bets;

    //     let betUsers: Principal[]
    //     for(let i = 0; i < bets.length; i++) {
    //         if(bets[i].id === txId)
    //             betUsers = bets[i].users;
    //     }
    
    //     const new_betting: typeof Betting = {
    //         id: betting.id, finish: false, totalAmount: betting.totalAmount + amount, bets: [..., caller]
    //     }
    //     return true;
    // })
})

function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}