import client from "./client";
import Cookies from "js-cookie";


// 全てのPostデータを取得 投稿リストページ
export const getpostsList = () => {
  return client.get('/posts')
};
