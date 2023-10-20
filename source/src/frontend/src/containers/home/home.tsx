import React from "react";
import HomeJumbotron from "@container/home/home.jumbotron";
import useScript from "@helper/useScript";
import HomeSelect from "@container/home/home.select";
import HomeItem from "@container/home/home.item";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@reducer/root.reducer";
import {useEffect} from "react";
import {onEventClearAction, onGetEventAction} from "@action/home.action";
import ShapeComponent from "@container/common/shape";
import { EventActor } from "@actor/event.actor";

const HomeContainer = () => {
    useScript("/assets/js/theme.bundle.min.js");
    const dispatch = useDispatch();
    const { events } = useSelector((root: RootState) => root.HomeReducer);
    const [page, setPage] = React.useState(1);

    const getEvents = async () => {
        const actor = await EventActor.getEventActor();
        const result = await actor.getEvents(page, 5);
        console.log('result: ', result);
        dispatch(onGetEventAction(result));
    }

    useEffect(() => {
        dispatch(onEventClearAction());
    }, []);

    useEffect(() => {
        getEvents();
    }, [page]);

    return (
        <main>
            <HomeJumbotron/>
            <section className="overflow-hidden position-relative">
                <div className="container py-9 py-lg-12 position-relative">
                    <div className="row">
                        <div className="col-lg-12 mb-5 mb-lg-0 mx-auto">
                            <HomeSelect/>
                            <div className="row">
                                {events.map((item) => <HomeItem event={item} key={item.id.toText()} />)}
                            </div>
                            <div className="pt-2 text-center" data-aos="fade-up" data-aos-delay="350" onClick={() => setPage(page + 1)}>
                                <span className="btn btn-info rounded-pill">Load More Events</span>
                            </div>
                        </div>
                    </div>
                </div>
                <ShapeComponent />
            </section>
        </main>
    )
}

export default HomeContainer;