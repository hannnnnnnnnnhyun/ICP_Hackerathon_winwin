import React from "react";
import {Event} from "@type/data/event.type";
import {Link} from "react-router-dom";
import {FmdGoodOutlined, CheckCircleOutline, AttachMoneyOutlined} from '@mui/icons-material';
import {convertImage} from "@helper/converter";

const HomeItemComponent = (props: { event: Event }) => {
    const event = props.event;

    console.log('event: ', event)
    // var blob = new Blob([uint8array]);

    return (
        <div className="col-md-6 mb-4" data-aos="fade-up">
            <div className="card hover-lift hover-shadow-xl h-100 shadow-sm">
                <div className="card-body p-4">
                    <div>
                        <div className="flex-grow-1">
                            <div>
                                <div className="flex-grow-1">
                                    <div className="d-flex align-items-center mb-3 col-lg-auto">
                                        <img src={convertImage(event.logo)}
                                             className="width-6x rounded-2 h-auto me-3 flex-shrink-0"
                                             alt=""/>
                                        <div className="flex-fill">
                                            <h5 className="text-center col-8 text-lg-start">{event.name}</h5>
                                            <small className="flex-grow-1">{event.creator.toString()}</small>
                                        </div>
                                        <span className="badge py-1 lh-base position-relative z-2 bg-primary-subtle text-primary me-2 px-3">
                                            {event.finish ? "종료" : "진행중"}
                                        </span>
                                    </div>
                                    <ul className="d-flex small flex-wrap list-unstyled mb-3">
                                        <li className="me-3 mb-2 d-flex align-items-center">
                                            <i className="bx bx-chevron-down-circle me-1"></i>{event.category}
                                        </li>
                                        <li className="me-3 mb-2 d-flex align-items-center">
                                        <i className="bx bx-map me-1"></i>{event.location}
                                        </li>
                                    </ul>
                                    <div className="d-flex align-items-center">
                                        <span className="badge bg-body-secondary text-body py-1 lh-base position-relative z-2">
                                        <i className="bx bx-dollar me-1"></i>{event.price.toLocaleString('ko-KR')} MART
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to={`/detail/${event.id.toString()}`} className="stretched-link"></Link>
            </div>
        </div>
    )
}

export default HomeItemComponent;