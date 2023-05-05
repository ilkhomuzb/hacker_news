import {useEffect, useState} from "react";
import http from '../../service/http/http.service';
import {Button, Card, CardActionArea, CardActions, CardContent, Typography} from "@mui/material";
import {FaUserSecret} from "react-icons/fa";
import {IoTimerOutline} from "react-icons/io5";
import {FcLike} from "react-icons/fc";
import './news-item.scss'
import {useNavigate} from "react-router-dom";
import state from "../../service/state/state";
import Utils from "../../service/utils";
import {AiOutlineComment} from "react-icons/ai";

const NewsItem = (props: {news_id: number,refresh: boolean}) => {

  const navigate = useNavigate();

  const navigateById = (news: NEWS) => {
    state.news = news;
    navigate('/news/' + news.id);
  };

  const [news, setNews] = useState<NEWS>();

  useEffect(() => {
    (async () => {
      const {data} = await http.get<NewsItemResponse>(`item/${props.news_id}.json`);
      setNews(data);
    })();
  },[props]);

  return (
    <div>
      {news ?
        <div className="newsItem container p-2">
          <Card className="w-100">
            <CardActionArea>
              <CardContent>
                <Typography align={"right"} variant="body2" color="text.secondary">
                  <span> {news.by} </span>
                  <FaUserSecret className="item_icon"/>
                </Typography>
                <Typography gutterBottom variant="h6" component="span">
                  {news.title}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <div className="d-flex w-100 justify-content-between">
                <div>
                  <Typography className="px-2" align={"right"} variant="body2" color="text.secondary" component="span">
                    <FcLike className="item_icon_c"/>
                    <span> {news.score}</span>
                  </Typography>
                  <Typography className="px-2" align={"right"} variant="body2" color="text.secondary" component="span">
                    <AiOutlineComment className="item_icon_c"/>
                    <span> {news.descendants}</span>
                  </Typography>
                  <Typography className="px-2" align={"right"} variant="body2" color="text.secondary" component="span">
                    <IoTimerOutline className="item_icon_c"/>
                    <span> {Utils.dateConvert(news.time)} </span>
                  </Typography>
                </div>
                <div>
                  <Button onClick={() => navigateById(news)} size="small" color="primary">
                    Go to news
                  </Button>
                </div>

              </div>

            </CardActions>
          </Card>
        </div>
        : null}
    </div>
  )
}

export interface NewsItemResponse {
  data: NEWS
}

export interface NEWS{
  by: string,
  descendants: number,
  id: number,
  score: number,
  time: number,
  title: string,
  kids?: number[],
  url: string,
  type?: string,
  parent?: number,
  text?: string
}

export default NewsItem;
