import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'bet' : ActorMethod<[Principal, Principal], boolean>,
  'createBetting' : ActorMethod<
    [Principal],
    {
      'id' : Principal,
      'bets' : Array<{ 'id' : Principal, 'users' : Array<Principal> }>,
      'finish' : boolean,
      'totalAmount' : bigint,
    }
  >,
  'exitBetting' : ActorMethod<[Principal], boolean>,
  'insertBet' : ActorMethod<
    [Principal, Principal],
    {
      'id' : Principal,
      'bets' : Array<{ 'id' : Principal, 'users' : Array<Principal> }>,
      'finish' : boolean,
      'totalAmount' : bigint,
    }
  >,
}
