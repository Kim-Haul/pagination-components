## app.js

```javascript
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Pagination from './commons/Pagination';

function App() {
  // 파라미터 변경 내역 호출 api
  const [currentPage, setCurrentPage] = useState(1);

  const axiosParameter = async () => {
    try {
      const res = await axios.get(`api주소?page=${currentPage}&size=5`);
      console.log('Status 200');
      return res;
    } catch (err) {
      console.log('호출에러');
    }
  };

  // 파라미터 변경 내역 호출 api -> 호출 쿼리
  // useQuery의 첫번째 패러미터는 query key로, unique한 문자열 또는 배열을 사용할 수 있다. 
  배열을 사용하는 경우, 배열 원소의 값이 바뀌면 queryFn이 재실행된다.
  
  const { data: params_query, refetch } = useQuery(
    [currentPage],
    axiosParameter,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log('Status 200');
      },
      onError: () => {
        console.error('에러 발생!');
      },
    }
  );

  // 총 데이터 수
  const total = params_query.data.total;

  return (
    <React.Fragment>
      {params_query.data.tables.map((v, i) => {
        return (
          <tr key={i}>
            <td>{v.value}</td>
            <td>{v.before}</td>
            <td>{v.after}</td>
            <td>{v.date}</td>
          </tr>
        );
      })}
      <Pagination total={total} setCurrentPage={setCurrentPage} />
    </React.Fragment>
  );
}

export default App;
```

## pagination.js

```javascript
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
```
