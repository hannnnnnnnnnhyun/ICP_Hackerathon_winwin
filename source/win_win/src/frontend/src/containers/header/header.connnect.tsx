import * as React from 'react';
import { AssignmentInd } from '@mui/icons-material';
import { AuthClient } from "@dfinity/auth-client"
import { BackendActor } from "@actor/backend.actor";
import {useDispatch} from "react-redux";
import {onAuthUserAction} from "@action/header.action"
import { useSelector } from "react-redux";
import {RootState} from "@reducer/root.reducer.tsx";
import { Principal } from '@dfinity/principal';

const HeaderConnectComponent = () => {
    const dispatch = useDispatch();
    const { authClient } = useSelector((root: RootState) => root.HeaderReducer);

    const onConnect = async () => {
        const authClient = await AuthClient.create()
        await authClient.login({
        identityProvider: `http://${process.env.INTERNET_IDENTITY_CANISTER_ID}.localhost:8321/#authorize`,
        onSuccess: () => console.log("Logged in!"),
        });
        const isAuth =  await authClient.isAuthenticated();
        console.log('authClient: ', authClient)
        const auth = await BackendActor.setAuthClient(authClient);
        console.log("isAuth: ", isAuth);
        const actor = await BackendActor.getBackendActor();
        console.log("actor: ", actor);
        console.log("Identity: ", BackendActor.getIdentity().getPrincipal().toString());
        console.log("Connected!")
        console.log("identity: ", authClient.getIdentity().getPrincipal().toString());
        dispatch(onAuthUserAction(authClient));
    }

    return (
        <div className="d-flex align-items-center navbar-no-collapse-items order-lg-last">
            {
                authClient 
                ?   <div className="nav-item btn-group me-2 me-lg-0" style={{cursor: "none"}}>
                        <span className="btn btn-sm btn-primary py-1 px-3"><i className="bx bxs-user-circle me-1"></i>{(authClient as AuthClient)?.getIdentity().getPrincipal().toString().split('-')[0]}</span>
                    </div>
                :   <div className="nav-item btn-group me-2 me-lg-0" onClick={() => onConnect()}>
                        <span className="btn btn-sm btn-primary py-1 px-3"><i className="bx bxs-user-circle me-1"></i>Connect</span>
                    </div>
            }
            
            <button className="navbar-toggler order-last" type="button" data-bs-toggle="collapse"
                    data-bs-target="#mainNavbarTheme" aria-controls="mainNavbarTheme" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">
                      <i></i>
                    </span>
            </button>
        </div>
    )
}

export default HeaderConnectComponent;