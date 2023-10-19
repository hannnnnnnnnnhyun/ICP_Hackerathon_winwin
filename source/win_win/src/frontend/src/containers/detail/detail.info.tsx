import DetailCategoryComponent from "@container/detail/detail.category";
import {Event} from "@type/data/event.type";
import React from "react";

const DetailInfoComponent = (props: { event: Event }) => {
    const event = props.event;
    return (
        <div data-aos="fade-up" className="mb-4 border rounded py-5 px-4 shadow-sm">
            <h5 className="mb-4">About this Place</h5>
            <small className="text-body-secondary mb-2 d-block">매장명</small>
            <p className="mb-0">{event!.name}</p>
            <hr className="my-3"/>
            <small className="text-body-secondary mb-2 d-block">위치</small>
            <p className="mb-0">{event!.location}</p>
            <hr className="my-3"/>
            <small className="text-body-secondary mb-2 d-block">상금</small>
            <p className="mb-0">{event!.price.toLocaleString('ko-KR')} MART</p>
            <hr className="my-3"/>
            <small className="text-body-secondary mb-2 d-block">생성자</small>
            <p className="mb-0">{event!.creator}</p>
            <hr className="my-3"/>
            <small className="text-body-secondary mb-2 d-block">Categories</small>
            <p className="mb-0 d-flex flex-wrap mb-n2 position-relative">
                {
                    event!.category.replace(" ", "").split(",").map((category, index) => <DetailCategoryComponent key={index} category={category}/>)
                }
            </p>
        </div>
    )
}

export default DetailInfoComponent;