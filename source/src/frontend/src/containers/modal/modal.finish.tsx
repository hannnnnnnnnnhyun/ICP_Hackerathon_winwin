import React from "react";
import {Modal, ModalBody} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {onChangeNoticeMessageAction, onToggleFinishModalAction, onToggleLoadingModalAction, onToggleNoticeModalAction} from "@action/modal.action.tsx";
import {RootState} from "@reducer/root.reducer.tsx";
import {useEffect, useRef, useState} from "react";
import { EventActor } from "@actor/event.actor";
import { convertImage } from "@helper/converter";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";
import {AddTaskRounded} from "@mui/icons-material";
import {TokenActor} from "@actor/token.actor";
import { canisterId as eventId } from "../../../declarations/event"
import { BettingActor } from "@actor/betting.actor";


const ModalFinish = () => {
    const dispatch = useDispatch();
    const { isOpenFinishModal, transaction, eventState } = useSelector((root: RootState) => root.ModalReducer);
    const { event } = useSelector((root: RootState) => root.DetailReducer);
    const { principal } = useSelector((root: RootState) => root.HeaderReducer);

    const onClickBetting = async () => {
        dispatch(onToggleLoadingModalAction(true));
        dispatch(onToggleFinishModalAction());
        let result = false;
        try {
            const authClient = await AuthClient.create();
            const tokenActor = await TokenActor.getTokenActor();
            let allowance = await tokenActor.icrc2_allowance({account: {owner: authClient.getIdentity().getPrincipal(), subaccount: []}, spender: {owner: Principal.fromText(eventId), subaccount: []}})
            console.log('allowance: ', allowance.allowance);
            await tokenActor.icrc2_approve({
                amount: 10n,
                spender: {owner: Principal.fromText(eventId), subaccount: []},
                fee: [],
                memo: [],
                from_subaccount: [],
                created_at_time: [],
                expected_allowance: [],
                expires_at: []
            })
            console.log('allowance: ', await tokenActor.icrc2_allowance({account: {owner: authClient.getIdentity().getPrincipal(), subaccount: []}, spender: {owner: Principal.fromText(eventId), subaccount: []}}));
            const bettingActor = await BettingActor.getBettingActor();
            result = await bettingActor.bet(event.id, transaction.id);
            console.log('result: ', result);
        } catch (e) {
            console.log('e: ', e);
        }
       
        if (!result) {
            dispatch(onChangeNoticeMessageAction('배팅에 실패했습니다.\n다시 시도해주세요.'));
            dispatch(onToggleNoticeModalAction());
        } else {
            dispatch(onChangeNoticeMessageAction('배팅에 성공했습니다.'));
            dispatch(onToggleNoticeModalAction());
        }
        dispatch(onToggleLoadingModalAction(false));
        window.location.reload();
    }

    const onClickInsert = async () => {
        dispatch(onToggleLoadingModalAction(true));
        dispatch(onToggleFinishModalAction());
        let result = ''
        try {
            const authClient = await AuthClient.create();
            EventActor.setAuthClient(authClient);
            const actor = await EventActor.getEventActor();
            result = await actor.insertBet(event.id, transaction.id);
            console.log('result: ', result);
        } catch (e) {
            console.log('e: ', e);
        }
        if (result === 'success') {
            dispatch(onChangeNoticeMessageAction('후보로 등록했습니다.'));
            dispatch(onToggleNoticeModalAction());
        } else {
            dispatch(onChangeNoticeMessageAction('후보 등록에 실패했습니다.\n다시 시도해주세요.'));
            dispatch(onToggleNoticeModalAction());
        }

        dispatch(onToggleLoadingModalAction(false));
        window.location.reload();
    }

    const onClickFinish = async () => {
        dispatch(onToggleLoadingModalAction(true));
        dispatch(onToggleFinishModalAction());
        let result = ''
        try {
            const authClient = await AuthClient.create();
            EventActor.setAuthClient(authClient);
            const actor = await EventActor.getEventActor();
            result = await actor.finishBetting(event.id, transaction);
            console.log('result: ', result);
        } catch (e) {
            console.log('e: ', e);
        }

        if (result === 'success') {
            dispatch(onChangeNoticeMessageAction('챌린지가 종료되었습니다.'));
            dispatch(onToggleNoticeModalAction());
        } else {
            dispatch(onChangeNoticeMessageAction('챌린지 종료에 실패했습니다. 다시 시도해주세요.'));
            dispatch(onToggleNoticeModalAction());
        }

        dispatch(onToggleLoadingModalAction(false));
    }

    const getTextView = () => {
        if (event.creator.toString() === principal && eventState === 'register' && transaction.pick === false) 
            return (
                <>
                    <h4 className="mb-2">해당 사진을 선정하시겠습니까?</h4>
                    <small>변경이 불가능하오니 신중히 선택하셔야합니다.</small>
                </>
            )
        else if (event.creator.toString() === principal && eventState === 'finish' && transaction.pick === true)
            return (
                <>
                    <h4 className="mb-2">해당 사진으로 챌린지 종료시겠습니까?</h4>
                    <small>변경이 불가능하오니 신중히 선택하셔야합니다.</small>
                </>
            )
        else 
            return (
                <>
                    <h4 className="mb-2">해당 사진에 배팅하시겠습니까?</h4>
                    <small>취소가 불가능하오니 신중히 선택하셔야합니다.</small>
                </>
            ) 
    }

    const getActionView = () => {
        console.log('event.creator: ', event.creator.toString())
        console.log('principal: ', principal)
        if (event.creator.toString() === principal && eventState === 'register' && transaction.pick === false)
            return (
                <span className="btn btn-sm btn-outline-primary py-1 px-3  col-12" onClick={() => onClickInsert()}>
                    <i className="bx bxs-check-circle me-1"></i>예
                </span>
            )
        else if (event.creator.toString() === principal && eventState === 'finish' && transaction.pick === true)
            return (
                <span className="btn btn-sm btn-outline-primary py-1 px-3  col-12" onClick={() => onClickFinish()}>
                    <i className="bx bxs-check-circle me-1"></i>예
                </span>
            )
        else 
            return (
                <span className="btn btn-sm btn-outline-primary py-1 px-3  col-12" onClick={() => onClickBetting()}>
                    <i className="bx bxs-check-circle me-1"></i>예
                </span>
            )
    }
    
    if (isOpenFinishModal) 
        return (
            <Modal show={isOpenFinishModal} className={"modal fade"} dialogClassName={"modal-dialog modal-lg modal-dialog-centered"} centered={true} contentClassName={"modal-content border-0 shadow"}>
                <ModalBody className={"modal-body p-0 border-0"}>
                    <button type="button" className="btn btn-gray-200 p-0 border-2 width-3x height-3x rounded-circle flex-center position-absolute end-0 top-0 mt-3 me-3 z-1"
                        onClick={() => dispatch(onToggleFinishModalAction())}>
                        <i className="bx bx-x fs-5"></i>
                    </button>
                    <div className="d-md-flex row">
                        <div className="col-md-6">
                            <div className="d-none d-md-flex overflow-hidden bg-shade-primary rounded-3 rounded-end-0 h-md-100 position-relative">
                            <img src={convertImage(transaction.pic)} alt="" className="img-fluid"/>
                            </div>
                        </div>
                        <div className="col-md-6 h-100">
                            <div className="h-100 py-7 py-lg-9 px-lg-5 px-4 position-relative">
                                {getTextView()}
                                <div className="position-relative mt-12">
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="me-2 me-lg-0  col-12">
                                            {getActionView()}
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="me-2 me-lg-0  col-12">
                                            <span  className="btn btn-sm btn-outline-danger py-1 px-3  col-12" onClick={() => dispatch(onToggleFinishModalAction())}>
                                                <i className="bx bxs-x-circle me-1"></i>아니오
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        );
    else
        return <></>;
}

export default ModalFinish;