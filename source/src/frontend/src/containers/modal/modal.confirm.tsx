import React from "react";
import {Modal, ModalBody, ModalHeader} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux";
import {onChangeNoticeMessageAction, onToggleConfirmModalAction, onToggleLoadingModalAction, onToggleNoticeModalAction} from "@action/modal.action";
import {RootState} from "@reducer/root.reducer";
import { EventActor } from "@actor/event.actor";
import { AuthClient } from "@dfinity/auth-client";

const ConfirmModal = () => {
    const dispatch = useDispatch();
    const { isOpenConfirmModal } = useSelector((root: RootState) => root.ModalReducer);
    const { event } = useSelector((root: RootState) => root.DetailReducer);

    const onClickStartChallenge = async () => {
        dispatch(onToggleConfirmModalAction());
        dispatch(onToggleLoadingModalAction(true));
        let result = '';
        try {
            const authClient = await AuthClient.create();
            EventActor.setAuthClient(authClient);
            const eventActor = await EventActor.getEventActor();
            result = await eventActor.startBetting(event.id);
            console.log('result: ', result);
        } catch (e) {
            console.log('e: ', e);
        }
      
        if (result === 'success') {
            dispatch(onChangeNoticeMessageAction('챌린지가 시작되었습니다.'));
            dispatch(onToggleNoticeModalAction());
        } else {
            dispatch(onChangeNoticeMessageAction('챌린지 시작에 실패했습니다.\n다시 시도해주세요.'));
            dispatch(onToggleNoticeModalAction());
        }
        dispatch(onToggleLoadingModalAction(false));
    }

    if (isOpenConfirmModal)
        return (
            <Modal show={isOpenConfirmModal} className={"modal fade"} dialogClassName={"modal-dialog"} centered={true} contentClassName={"modal-content border-0 shadow"}>
                <div className="position-relative border-0 pe-4">
                    <button type="button" className="btn btn-gray-200 p-0 border-2 width-3x height-3x rounded-circle flex-center position-absolute end-0 top-0 mt-3 me-3 z-1"
                        onClick={() => dispatch(onToggleConfirmModalAction())}>
                        <i className="bx bx-x fs-5"></i>
                    </button>
                </div>
                <ModalBody className={"modal-body text-center py-5 border-0"}>
                    <div className="px-3">
                        <h2 className="mb-1 display-6">챌린지 시작하기</h2>
                        <p className="mb-4 text-body-secondary">챌린지를 시작하시겠습니까?</p>
                        <div className="position-relative">
                            <div className="d-grid">
                                <button className="btn btn-sm btn-outline-primary py-1 px-3 col-12 mb-4" onClick={() => onClickStartChallenge()}>
                                    <i className="bx bxs-check-circle me-1"></i>예
                                </button>
                                <button className="btn btn-sm btn-outline-danger py-1 px-3  col-12" onClick={() => dispatch(onToggleConfirmModalAction())}>
                                    <i className="bx bxs-x-circle me-1"></i>아니오
                                    </button>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        )
    else
        return <></>;
}

export default ConfirmModal;