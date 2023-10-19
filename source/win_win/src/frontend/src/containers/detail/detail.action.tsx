import React from "react";

const DetailActionComponent = () => {
    return (
        <div data-aos="fade-up" className="d-none rounded d-md-block mb-4 border py-5 px-4 shadow-sm">
            <h5 className="mb-3">참여하기</h5>
            <p>사진을 업로드 하고 이벤트에 도전해보세요!</p>
            <a className="btn btn-primary" href="#modalForm" data-bs-toggle="modal" aria-expanded="false">업로드</a>
        </div>
    )
}

export default DetailActionComponent;