import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'createEvent' : ActorMethod<
    [
      {
        'id' : Principal,
        'creator' : Principal,
        'logo' : Uint8Array | number[],
        'name' : string,
        'state' : string,
        'category' : string,
        'transactions' : Array<
          {
            'id' : Principal,
            'pic' : Uint8Array | number[],
            'pick' : boolean,
            'challenger' : Principal,
          }
        >,
        'price' : bigint,
        'location' : string,
      },
    ],
    boolean
  >,
  'createTransaction' : ActorMethod<
    [
      Principal,
      {
        'id' : Principal,
        'pic' : Uint8Array | number[],
        'pick' : boolean,
        'challenger' : Principal,
      },
    ],
    boolean
  >,
  'exitEvent' : ActorMethod<
    [
      Principal,
      [] | [
        {
          'id' : Principal,
          'pic' : Uint8Array | number[],
          'pick' : boolean,
          'challenger' : Principal,
        }
      ],
    ],
    boolean
  >,
  'getAllEvents' : ActorMethod<
    [],
    Array<
      {
        'id' : Principal,
        'creator' : Principal,
        'logo' : Uint8Array | number[],
        'name' : string,
        'state' : string,
        'category' : string,
        'transactions' : Array<
          {
            'id' : Principal,
            'pic' : Uint8Array | number[],
            'pick' : boolean,
            'challenger' : Principal,
          }
        >,
        'price' : bigint,
        'location' : string,
      }
    >
  >,
  'getAllTransactions' : ActorMethod<
    [Principal],
    Array<
      {
        'id' : Principal,
        'pic' : Uint8Array | number[],
        'pick' : boolean,
        'challenger' : Principal,
      }
    >
  >,
  'getBettingId' : ActorMethod<[], string>,
  'getEvent' : ActorMethod<
    [Principal],
    [] | [
      {
        'id' : Principal,
        'creator' : Principal,
        'logo' : Uint8Array | number[],
        'name' : string,
        'state' : string,
        'category' : string,
        'transactions' : Array<
          {
            'id' : Principal,
            'pic' : Uint8Array | number[],
            'pick' : boolean,
            'challenger' : Principal,
          }
        >,
        'price' : bigint,
        'location' : string,
      }
    ]
  >,
  'getEventByUser' : ActorMethod<
    [Principal],
    Array<
      {
        'id' : Principal,
        'creator' : Principal,
        'logo' : Uint8Array | number[],
        'name' : string,
        'state' : string,
        'category' : string,
        'transactions' : Array<
          {
            'id' : Principal,
            'pic' : Uint8Array | number[],
            'pick' : boolean,
            'challenger' : Principal,
          }
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
        'logo' : Uint8Array | number[],
        'name' : string,
        'state' : string,
        'category' : string,
        'transactions' : Array<
          {
            'id' : Principal,
            'pic' : Uint8Array | number[],
            'pick' : boolean,
            'challenger' : Principal,
          }
        >,
        'price' : bigint,
        'location' : string,
      }
    >
  >,
  'getTransactions' : ActorMethod<
    [Principal, number, number],
    Array<
      {
        'id' : Principal,
        'pic' : Uint8Array | number[],
        'pick' : boolean,
        'challenger' : Principal,
      }
    >
  >,
  'insertBet' : ActorMethod<[Principal, Principal], string>,
  'startBetting' : ActorMethod<[Principal], string>,
}
