import React from "react";
import {Modal, ModalBody, ModalHeader} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux";
import {onToggleNoticeModalAction} from "@action/modal.action";
import {RootState} from "@reducer/root.reducer";

const NoticeModal = () => {
    const dispatch = useDispatch();
    const {isOpenNoticeModal, noticeMessage} = useSelector((state: RootState) => state.ModalReducer);

    return (
        <Modal show={isOpenNoticeModal} centered={true}>
            <ModalBody>
                <div className="modal-body text-center">
                    <h5 id="validation-message">{noticeMessage}</h5>
                    <button id="validation-btn" className="btn btn-primary" onClick={() => dispatch(onToggleNoticeModalAction())}>확인</button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default NoticeModal;