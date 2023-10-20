import * as React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import HeaderConnect from "./header.connnect";
import useScript from "@helper/useScript";
import {useSelector} from "react-redux";
import {RootState} from "@reducer/root.reducer";
import { useDispatch } from "react-redux";
import { onChangeNoticeMessageAction, onToggleNoticeModalAction } from "@action/modal.action";
import { AuthClient } from "@dfinity/auth-client";
import { onAuthUserAction } from "@action/header.action";

const HeaderContainer = () => {
    useScript("/assets/js/theme.bundle.min.js");
    const dispatch = useDispatch();
    const navi = useNavigate();
    const {pathname} = useLocation();
    const { principal } = useSelector((root: RootState) => root.HeaderReducer);

    const onClickCreate = () => {
        if (principal) 
            navi('/create');
        else {
            dispatch(onChangeNoticeMessageAction('로그인 후 이용 가능합니다.'));
            dispatch(onToggleNoticeModalAction());
        }
    }

    const getPrincipal = async () => {
        const authClient = await AuthClient.create();
        const identity = authClient.getIdentity();
        if (identity) {
            const principal = identity.getPrincipal();
            dispatch(onAuthUserAction(principal.toString()));
        }
    }

    React.useEffect(() => {

    }, []);

    return (
        <header className="z-fixed header-absolute-top header-transparent sticky-reverse">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container position-relative">
                    <Link className="navbar-brand " to="/">
                        <img src="/assets/img/logo/icp.png" alt="" className="img-fluid navbar-brand-light w-50"/>
                        <img src="/assets/img/logo/icp.png" alt="" className="img-fluid navbar-brand-dark w-50"/>
                        <sub className="d-none d-sm-inline-block position-absolute end-0 bottom-0 me-n2 mb-1 ">ICP HACKERTON</sub>
                    </Link>
                    <HeaderConnect />
                    <div className="collapse navbar-collapse" id="mainNavbarTheme">
                        <ul className="navbar-nav me-lg-3 ms-lg-auto">
                            <li className="nav-item">
                                <Link to={"/detail"} className={!pathname.includes('create') ? "nav-link active" : 'nav-link'}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <span onClick={() => onClickCreate()} className={pathname.includes('create') ? "nav-link active" : 'nav-link' }>Create</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default HeaderContainer;