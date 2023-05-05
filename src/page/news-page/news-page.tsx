import {observer} from "mobx-react-lite";
import {NEWS, NewsItemResponse} from "../../component/news-item/news-item";
import {useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import http from "../../service/http/http.service";
import {Button, Typography} from "@mui/material";
import {FaUserSecret} from "react-icons/fa";
import {AiFillHome, AiOutlineComment} from "react-icons/ai";
import Utils from "../../service/utils";
import {IoTimerOutline} from "react-icons/io5";
import Comment from '../../component/comment/comment'
const newsPage = observer((props:{refresh: boolean}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState<NEWS | undefined>(undefined);

  useEffect(() => {
    (async () => {
      setNews(undefined)
      const {data} = await http.get<NewsItemResponse>(`item/${id}.json`);
      setNews(data);
      if(!(!!data)) navigate('/main');
      else document.title = data.title;
    })();
  }, [id, navigate,props.refresh])

  return (
    <div className="p-2 h5 h-100 w-100">
      {news ?
        <div className="w-100 d-flex flex-column h-100">
          <div>
            <Typography align="center" fontWeight="bold" gutterBottom variant="h5" component="h5">
              {news.title}
            </Typography>
            <Typography align={"left"} variant="body2" color="text.secondary">
              <FaUserSecret className="item_icon item_icon_p"/>
              <Typography className="px-3" align="left" fontWeight="bold" gutterBottom variant="h5" component="span">
                <span>Author: {news.by} </span>
              </Typography>
            </Typography>
            <Typography align={"left"} variant="body2" color="text.secondary">
              <IoTimerOutline className="item_icon item_icon_p"/>
              <Typography className="px-3" align="left" fontWeight="bold" gutterBottom variant="h5" component="span">
                <span>Publication date: {Utils.dateConvert(news.time)} </span>
              </Typography>
            </Typography>
            <Typography className="d-flex align-items-center" align={"left"} variant="body2" color="text.secondary" component="div">
              <AiFillHome className="item_icon item_icon_p"/>
              <Typography className="px-3 d-flex align-items-center" align="left" fontWeight="bold" gutterBottom variant="h5" component="div">
                <span>Url: </span>
                <a className="link px-2" target="_blank" href={news.url} rel="noreferrer">{news.url}</a>
              </Typography>
            </Typography>
            <Typography align={"left"} variant="body2" color="text.secondary">
              <AiOutlineComment className="item_icon item_icon_p"/>
              <Typography className="px-3" align="left" fontWeight="bold" gutterBottom variant="h5" component="span">
                <span>{news.descendants}</span>
              </Typography>
            </Typography>
          </div>
          <div className="flex-grow-1">
            {news.kids ? <Comment id={news.id}/> : null}
          </div>
          <div className="d-flex w-100 justify-content-center p-2">
            <NavLink to='/main'>
              <Button variant="contained" size="small" color="primary">
                Back
              </Button>
            </NavLink>
          </div>
        </div>
        : null}
    </div>
  )
})

export default newsPage;
