import React from "react";
import ShapeComponent from "@container/common/shape";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@reducer/root.reducer";
import DetailAction from "@container/detail/detail.action";
import DetailInfo from "@container/detail/detail.info";
import DetailItem from "@container/detail/detail.item";
import {useEffect} from "react";
import { useParams } from 'react-router-dom';
import {onGetEventAction, onGetTransactionAction} from "@action/detail.action";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import useScript from "@helper/useScript";
import { onToggleLoadingModalAction } from "@action/modal.action";
import { Principal } from '@dfinity/principal';
import { EventActor } from "@actor/event.actor";
import { convertImage } from "@helper/converter";
import ConfirmModal from "@container/modal/modal.confirm";
import ModalFinish from "@container/modal/modal.finish";

const DetailContainer = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { event, transactions } = useSelector((root: RootState) => root.DetailReducer);
    const [page, setPage] = React.useState(1);

    const getEvent = async (id: Principal) => {
        const actor = await EventActor.getEventActor();
        const result = await actor.getEvent(id);
        if (result.length === 0) {
            console.log('result: ', result);
            return;
        }
        console.log('Event: ', result);
        dispatch(onGetEventAction(result[0]));
        dispatch(onToggleLoadingModalAction(false));
    }

    const getTransaction = async (id: Principal) => {
        const actor = await EventActor.getEventActor();
        const result = await actor.getTransactions(id, page, 5);
        console.log('Transaction: ', result);
        dispatch(onGetTransactionAction(result));
    }

    useEffect(() => {
        dispatch(onToggleLoadingModalAction(true));
        const id = Principal.fromText(params.id);
        getEvent(id);
    }, []);

    useEffect(() => {
        const id = Principal.fromText(params.id);
        console.log('page: ', page);
        getTransaction(id);
    }, [page]);

    if (!event) 
        return (
            <div className="spinner-loader bg-primary text-white">
                <div className="spinner-grow" role="status">
                </div>
                <span className="small d-block ms-2">Loading...</span>
            </div>
        );
    else
        return (
            <main>
                <section className="bg-gradient-blur d-flex w-100 position-relative">
                    <div className="container px-xl-7 pt-12 pt-lg-15 position-relative">
                        <div className="row align-items-end">
                            <div className="d-flex align-items-center mb-3 col-lg-auto">
                                <img src={convertImage(event.logo)} className="width-8x rounded-2 h-auto me-3 flex-shrink-0" alt=""/>
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
                                    {
                                        transactions.length > 0 &&
                                        <div className="pt-2 text-center" data-aos="fade-up" data-aos-delay="350" onClick={() => setPage(page + 1)}>
                                            <span className="btn btn-info rounded-pill">Load More Events</span>
                                        </div>
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
                <ConfirmModal />
                <ModalFinish />
            </main>
        )
}

export default DetailContainer;