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
  // useQuery의 첫번째 패러미터는 query key로, unique한 문자열 또는 배열을 사용할 수 있다. 배열을 사용하는 경우, 배열 원소의 값이 바뀌면 queryFn이 재실행된다.
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
