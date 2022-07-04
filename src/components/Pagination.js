import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

const Paginate = (props) => {

    const [activePage, setActivePage] = useState(1);


    const handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        setActivePage(pageNumber)
    }
    console.log(props, "propsss")

    return (
        <>
            <Pagination
                activePage={activePage}
                itemsCountPerPage={1}
                totalItemsCount={props.data}
                pageRangeDisplayed={2}
                onChange={(e) => handlePageChange(e)}
                itemclassName="page-item"
                linkclassName="page-link"
            />
        </>
    )
}

export default Paginate;
