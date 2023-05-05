import React, {useEffect, useState} from 'react';
import './App.scss';
import {Navigate, NavLink, Route, Routes, useParams} from "react-router-dom";
import Main from "./page/main/main";
import {FcRefresh} from "react-icons/fc";
import {MdKeyboardBackspace} from "react-icons/md";
import {IconButton, Tooltip} from "@mui/material";
import {GiNewspaper} from "react-icons/gi";
import NewsPage from "./page/news-page/news-page";

function App() {

  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();

  useEffect(() => {
  },[id])
  const [isId, setIsId] = useState((!!id))


  return (
    <div className="w-100 d-flex flex-column h-100">
      <header className="top_bar">
        <div className="container h-100 d-flex justify-content-between align-items-center">
          <NavLink className="text-primary nav-link pointer d-flex align-items-center" to={'/main'}>
            <GiNewspaper className="logo-icon"/>
            <span> Hacker News</span>
          </NavLink>
          <div>
            {isId
              ?
              <Tooltip title="Назад">
                <NavLink to={"/main"}>
                  <IconButton onClick={() => setIsId(false)} color="primary" aria-label="state" component="label">
                    <MdKeyboardBackspace className="icon"/>
                  </IconButton>
                </NavLink>
              </Tooltip>
              :
              <Tooltip title="Обновить список новостей">
                <IconButton onClick={() => setRefresh(!refresh)} color="primary" aria-label="state" component="label">
                  <FcRefresh className="icon"/>
                </IconButton>
              </Tooltip>
            }
          </div>
        </div>
      </header>
      <div className="flex-grow-1">
        <Routes>
          <Route
            path="*"
            element={<Navigate to="/main" replace />}
          />
          <Route path="/main" element={<Main refresh={refresh}/>}/>
          <Route path="/news/:id" element={<NewsPage refresh={refresh}/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
