import React from "react";
import { useForm } from "react-hook-form";
import {useEffect, useRef, useState} from "react";
import { useSelector } from "react-redux";
import { RootState } from "@reducer/root.reducer";
import { EventActor } from "@actor/event.actor";
import {imageToBlob} from "@helper/converter";
import { useDispatch } from "react-redux";
import { onChangeNoticeMessageAction, onToggleNoticeModalAction } from "@action/modal.action";
import { AuthClient } from "@dfinity/auth-client";

const CreateFormComponent = () => {
    const dispatch = useDispatch();
    const { principal } = useSelector((root: RootState) => root.HeaderReducer);
    const [imagePreview, setImagePreview] = useState<string>('');
    const { register, handleSubmit, watch, setValue} = useForm();
    const imageInput = useRef<HTMLInputElement>(null);
    const logo = watch('logo');

    useEffect(() => {
        if (logo && logo.length > 0) {
            const file: File = logo[0];
            setImagePreview(URL.createObjectURL(file));
        }
    }, [logo]);

    const onSubmit = async (data: any)  => {
        const authClient = await AuthClient.create();
        await EventActor.setAuthClient(authClient);
        const actor = await EventActor.getEventActor();
        const file = logo[0];
        const blobLogo: any = await imageToBlob(file);
        const byteLogo = new Uint8Array(blobLogo);
        const result = await actor.createEvent({
            id: authClient.getIdentity().getPrincipal(),
            creator: authClient.getIdentity().getPrincipal(),
            finish: false,
            transactions: [],
            name: data.name,
            location: data.location,
            category: data.category,
            price: BigInt(data.price),
            logo: byteLogo,
        });
        if (result === true) {
            dispatch(onChangeNoticeMessageAction('이벤트가 생성되었습니다.'));
            dispatch(onToggleNoticeModalAction());
        } else {
            dispatch(onChangeNoticeMessageAction('이벤트 생성에 실패했습니다.\n다시 시도해주세요.'));
            dispatch(onToggleNoticeModalAction());
        }
        // actor.createEvent(authClient.getIdentity().getPrincipal(), {data.name, data.location, data.category, data.price, data.logo[0]})
    }

    return (
        <div className="container py-9 py-lg-11">
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className="row">
                    <div className="col-sm-8 mb-3">
                        <label htmlFor="p_title" className="form-label">매장명</label>
                        <div className="position-relative">
                            <input type="text" placeholder="" className="form-control form-control-lg ps-6" {...register('name')}/>
                            <span className="position-absolute pe-none opacity-75 text-body-secondary flex-center width-3x height-3x left-0 ms-2 top-50 translate-middle-y">
                               <i className="bx bx-home fs-5"></i>
                            </span>
                        </div>
                    </div>
                    <div className="col-sm-12 mb-3">
                        <label htmlFor="p_address" className="form-label">매장주소</label>
                        <div className="position-relative">
                            <input type="text" placeholder="" className="form-control form-control-lg ps-6" {...register('location')}/>
                            <span className="position-absolute pe-none opacity-75 text-body-secondary flex-center width-3x height-3x left-0 ms-2 top-50 translate-middle-y">
                                <i className="bx bx-map fs-5"></i>
                            </span>
                        </div>
                    </div>
                    <div className="col-sm-8 mb-3">
                        <label htmlFor="p_agent" className="form-label">카테고리</label>
                        <div className="position-relative">
                            <input type="text" className="form-control form-control-lg ps-6" id="p_agent" {...register('category')}/>
                            <span className="position-absolute pe-none opacity-75 text-body-secondary flex-center width-3x height-3x left-0 ms-2 top-50 translate-middle-y">
                                <i className='bx bx-chevron-down-circle fs-5'></i>
                            </span>
                        </div>
                    </div>
                    <div className="col-sm-4 mb-3">
                        <label htmlFor="p_price" className="form-label">상금</label>
                        <div className="position-relative">
                            <input type="text" placeholder="" className="form-control form-control-lg ps-6" {...register('price')}/>
                            <span className="position-absolute pe-none opacity-75 text-body-secondary flex-center width-3x height-3x left-0 ms-2 top-50 translate-middle-y">
                                <i className="bx bx-dollar fs-5"></i>
                            </span>
                        </div>
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="p_description" className="form-label">로고 이미지</label>
                        <div className="image-upload-wrap ratio ratio-21x9 text-center"  onClick={() => imageInput.current?.click()}>
                            <div className="text-center g-mt-20 g-py-120--lg g-py-80--md g-py-30 g-brd-style-dashed u-icon-v4-bg-gray-light-v3 g-rounded-20 flex-center">
                                {
                                    imagePreview
                                        ? <img id="background-preview-image" className="img-fluid g-pt-20 g-py-20 h-100" src={imagePreview} alt="your image"/>
                                        : <p>로고 이미지나 매장 이름이 보이는 사진을 업로드하세요.</p>
                                }
                            </div>
                        </div>
                        <input id="background-image-input" className="w-100 fade" type="file" accept="image/*"  ref={imageInput} onChange={(e) => setValue("logo", e.target.files)} />
                        <button type="button" className="btn btn-secondary dz-clickable" id="dz-btn" onClick={() => imageInput.current?.click()}>
                            <i className="bx bx-cloud-upload fs-4 me-1"></i> Upload
                        </button>
                    </div>

                    <div className="d-flex justify-content-between flex-md-row flex-column align-items-md-center">
                        <div className="mb-3 mb-md-0"></div>
                        <div className="d-grid d-md-block col-auto">
                            <button type="submit" className="btn btn-lg btn-primary">Submit listing</button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default CreateFormComponent;