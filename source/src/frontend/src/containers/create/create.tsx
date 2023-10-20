import React from "react";
import CreateForm from "@container/create/create.form";
import ShapeComponent from "@container/common/shape";

const CreateContainer = () => {
    return (
        <main>
            <section className="bg-gradient-blur position-relative overflow-hidden border-bottom">
                <svg className="position-absolute start-50 bottom-0 w-auto text-primary" width="301" height="104%" viewBox="0 0 301 301" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.999879 301C0.999881 261.603 8.7596 222.593 23.836 186.195C38.9124 149.797 61.0103 116.726 88.8678 88.8679C116.725 61.0104 149.797 38.9125 186.195 23.8361C222.593 8.75972 261.603 0.999997 301 1" stroke="currentColor" />
                </svg>
                <div className="container pt-12 pb-7 position-relative z-1">
                    <div className="row pt-9 pt-lg-12 justify-content-between align-items-center">
                        <div className="col-md-10">
                            <h1 className="display-2 font-serif fw-bold mb-3">등록하기</h1>
                            <p className="lead mb-0">사용자들이 잘 찾을수 있도록 정확한 정보를 입력해주세요.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="position-relative">
                <CreateForm />
                <ShapeComponent />
            </section>
        </main>
    )
}

export default CreateContainer;