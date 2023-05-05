import {observer} from "mobx-react-lite";
import state from '../../service/state/state'
import NewsItem from "../news-item/news-item";


const News = observer((props: {from: number, to: number, refresh:boolean}) => {

  const setNews = (m: number, i: number) => {
    if (i === props.to-1) {
      state.loading = false;
    }
    return <NewsItem refresh={props.refresh} key={`news_${m}`} news_id={m}/>
  }

  return (
    <div>
      {state.newsIds.map( (m, i) =>
      <div key={`news__${m}`}>
        { (i >= props.from && i < props.to) ? setNews(m,i) : null }
      </div>
      )}
    </div>
  )
})

export default News;
