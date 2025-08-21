import React from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';

function PageBtnContainer() {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  console.log(search, pathname);

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    console.log(searchParams);
    searchParams.set('page', pageNumber);
    console.log(searchParams);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && 'active'}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderButtons = () => {
    const pageButtons = [];

    // first page
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );

    // dots
    if (currentPage > 3) {
      pageButtons.push(<span className='page-btn dots'>...</span>);
    }

    // one before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage - 1,
          activeClass: false,
        })
      );
    }

    // current page
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage,
          activeClass: true,
        })
      );
    }

    // one after current page
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage + 1,
          activeClass: false,
        })
      );
    }

    // dots
    if (currentPage < numOfPages - 2) {
      pageButtons.push(<span className='page-btn dots'>...</span>);
    }

    // last page
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );

    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className='btn prev-btn'
        onClick={() => {
          let prevPage = currentPage - 1;
          // option A - if on first page take to last page
          // option B - if on first page remain on first page `currentPage = 1`
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>{renderButtons()}</div>
      <button
        className='btn next-btn'
        onClick={() => {
          let nextPage = currentPage + 1;
          // option A - if on last page take to 1st page
          // option B - if on last page remain on last page `nextPage = numOfPages`
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
}

export default PageBtnContainer;
