import { onChangeChallengeIdAction, onChangeNoticeMessageAction, onToggleChallengeModalAction, onToggleNoticeModalAction, onToggleConfirmModalAction } from "@action/modal.action";
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

    const onClickUpload = () => {
        if (!principal) {
            dispatch(onChangeNoticeMessageAction('로그인 후 이용 가능합니다.'));
            dispatch(onToggleNoticeModalAction());
        } else {
            dispatch(onChangeChallengeIdAction(params.id));
            dispatch(onToggleChallengeModalAction())
        }
    }

    const getActionView = () => {
        if (event.state === 'open') {
            if (event && event.creator.toString() !== principal) {
                return (
                    <>
                        <h5 className="mb-3">참여하기</h5>
                        <p>사진을 업로드 하고 이벤트에 도전해보세요!</p>
                        <button className="btn btn-primary" onClick={() => onClickUpload()}>업로드</button>
                    </>
                )
            } else {
                return (
                    <>
                        <h5 className="mb-3">챌린지 시작하기</h5>
                        <p>챌린지를 시작하고 후보를 정해보세요!</p>
                        <button className="btn btn-primary" onClick={() => dispatch(onToggleConfirmModalAction())}>시작하기</button>
                    </>
                )
            }
        }
        else if (event.state === 'betting') {
            if (event && event.creator.toString() !== principal) {
                return (
                    <>
                        <h5 className="mb-3">챌린지에 참여하기</h5>
                        <p>1등에 당선될거 같은 사진을 클릭해 배팅해보세요!</p>
                    </>
                )
            } else {
                return (
                    <>
                        <h5 className="mb-3">챌린지 종료하기</h5>
                        <p>챌린지 후보로 올릴 사진을 클릭해주세요.<br/>그 후,충분히 배팅이 될 때까지 기다려 주세요.<br/>챌린지를 종료하시려면 선정된 사진중 우승시킬 사진을 클릭해주세요</p>
                    </>
                )
            }
        } else if (event.state === 'finished') {
            return (
                <>
                    <h5 className="mb-3">챌린지 종료</h5>
                    <p>챌린지가 종료되었습니다.</p>
                </>
            )
        }
    }

    return (
        <div data-aos="fade-up" className="d-none rounded d-md-block mb-4 border py-5 px-4 shadow-sm">
            {  getActionView() }
        </div>
    )
}

export default DetailActionComponent;