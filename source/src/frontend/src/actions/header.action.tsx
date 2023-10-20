import {createAction} from "typesafe-actions";
import { AuthClient } from "@dfinity/auth-client"

export const ON_AUTH_USER = "header/ON_AUTH_USER" as const;

export const onAuthUserAction = createAction(ON_AUTH_USER)<string|undefined>();