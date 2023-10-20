import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'createBetting' : ActorMethod<
    [Principal],
    {
      'id' : Principal,
      'bets' : Array<{ 'id' : Principal, 'users' : Array<Principal> }>,
      'finish' : boolean,
      'totalAmount' : bigint,
    }
  >,
  'insertBet' : ActorMethod<[Principal, Principal], boolean>,
}
