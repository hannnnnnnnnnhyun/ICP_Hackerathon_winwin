import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'LedgerToToken' : ActorMethod<[], boolean>,
  'TokenToLedger' : ActorMethod<[bigint], boolean>,
  'get' : ActorMethod<[], bigint>,
}
