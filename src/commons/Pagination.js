import React, { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import styled from 'styled-components';

const Pagination = (props) => {
  let lastPage = Math.ceil(props.total / 5);
  const [startPage, setStartPage] = useState(1);
  const [active, setActive] = useState('1');

  const onClickPage = (e) => {
    setActive(e.target.id);
    props.setCurrentPage?.(e.target.id);
  };

  const onClickPrevPage = (e) => {
    setStartPage(startPage - 10);
    setActive(e.currentTarget.id);
    props.setCurrentPage?.(e.currentTarget.id);
  };

  const onClickNextPage = (e) => {
    setStartPage(startPage + 10);
    setActive(e.currentTarget.id);
    props.setCurrentPage?.(e.currentTarget.id);
  };

  return (
    <Wrap>
      <button
        disabled={startPage === 1}
        onClick={onClickPrevPage}
        id={startPage - 10}
      >
        <AiOutlineArrowLeft />
      </button>
      <Page>
        {new Array(10).fill(1).map((_, i) => {
          return (
            <>
              {i + startPage <= lastPage ? (
                <ul>
                  <li
                    style={{
                      color:
                        active === String(i + startPage) ? 'black' : '#d4d4d4',
                    }}
                    onClick={onClickPage}
                    id={i + startPage}
                  >
                    {i + startPage}
                  </li>
                </ul>
              ) : null}
            </>
          );
        })}
      </Page>
      <button
        disabled={startPage + 10 > lastPage}
        onClick={onClickNextPage}
        id={startPage + 10}
      >
        <AiOutlineArrowRight />
      </button>
    </Wrap>
  );
};

export default Pagination;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    border: 1px solid #d4d4d4;

    display: flex;
    justify-content: center;
    align-items: center;

    margin: 1rem;

    width: 25px;
    height: 25px;
    background-color: transparent;
    cursor: pointer;
  }
`;

const Page = styled.div`
  display: flex;

  ul {
    list-style: none;

    li {
      border: 1px solid #d4d4d4;
      width: 25px;
      height: 25px;
      color: #d4d4d4;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
