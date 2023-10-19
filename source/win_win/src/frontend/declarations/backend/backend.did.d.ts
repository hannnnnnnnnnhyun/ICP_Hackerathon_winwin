import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'createEvent' : ActorMethod<
    [
      {
        'id' : Principal,
        'creator' : Principal,
        'logo' : string,
        'name' : string,
        'finish' : boolean,
        'category' : string,
        'transactions' : Array<
          { 'id' : Principal, 'pic' : string, 'challenger' : Principal }
        >,
        'price' : bigint,
        'location' : string,
      },
    ],
    boolean
  >,
  'createTransaction' : ActorMethod<
    [Principal, { 'id' : Principal, 'pic' : string, 'challenger' : Principal }],
    boolean
  >,
  'exitEvent' : ActorMethod<
    [
      Principal,
      [] | [{ 'id' : Principal, 'pic' : string, 'challenger' : Principal }],
    ],
    boolean
  >,
  'getAllEvents' : ActorMethod<
    [],
    Array<
      {
        'id' : Principal,
        'creator' : Principal,
        'logo' : string,
        'name' : string,
        'finish' : boolean,
        'category' : string,
        'transactions' : Array<
          { 'id' : Principal, 'pic' : string, 'challenger' : Principal }
        >,
        'price' : bigint,
        'location' : string,
      }
    >
  >,
  'getAllTransactions' : ActorMethod<
    [Principal],
    Array<{ 'id' : Principal, 'pic' : string, 'challenger' : Principal }>
  >,
  'getEventByUser' : ActorMethod<
    [Principal],
    Array<
      {
        'id' : Principal,
        'creator' : Principal,
        'logo' : string,
        'name' : string,
        'finish' : boolean,
        'category' : string,
        'transactions' : Array<
          { 'id' : Principal, 'pic' : string, 'challenger' : Principal }
        >,
        'price' : bigint,
        'location' : string,
      }
    >
  >,
  'getEvents' : ActorMethod<
    [number, number],
    Array<
      {
        'id' : Principal,
        'creator' : Principal,
        'logo' : string,
        'name' : string,
        'finish' : boolean,
        'category' : string,
        'transactions' : Array<
          { 'id' : Principal, 'pic' : string, 'challenger' : Principal }
        >,
        'price' : bigint,
        'location' : string,
      }
    >
  >,
  'getTransactions' : ActorMethod<
    [Principal, number, number],
    Array<{ 'id' : Principal, 'pic' : string, 'challenger' : Principal }>
  >,
}
