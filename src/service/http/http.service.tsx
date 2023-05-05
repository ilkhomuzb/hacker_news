import axios from 'axios';

const URL: string = 'https://hacker-news.firebaseio.com/v0/';
class HttpService {

  public get<E>(url: string): Promise<E> {
    return axios.get<any,E>(`${URL}${url}`);
  }
}




export interface ACCESS {
  access_token: string,
  refresh_token: string,
  ttl: number,
  expires_in: number,
  token_type: string
}

export default new HttpService();
