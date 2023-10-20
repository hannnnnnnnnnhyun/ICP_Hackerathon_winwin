import { createReducer } from "typesafe-actions";
import { ProfileState, ProfileActions } from "../types/profile.type";
import { ON_PUSH_NFT } from "../actions/profile.action";

const initialState: ProfileState = {
    nfts: []
};

const ProfileReducer = createReducer<ProfileState, ProfileActions>(initialState, {
    [ON_PUSH_NFT]: (state, action) => ({
        ...state,
        nfts: [...state.nfts, action.payload]
    })
});

export default ProfileReducer;