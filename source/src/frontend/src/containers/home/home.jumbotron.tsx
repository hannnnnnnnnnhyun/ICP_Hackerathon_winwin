import React from "react";

const HomeJumbotronComponent = () => {
    return (
        <section className="position-relative overflow-hidden bg-shade-primary jarallax" data-speed=".2">
            <img src="/assets/img/background/bg8.jpeg" alt="" className="jarallax-img"/>
            <div className="bg-dark opacity-50 position-absolute start-0 top-0 w-100 h-100"></div>
            <svg className="position-absolute start-0 bottom-0" style={{color: 'var(--bs-body-bg)'}}
                 preserveAspectRatio="none" width={"100%"}
                 height={64} viewBox={"0 0 1460 120"} fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M122 22.8261L0 0V120H1460V0L1338 22.8261C1217 44.1304 973 88.2609 730 88.2609C487 88.2609 243 44.1304 122 22.8261Z"
                    fill="currentColor"/>
            </svg>
            <div className="container pt-12 pb-12 position-relative z-1">
                <div className="row pt-lg-12 pb-12 pb-lg-15">
                    <div className="col-xl-10 mx-auto text-center text-white" data-aos data-aos-delay="100"
                         data-aos-mirror="true" data-aos-once="false">
                        <h1 className="splitting-up display-1 mb-lg-4 mb-0" data-splitting>
                            <span className="text-warning">Win-Win</span><br/>
                            사장님은 매장을 홍보하고
                            <br/>이용자는 보상을 받고
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeJumbotronComponent;