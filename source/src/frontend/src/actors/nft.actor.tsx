import { Actor, HttpAgent, ActorSubclass } from '@dfinity/agent';
import { AuthClient } from "@dfinity/auth-client";
import { _SERVICE } from "../../declarations/nft/nft.did";
import { createActor, canisterId } from "../../declarations/nft";

export namespace NFTActor {
    var authClient: AuthClient;
    var identity: any;
    export async function setAuthClient(ac: AuthClient) {
      authClient = ac;
    }
    export async function getNFTActor(): Promise<ActorSubclass<_SERVICE>> {
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