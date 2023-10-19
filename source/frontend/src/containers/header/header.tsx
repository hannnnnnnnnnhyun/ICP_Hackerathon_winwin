import HeaderConnect from "@container/header/header.connect";
import {Link, useLocation} from "react-router-dom";
import useScript from "@helper/useScript.tsx";

const HeaderContainer = () => {
    useScript("/assets/js/theme.bundle.min.js");
    const {pathname} = useLocation();
    return (
        <header className="z-fixed header-absolute-top header-transparent sticky-reverse">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container position-relative">
                    <a className="navbar-brand " href="index.html">
                        <img src="/assets/img/logo/icp.png" alt="" className="img-fluid navbar-brand-light w-50"/>
                        <img src="/assets/img/logo/icp.png" alt="" className="img-fluid navbar-brand-dark w-50"/>
                        <sub className="d-none d-sm-inline-block position-absolute end-0 bottom-0 me-n2 mb-1 ">ICP HACKERTON</sub>
                    </a>
                    <HeaderConnect />
                    <div className="collapse navbar-collapse" id="mainNavbarTheme">
                        <ul className="navbar-nav me-lg-3 ms-lg-auto">
                            <li className="nav-item">
                                <Link to={"/detail"} className={!pathname.includes('create') ? "nav-link active" : 'nav-link'}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/create"} className={pathname.includes('create') ? "nav-link active" : 'nav-link' }>Create</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default HeaderContainer;