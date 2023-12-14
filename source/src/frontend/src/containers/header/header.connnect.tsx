import React from 'react';
import { AssignmentInd } from '@mui/icons-material';
import { AuthClient } from "@dfinity/auth-client"
import { EventActor } from "@actor/event.actor";
import {useDispatch} from "react-redux";
import {onAuthUserAction, onUpdateNFTBalanceAction, onUpdateTokenBalanceAction} from "@action/header.action"
import { useSelector } from "react-redux";
import {RootState} from "@reducer/root.reducer.tsx";
import { Principal } from '@dfinity/principal';
import { useEffect } from 'react';
import { TokenActor } from '@actor/token.actor';
import { NFTActor } from '@actor/nft.actor';
import { useNavigate } from 'react-router';

const HeaderConnectComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [principal, setPrincipal] = React.useState<string>('');
    const { tokenBalance, nftBalance } = useSelector((root: RootState) => root.HeaderReducer);

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
            console.log('principal: ', authClient.getIdentity().getPrincipal().toString());
            const tokenActor = await TokenActor.getTokenActor();
            const balance = await tokenActor.icrc1_balance_of({owner: authClient.getIdentity().getPrincipal(), subaccount: []});
            const nftActor = await NFTActor.getNFTActor();
            const nftBalance = await nftActor.getOwnerCount(authClient.getIdentity().getPrincipal());
            dispatch(onUpdateTokenBalanceAction((balance/100000000n).toLocaleString('ko-KR')));
            dispatch(onUpdateNFTBalanceAction(nftBalance.toLocaleString('ko-KR')));
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
                            <div className="dropdown-header d-flex align-items-center justify-content-between pb-3">
                                <span>Balance</span>
                            </div>
                            <span className="dropdown-item py-3" onClick={() => navigate('/profile')}>
                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        <span
                                            className="avatar rounded-circle bg-primary text-white lh-1 d-flex align-items-center justify-content-center">
                                            <i className="bx bxs-dollar-circle"></i>
                                        </span>
                                    </div>
                                    <div className="overflow-hidden">
                                        <span className="mb-0 lh-sm d-block small text-truncate">{tokenBalance}</span>
                                        <small className="text-body-tertiary">Mart</small>
                                    </div>
                                </div>
                            </span>
                            <span className="dropdown-item py-3" onClick={() => navigate('/profile')}>
                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        <span
                                            className="avatar rounded-circle bg-warning text-white lh-1 d-flex align-items-center justify-content-center">
                                            <i className="bx bxs-happy"></i>
                                        </span>
                                    </div>
                                    <div className="overflow-hidden">
                                        <span className="mb-0 lh-sm d-block small text-truncate">{nftBalance}</span>
                                        <small className="text-body-tertiary">NFTs</small>
                                    </div>
                                </div>
                            </span>
                            <div className="dropdown-divider"></div>
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