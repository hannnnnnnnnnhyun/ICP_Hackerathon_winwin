import React from "react";

const DetailCategoryComponent = (props :{category: string}) => {
    return (
        <a href="#!" className="btn btn-sm btn-outline-primary me-2 mb-2">{props.category}</a>
    )
}

export default DetailCategoryComponent;