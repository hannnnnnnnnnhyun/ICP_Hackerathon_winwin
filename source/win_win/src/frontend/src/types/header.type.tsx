import { Principal } from '@dfinity/principal';
import * as actions from '@action/header.action';
import {ActionType} from "typesafe-actions";
import { AuthClient } from "@dfinity/auth-client";

export type HeaderState = {
    authClient?: AuthClient
}

export type HeaderAction = ActionType<typeof actions>;
