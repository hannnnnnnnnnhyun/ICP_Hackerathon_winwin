import * as actions from '@action/header.action';
import {ActionType} from "typesafe-actions";
import { AuthClient } from "@dfinity/auth-client";

export type HeaderState = {
    principal?: string;
    tokenBalance?: string;
    nftBalance?: string;
}

export type HeaderAction = ActionType<typeof actions>;
