import React from 'react';

const Pagination = ({ pager, handlePager }) => {

    let start = Math.floor((pager.pageNo - 1) / pager.pagePerDisplay) * pager.pagePerDisplay + 1;
    let end = start + (pager.pagePerDisplay - 1);

    if ((end - pager.pageNo) > pager.totalNextPages) end = pager.pageNo + pager.totalNextPages;

    let prev = pager.pageNo - 1;
    let next = pager.pageNo + 1;

    let rows = [];
    for (let i = start; i <= end; i++) {
        rows.push(<li key={i} className={`page-item ${i === pager.pageNo ? 'active' : ''}`} ><a className="page-link" href="javascript:void(0);" onClick={() => handlePager(i)}> {i} </a></li>);
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li key={prev} className={`page-item previous ${prev > 0 ? '' : 'disabled'}`}><a className="page-link" href="javascript:void(0);" onClick={() => handlePager(prev)}>Previous</a></li>
                {rows}              
                <li key={next} className={`page-item next ${pager.totalNextPages > 0 ? '' : 'disabled'}`}><a className="page-link" href="javascript:void(0);" onClick={() => handlePager(next)}>Next</a></li>
            </ul>
        </nav>
    );
}

export default Pagination;