import React from "react";
import {Modal, ModalBody} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {onToggleChallengeModalAction, onToggleLoadingModalAction} from "@action/modal.action.tsx";
import {RootState} from "@reducer/root.reducer.tsx";
import {useEffect, useRef, useState} from "react";
import { BackendActor } from "@actor/backend.actor";
import { imageToBlob } from "@helper/converter";
import { Principal } from '@dfinity/principal';
import { AuthClient } from "@dfinity/auth-client";

const ModalChallenge = () => {
    const dispatch = useDispatch();
    const { isOpenChallengeModal, challengeId } = useSelector((root: RootState) => root.ModalReducer);
    const { principal } = useSelector((root: RootState) => root.HeaderReducer);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [image, setImage] = useState<FileList | null>(null);
    const imageInput = useRef<HTMLInputElement>(null);

    const onSubmit = async ()  => {
        dispatch(onToggleLoadingModalAction(true));
        const authClient = await AuthClient.create();
        await BackendActor.setAuthClient(authClient);
        const actor = await BackendActor.getBackendActor();
        const file = image[0];
        const blobLogo: any = await imageToBlob(file);
        const byteLogo = new Uint8Array(blobLogo);
        const result = await actor.createTransaction(
            Principal.fromText(challengeId),
            {
                id: authClient.getIdentity().getPrincipal(),
                pic: byteLogo,
                challenger: authClient.getIdentity().getPrincipal(),
            }
        );
        console.log("Challenge Success!");
        console.log('result: ', result);
        dispatch(onToggleLoadingModalAction(false));
        dispatch(onToggleChallengeModalAction());
        window.location.reload();
    }

    useEffect(() => {
        if (image && image.length > 0) {
            const file: File = image[0];
            setImagePreview(URL.createObjectURL(file));
        }
    }, [image]);


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
                        <div className="col-12 mb-3">
                            <div className="image-upload-wrap ratio ratio-21x9 text-center"  onClick={() => imageInput.current?.click()}>
                                <div className="text-center g-mt-20 g-py-120--lg g-py-80--md g-py-30 g-brd-style-dashed u-icon-v4-bg-gray-light-v3 g-rounded-20 flex-center" style={{marginBottom: 0}}>
                                    {
                                        imagePreview
                                            ? <img id="background-preview-image" className="img-fluid g-pt-20 g-py-20 h-100" src={imagePreview} alt="your image"/>
                                            : <p>사진을 업로드하고 이벤트에 참여하세요.</p>
                                    }
                                </div>
                            </div>
                            <input id="background-image-input" className="w-100 fade" style={{height: "1px"}} type="file" accept="image/*"  ref={imageInput} onChange={(e) => setImage(e.target.files)} />
                            <button type="button" className="btn btn-secondary dz-clickable mt-2" id="dz-btn" onClick={() => imageInput.current?.click()}>
                                <i className="bx bx-cloud-upload fs-4 me-1"></i> Upload
                            </button>
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-primary" type="button" onClick={() => onSubmit()}>참가하기</button>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )

}

export default ModalChallenge;