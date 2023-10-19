import {Transaction} from "@type/data/transaction.type";
import React from "react";

const DetailItem = (prop: { transaction: Transaction }) => {
    const {transaction} = prop;
    return (
        <div className="col-md-6 col-lg-6">
            <div className="card rounded-3 mb-5" data-aos="fade-up">
                <div className="mb-0 p-2 pb-0">
                    <a href="#modalNewsletter" className="d-block overflow-hidden rounded-3"
                       data-bs-toggle="modal" aria-expanded="false">
                        <img src={transaction.pic} className="img-fluid"
                             style={{height: '280px'}} alt=""/>
                    </a>
                </div>
                <div className="card-body overflow-hidden p-4 px-lg-5 flex-grow-1">
                    <p className="mb-2 mb-lg-2 text-truncate">{transaction.challenger}</p>
                </div>
            </div>
        </div>
    )
}

export default DetailItem;