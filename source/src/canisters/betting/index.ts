import { Canister, query, StableBTreeMap, text, update, Record, Vec, bool, Principal, Opt, nat, nat8, nat64, ic, Variant, int32, None, Null, blob } from 'azle';
import { Challenge, Bet, Betting } from "../types";


let bettings = StableBTreeMap(Principal, Betting, 0);
let users = StableBTreeMap(Principal, Vec(Betting), 1);
const amount = 10n;

export default Canister({
    
    createBetting: update([Principal, Vec(Bet)], bool, (eventId, bets) => {
        const caller = ic.caller();
        const userOpt = users.get(caller);
        const new_betting: typeof Betting = {
            id: eventId, finish: false, totalAmount: 0n, bets
        }
        bettings.insert(eventId, new_betting)
        if('None' in userOpt)
            users.insert(caller, [new_betting]);
        else{
            const user = userOpt.Some;
            users.insert(caller, [...user, new_betting])
        }

        return true;
    }),

    // bet: update([Principal, Principal], bool, (bettingId, txId) => {
    //     const caller = ic.caller();
    //     const bettingOpt = bettings.get(bettingId);
    //     if('None' in bettingOpt)
    //         return false;
    //     const betting = bettingOpt.Some;
    //     const bets = betting.bets;
    //     let new_betUsers: Principal[];
    //     for(let i = 0; i < 5; i++) {
    //         if(bets[i].id === txId)
    //             new_betUsers = [...bets[i].users, caller];
    //     }
    //     const new_betting: typeof Betting = {
    //         id: betting.id, finish: false, totalAmount: betting.totalAmount + amount, bets: new_betUsers
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