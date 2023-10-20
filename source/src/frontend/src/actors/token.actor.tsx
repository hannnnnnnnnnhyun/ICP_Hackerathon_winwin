import { Actor, HttpAgent, ActorSubclass } from '@dfinity/agent';
import { AuthClient } from "@dfinity/auth-client";
import { _SERVICE } from "../../declarations/icrc1_ledger_canister/icrc1_ledger_canister.did";
import { createActor, canisterId } from "../../declarations/icrc1_ledger_canister";

export namespace TokenActor {
    var authClient: AuthClient;
    var identity: any;
    export async function setAuthClient(ac: AuthClient) {
      authClient = ac;
    }
    export async function getTokenActor(): Promise<ActorSubclass<_SERVICE>> {
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