import React from 'react';
import { AssignmentInd } from '@mui/icons-material';
import { AuthClient } from "@dfinity/auth-client"
import { EventActor } from "@actor/event.actor";
import {useDispatch} from "react-redux";
import {onAuthUserAction} from "@action/header.action"
import { useSelector } from "react-redux";
import {RootState} from "@reducer/root.reducer.tsx";
import { Principal } from '@dfinity/principal';
import { useEffect } from 'react';

const HeaderConnectComponent = () => {
    const dispatch = useDispatch();
    const [principal, setPrincipal] = React.useState<string>('');

    const onConnect = async () => {
        const authClient = await AuthClient.create({
            idleOptions: {
                disableIdle: true
            }
        })
        await authClient.login({
            identityProvider: `http://${process.env.INTERNET_IDENTITY_CANISTER_ID}.localhost:8321/#authorize`,
            onSuccess: () => dispatch(onAuthUserAction(authClient.getIdentity().getPrincipal().toString())),
        });
    }
    
    const onDisconnect = async () => {
        const authClient = await AuthClient.create();
        await authClient.logout();
        dispatch(onAuthUserAction(undefined));
    }

    const getPrincipal = async () => {
        const authClient = await AuthClient.create();
        const isAuth = await authClient.isAuthenticated();
        if (isAuth) {
            setPrincipal(authClient.getIdentity().getPrincipal().toString());
        }
    }

    useEffect(() => {
        getPrincipal();
    },[localStorage.getItem('ic-delegation')])


    return (
        <div className="d-flex align-items-center navbar-no-collapse-items order-lg-last">
            {
                localStorage.getItem('ic-delegation')
                ?   <li className="nav-item dropdown">
                        <span className="btn btn-sm btn-primary py-1 px-3dropdown-toggle" data-bs-toggle="dropdown" ><i className="bx bxs-user-circle me-1"></i>{principal.split('-')[0]}</span>
                        <div className="dropdown-menu">
                            <span className="dropdown-item" onClick={() => onDisconnect()} style={{cursor: 'pointer'}}>로그아웃</span>
                        </div>
                    </li>
                :   <div className="nav-item btn-group me-2 me-lg-0" onClick={() => onConnect()} style={{cursor: 'pointer'}}>
                        <span className="btn btn-sm btn-primary py-1 px-3"><i className="bx bxs-user-circle me-1"></i>Connect</span>
                    </div>
            }
        </div>
    )
}

export default HeaderConnectComponent;