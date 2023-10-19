import React from "react";
import ShapeComponent from "@container/common/shape";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@reducer/root.reducer";
import DetailAction from "@container/detail/detail.action";
import DetailInfo from "@container/detail/detail.info";
import DetailItem from "@container/detail/detail.item";
import {useEffect} from "react";
import {onGetEventAction} from "@action/detail.action";
import {testData} from "@container/home/home.test";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
const DetailContainer = () => {

    const dispatch = useDispatch();
    const { event, transactions } = useSelector((root: RootState) => root.DetailReducer);

    useEffect(() => {
        dispatch(onGetEventAction.success(testData[0]));
    }, []);

    if (!event)
        return (
            <div className="spinner-loader bg-primary text-white">
                <div className="spinner-grow" role="status">
                </div>
                <span className="small d-block ms-2">Loading...</span>
            </div>
        )
    else
        return (
            <main>
                <section className="bg-gradient-blur d-flex w-100 position-relative">
                    <div className="container px-xl-7 pt-12 pt-lg-15 position-relative">
                        <div className="row align-items-end">
                            <div className="d-flex align-items-center mb-3 col-lg-auto">
                                <img src="/assets/img/backgrounds/bg3.jpg" className="width-8x rounded-2 h-auto me-3 flex-shrink-0" alt=""/>
                                <h2 className="text-center col-lg-auto text-lg-start" style={{marginBottom: 0}}>{event.name}</h2>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="overflow-hidden position-relative">
                    <div className="container px-xl-7 py-9 pt-lg-12 position-relative">
                        <div className="row">
                            <div className="col-lg-8 mx-auto">
                                <div className="d-flex flex-column flex-md-row align-items-md-end">
                                    <div className="flex-grow-1">
                                        <h2 className="display-5">업로드된 사진들</h2>
                                    </div>
                                </div>
                                <hr className="mb-2 mb-lg-5"/>
                                {
                                    transactions.length === 0 &&
                                    <div className={"h-100 w-100 text-center position-relative align-items-center align-content-center flex-center"}>
                                        <SentimentVeryDissatisfiedIcon className={"me-2"}/>
                                        아직 업로드 된 사진이 없습니다.
                                    </div>
                                }
                                <div className="row">
                                    {
                                        transactions.map((transaction, index) => <DetailItem key={index} transaction={transaction}/>)
                                    }
                                </div>
                            </div>
                            <div className="col-md-4 position-relative">
                                <DetailAction />
                                <DetailInfo event={event} />
                            </div>
                        </div>
                    </div>
                    <ShapeComponent />
                </section>
            </main>
        )
}

export default DetailContainer;