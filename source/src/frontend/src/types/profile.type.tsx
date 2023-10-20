import { NFT } from "@type/data/nft.type";
import * as actions from "@action/profile.action"
import {ActionType} from "typesafe-actions";

export type ProfileState = {
    nfts: Array<NFT>;
}

export type ProfileActions = ActionType<typeof actions>;