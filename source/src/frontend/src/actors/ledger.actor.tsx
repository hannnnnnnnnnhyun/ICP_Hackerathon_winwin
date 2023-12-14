import { Actor, HttpAgent, ActorSubclass } from '@dfinity/agent';
import { AuthClient } from "@dfinity/auth-client";
import { _SERVICE } from "../../declarations/ledger_canister/ledger_canister.did";
import { createActor, canisterId } from "../../declarations/ledger_canister";

export namespace LedgerActor {
    var authClient: AuthClient;
    var identity: any;
    export async function setAuthClient(ac: AuthClient) {
      authClient = ac;
    }
    export async function getLedgerActor(): Promise<ActorSubclass<_SERVICE>> {
      if (!authClient) {
        authClient = await AuthClient.create();
      }
      identity = authClient.getIdentity();
  
      const EventActor = createActor(canisterId as string, {
        agentOptions: {
          identity, 
        }
      });
    
      return EventActor;
    }
  
    export const getIdentity = () => identity;
  };