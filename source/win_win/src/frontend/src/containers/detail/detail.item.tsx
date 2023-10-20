import {Transaction} from "@type/data/transaction.type";
import React from "react";
import {convertImage} from "@helper/converter";
import {useDispatch, useSelector} from "react-redux";
import { onChangeTransactionAction, onToggleFinishModalAction } from "@action/modal.action";

const DetailItem = (prop: { transaction: Transaction }) => {
    const dispatch = useDispatch();
    const {transaction} = prop;

    const onClickItem = () => {
        dispatch(onChangeTransactionAction(transaction));
        dispatch(onToggleFinishModalAction());
    }

    return (
        <div className="col-md-6 col-lg-6">
            <div className="card rounded-3 mb-5" data-aos="fade-up" onClick={() => onClickItem()}>
                <div className="mb-0 p-2 pb-0">
                    <span className="d-block overflow-hidden rounded-3"
                       data-bs-toggle="modal" aria-expanded="false">
                        <img src={convertImage(transaction.pic)} className="img-fluid"
                             style={{height: '280px', width: "100%"}} alt=""/>
                    </span>
                </div>
                <div className="card-body overflow-hidden p-4 px-lg-5 flex-grow-1">
                    <p className="mb-2 mb-lg-2 text-truncate">{transaction.challenger.toString()}</p>
                </div>
            </div>
        </div>
    )
}

export default DetailItem;