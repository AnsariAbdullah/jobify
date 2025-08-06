import React from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';

function PageBtnContainer() {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();

  console.log(numOfPages, currentPage);

  return <h1>PageBtnContainer</h1>;
}

export default PageBtnContainer;
