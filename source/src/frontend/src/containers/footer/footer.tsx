import React from "react";

const FooterContainer = () => {
    return (
        <footer id="footer" className="bg-dark footer position-relative" data-bs-theme="dark">
            <div className="container pt-9 pt-lg-11">
                <div className="row">
                    <div className="col-md-12 col-lg-4 mb-5 h-100 me-auto">
                        <h2 className="display-6 text-white mb-0 position-relative">Work with us</h2>
                        <div className="pt-3">
                            <a className="link-underline link-light fs-6" href="https://jervis.kr">https://jervis.kr</a>
                            <a className="link-underline link-light fs-6" href="https://github.com/hannnnnnnnnnhyun/ICP_Hackerathon_winwin">https://github.com/hannnnnnnnnnhyun/ICP_Hackerathon_winwin</a>
                        </div>
                    </div>
                    <div className="col-sm-4 col-lg-2 mb-5 mb-md-0 ms-auto h-100">
                        <h6 className="small mb-3 mb-lg-4 text-white-50">Team</h6>
                        <ul className="nav flex-column mb-0">
                            <li className="nav-item"><span className="nav-link">한 현</span></li>
                            <li className="nav-item"><span className="nav-link">이형기</span></li>
                            <li className="nav-item"><span className="nav-link">채현영</span></li>
                        </ul>
                    </div>
                    <div className="col-sm-4 col-lg-2 mb-5 h-100">
                        <h6 className="small mb-3 mb-lg-4 text-white-50">Tech</h6>
                        <ul className="nav flex-column mb-0">
                            <li className="nav-item"><span className="nav-link">ICP</span></li>
                            <li className="nav-item"><span className="nav-link">Azle</span></li>
                            <li className="nav-item"><span className="nav-link">Vite</span></li>
                            <li className="nav-item"><span className="nav-link">React</span></li>
                            <li className="nav-item"><span className="nav-link">Typescript</span></li>
                        </ul>
                    </div>
                </div>
                <hr className="mb-5 mt-0 text-white"/>
            </div>
            <div className="pb-5">
                <div className="container">
                    <div className="row justify-content-md-between align-items-center">
                        <div className="d-flex mb-3 mb-md-0 col-sm-6 col-md-4">
                        </div>
                        <div className="col-sm-6 col-md-4 text-sm-end">
                        <span className="d-block lh-sm small text-white-50">© Copyright{new Date().getFullYear()}. Assan</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default FooterContainer;