import {createAction} from "typesafe-actions";
import { AuthClient } from "@dfinity/auth-client"

export const ON_AUTH_USER = "header/ON_AUTH_USER" as const;
export const ON_UPDATE_TOKEN_BALANCE = "header/ON_UPDATE_TOKEN_BALANCE" as const;
export const ON_UPDATE_NFT_BALANCE = "header/ON_UPDATE_NFT_BALANCE" as const;

export const onAuthUserAction = createAction(ON_AUTH_USER)<string|undefined>();
export const onUpdateTokenBalanceAction = createAction(ON_UPDATE_TOKEN_BALANCE)<string>();
export const onUpdateNFTBalanceAction = createAction(ON_UPDATE_NFT_BALANCE)<string>();