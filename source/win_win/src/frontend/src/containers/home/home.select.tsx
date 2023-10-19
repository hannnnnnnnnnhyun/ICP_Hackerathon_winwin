import React from "react";
import Select from 'react-select';
const HomeSelectComponent = () => {
    const sortOptions = [
        { value: 'Most Relevant', label: 'Most Relevant' },
        { value: 'Most Recent', label: 'Most Recent' },
    ]

    return (
        <div className="row mb-4 align-items-center">
            <div className="col-md">
                <h3 className="mb-4 mb-sm-0">2730 Events</h3>
            </div>
            <div className="col-md-auto">
                <div className="d-flex">
                    <div className="ms-2 flex-grow-1">
                        <Select
                            className=" form-control-sm w-100"
                            options={sortOptions}
                            defaultValue={sortOptions[0]}
                            isSearchable={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeSelectComponent;