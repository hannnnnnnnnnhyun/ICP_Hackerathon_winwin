import { createAction } from "typesafe-actions";
import { NFT } from "@type/data/nft.type";

export const ON_PUSH_NFT = "profile/ON_PUSH_NFT" as const;

export const onPushNftAction = createAction(ON_PUSH_NFT)<NFT>();