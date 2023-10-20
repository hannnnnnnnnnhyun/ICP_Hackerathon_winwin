import { onChangeChallengeIdAction, onChangeNoticeMessageAction, onToggleChallengeModalAction, onToggleNoticeModalAction } from "@action/modal.action";
import React from "react";
import {useDispatch} from "react-redux";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "@reducer/root.reducer";

const DetailActionComponent = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { principal } = useSelector((root: RootState) => root.HeaderReducer);
    const { event } = useSelector((root: RootState) => root.DetailReducer);

    const onClickAction = () => {
        if (!principal) {
            dispatch(onChangeNoticeMessageAction('로그인 후 이용 가능합니다.'));
            dispatch(onToggleNoticeModalAction());
        } else {
            dispatch(onChangeChallengeIdAction(params.id));
            dispatch(onToggleChallengeModalAction())
        }
    }

    return (
        <div data-aos="fade-up" className="d-none rounded d-md-block mb-4 border py-5 px-4 shadow-sm">
            <h5 className="mb-3">참여하기</h5>
            <p>사진을 업로드 하고 이벤트에 도전해보세요!</p>
            {
                event && event.creator.toString() !== principal
                ?  <button className="btn btn-primary" onClick={() => onClickAction()}>업로드</button>
                :  <button className="btn btn-primary" disabled={true}>업로드</button>
            }
        </div>
    )
}

export default DetailActionComponent;