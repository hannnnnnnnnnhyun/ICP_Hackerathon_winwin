import { Actor, HttpAgent, ActorSubclass } from '@dfinity/agent';
import { AuthClient } from "@dfinity/auth-client";
import { _SERVICE } from "../../declarations/betting/betting.did";
import { createActor, canisterId } from "../../declarations/betting";

export namespace BettingActor {
    var authClient: AuthClient;
    var identity: any;
    export async function setAuthClient(ac: AuthClient) {
      authClient = ac;
    }
    export async function getBettingActor(): Promise<ActorSubclass<_SERVICE>> {
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