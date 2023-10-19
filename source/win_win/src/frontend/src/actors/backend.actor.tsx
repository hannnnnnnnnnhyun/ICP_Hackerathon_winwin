import { Actor, HttpAgent, ActorSubclass } from '@dfinity/agent';
import { AuthClient } from "@dfinity/auth-client";
import { _SERVICE } from "../../declarations/backend/backend.did";
import { createActor, canisterId } from "../../declarations/backend";

export namespace BackendActor {
    var authClient: AuthClient;
    var identity: any;
    export async function setAuthClient(ac: AuthClient) {
      authClient = ac;
    }
    export async function getBackendActor(): Promise<ActorSubclass<_SERVICE>> {
      if (!authClient) {
        authClient = await AuthClient.create();
      }
      identity = authClient.getIdentity();
  
      const backendActor = createActor(canisterId as string, {
        agentOptions: {
          identity, 
        }
      });
    
      return backendActor;
    }
  
    export const getIdentity = () => identity;
  };