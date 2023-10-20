import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'getNftByOwner' : ActorMethod<
    [Principal],
    Array<
      {
        'id' : number,
        'owner' : Principal,
        'metadata' : {
          'name' : string,
          'description' : string,
          'attributes' : {
            'name' : string,
            'category' : string,
            'price' : string,
            'location' : string,
          },
          'image' : Uint8Array | number[],
        },
      }
    >
  >,
  'getOwnerCount' : ActorMethod<[Principal], number>,
  'getTokenId' : ActorMethod<
    [number],
    [] | [
      {
        'id' : number,
        'owner' : Principal,
        'metadata' : {
          'name' : string,
          'description' : string,
          'attributes' : {
            'name' : string,
            'category' : string,
            'price' : string,
            'location' : string,
          },
          'image' : Uint8Array | number[],
        },
      }
    ]
  >,
  'getTokenIdByOwner' : ActorMethod<[Principal], Int32Array | number[]>,
  'mint' : ActorMethod<
    [
      {
        'id' : number,
        'owner' : Principal,
        'metadata' : {
          'name' : string,
          'description' : string,
          'attributes' : {
            'name' : string,
            'category' : string,
            'price' : string,
            'location' : string,
          },
          'image' : Uint8Array | number[],
        },
      },
      string,
    ],
    number
  >,
}
