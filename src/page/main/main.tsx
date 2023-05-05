import React, {useEffect, useState} from "react";
import state from '../../service/state/state'
import NewsCard from "../../component/news-card/news-card";
import './main.scss';
import {CircularProgress, TablePagination} from "@mui/material";
import http from '../../service/http/http.service';


const Main = (props: {refresh: boolean}) => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [count, setCount] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(100);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ): void => {
    setFrom(newPage*100);
    setTo((newPage+1)*100);
    setPage(newPage);
    state.loading = false;
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 100));
  }

  useEffect((): void => {
    document.title = 'Hacker News';
    (async (): Promise<void> => {
      state.newsIds = [];
      const {data} = await http.get<NewsResponse>('newstories.json');
      state.newsIds = data;
      setCount(data.length);
      setPage(0);
    })();
  }, [props.refresh]);

  return (
    <div className="w-100 h-100 position-relative">
      <div className={`w-100 h-100 d-flex flex-column justify-content-center align-items-center ${state.loading ? '' : 'd-none'}`}>
        <CircularProgress />
        <h6 className="mb-5 mt-2">Загрузка...</h6>
      </div>
      <div className={`w-100 h-100 ${state.loading ? 'd-none' : ''}`}>
        <div className="wrapper w-100 h-100 p-1 d-flex flex-column">
          <div className="flex-grow-1 overflow-auto card-list">
            <NewsCard refresh={props.refresh} from={from} to={to}/>
          </div>
          <div className="p-2 container">
            <TablePagination
              component="div"
              count={count}
              labelRowsPerPage={""}
              SelectProps={{ className:'pagination_select' }}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
    </div>

  );
}

export default Main;

export interface NewsResponse {
  data: number[]
}



