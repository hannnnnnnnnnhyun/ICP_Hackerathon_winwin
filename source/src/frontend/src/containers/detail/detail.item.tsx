import {Transaction} from "@type/data/transaction.type";
import React from "react";
import {convertImage} from "@helper/converter";
import {useDispatch, useSelector} from "react-redux";
import { onChangeTransactionAction, onToggleFinishModalAction } from "@action/modal.action";
import { RootState } from "@reducer/root.reducer";

const DetailItem = (prop: { transaction: Transaction }) => {
    const dispatch = useDispatch();
    const { principal } = useSelector((root: RootState) => root.HeaderReducer);
    const { event } = useSelector((root: RootState) => root.DetailReducer);
    const {transaction} = prop;

    const onClickItem = () => {
        if (principal !== event.creator.toText() || event.state !== 'betting' || transaction.pick === true) 
            return;
        dispatch(onChangeTransactionAction(transaction));
        dispatch(onToggleFinishModalAction());
    }

    const getPickIcon = () => {
        if (transaction.pick === true)
            return <i className="bx bxs-check-circle me-1" style={{position: "absolute"}}></i>
    }

    return (
        <div className="col-md-6 col-lg-6">
            <div className="card rounded-3 mb-5" data-aos="fade-up" onClick={() => onClickItem()}>
                <div className="mb-0 p-2 pb-0">
                    <span className="d-block overflow-hidden rounded-3">
                        {getPickIcon()}
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