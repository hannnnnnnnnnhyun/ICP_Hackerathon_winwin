import * as React from "react";
import useStylesheet from "@helper/useStylesheet";
import useScript from "@helper/useScript";
import {RootState} from "@reducer/root.reducer";
import {useSelector} from "react-redux";
import Lottie, { LottiePlayer } from "lottie-react";
import animation from "./loading.json"

const LoadingModal = () => {
    const {isOpenLoadingModal} = useSelector((state: RootState) => state.ModalReducer);

    console.log('isOpenLoadingModal: ', isOpenLoadingModal)

    return(
        <div className="loading" style={{display: isOpenLoadingModal ? 'block' : 'none', zIndex: 9999 }}>
            <div className="loading-lottie">
                <Lottie animationData={animation} style={{width: '100px', height: '100px'}} loop={true} autoplay={true} ></Lottie>
            </div>
        </div>
    )
}

export default LoadingModal;