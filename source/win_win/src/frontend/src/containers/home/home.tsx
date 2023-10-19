import React from "react";
import HomeJumbotron from "@container/home/home.jumbotron";
import useScript from "@helper/useScript";
import HomeSelect from "@container/home/home.select";
import HomeItem from "@container/home/home.item";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@reducer/root.reducer";
import {useEffect} from "react";
import {onGetEventAction} from "@action/home.action";
import {testData} from "@container/home/home.test";
import ShapeComponent from "@container/common/shape";


const HomeContainer = () => {
    useScript("/assets/js/theme.bundle.min.js");
    const dispatch = useDispatch();
    const { events } = useSelector((root: RootState) => root.HomeReducer);

    useEffect(() => {
        dispatch(onGetEventAction.success(testData))
    }, []);

    return (
        <main>
            <HomeJumbotron/>
            <section className="overflow-hidden position-relative">
                <div className="container py-9 py-lg-12 position-relative">
                    <div className="row">
                        <div className="col-lg-12 mb-5 mb-lg-0 mx-auto">
                            <HomeSelect/>
                            <div className="row">
                                {events.map((item) => <HomeItem event={item} key={item.id} />)}
                            </div>
                            <div className="pt-2 text-center" data-aos="fade-up" data-aos-delay="350">
                                <a href="#!" className="btn btn-info rounded-pill">Load More Events</a>
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