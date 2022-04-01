import Pagination from "react-js-pagination";
import "./style.css";

export const itemsPerPage = 10;

const PaginationGlobal = ({ activePage, handlePageChange, totalCount }) => {
    return (
        <div className="d-flex justify-content-center">
            <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={totalCount}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                itemClass="page-item"
                hideFirstLastPages={false}
                nextPageText="Next >"
                prevPageText="< Previous"
                hideDisabled={true}
            />
        </div>
    );
};

export default PaginationGlobal;
