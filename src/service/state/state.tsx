import {makeAutoObservable} from 'mobx'
import {NEWS} from "../../component/news-item/news-item";

class state {

  private _newsIds: number[] = [];
  private _news!: NEWS;
  private _loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }


  get news(): NEWS {
    return this._news;
  }

  set news(value: NEWS) {
    this._news = value;
  }

  get newsIds(): number[] {
    return this._newsIds;
  }

  set newsIds(newsIds: number[]) {
    this._newsIds = newsIds;
  }


  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
  }
}

export default new state();

