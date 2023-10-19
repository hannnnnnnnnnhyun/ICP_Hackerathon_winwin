import { onChangeChallengeIdAction, onToggleChallengeModalAction } from "@action/modal.action";
import React from "react";
import {useDispatch} from "react-redux";
import { useParams } from 'react-router-dom';

const DetailActionComponent = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const onClickAction = () => {
        dispatch(onChangeChallengeIdAction(params.id));
        dispatch(onToggleChallengeModalAction())
    }

    return (
        <div data-aos="fade-up" className="d-none rounded d-md-block mb-4 border py-5 px-4 shadow-sm">
            <h5 className="mb-3">참여하기</h5>
            <p>사진을 업로드 하고 이벤트에 도전해보세요!</p>
            <span className="btn btn-primary" onClick={() => onClickAction()}>업로드</span>
        </div>
    )
}

export default DetailActionComponent;