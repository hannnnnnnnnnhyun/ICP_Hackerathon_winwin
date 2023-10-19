import React from "react";
import {Modal, ModalBody} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {onToggleChallengeModalAction} from "@action/modal.action.tsx";
import {RootState} from "@reducer/root.reducer.tsx";

const ModalChallenge = () => {
    const dispatch = useDispatch();
    const { isOpenChallengeModal } = useSelector((root: RootState) => root.ModalReducer);

    return (
        <Modal show={isOpenChallengeModal} className={"modal fade"} dialogClassName={"modal-dialog"} centered={true} contentClassName={"modal-content border-0 shadow"}>
            <div className="position-relative border-0 pe-4">
                <button type="button" className="btn btn-gray-200 p-0 border-2 width-3x height-3x rounded-circle flex-center position-absolute end-0 top-0 mt-3 me-3 z-1"
                    onClick={() => dispatch(onToggleChallengeModalAction())}>
                    <i className="bx bx-x fs-5"></i>
                </button>
            </div>
            <ModalBody className={"modal-body text-center py-5 border-0"}>
                <div className="px-3">
                    <h2 className="mb-1 display-6">이벤트 참여하기</h2>
                    <p className="mb-4 text-body-secondary">여기에 이미지를 업로드하고 이벤트에 참여해보세요!</p>
                    <div className="position-relative">
                        <div>
                            <div className="p-4 border rounded-3 align-items-center mb-3" data-dropzone-area="">
                                <div className="dz-preview" id="dz-preview-row" data-horizontal-scroll=""></div>
                                <div className="position-relative d-flex chat-form rounded-pill col-12 align-items-center" data-emoji-form="">
                                    <button type="button" className="btn btn-secondary dz-clickable" id="dz-btn">
                                        <i className="bx bx-cloud-upload fs-4 me-1"></i> Upload
                                    </button>
                                </div>
                            </div>
                            <div className="d-grid">
                                <button className="btn btn-primary" type="submit">Sign in</button>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )

}

export default ModalChallenge;