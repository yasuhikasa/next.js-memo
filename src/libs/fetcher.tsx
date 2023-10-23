/****************************************************

コンテンツサーバの内部API用のfetcher ライブラリ
コンテンツサーバからAPIサーバにアクセスする際に使用する
@module fetcher
*****************************************************/
import axios from "axios"
const apiUrl = "http://di_webapisrv:5000"
/**

クライアント側かサーバー側かを判別し、適切なオリジンを返す
@returns オリジン
@example
gerurl() // => https://localhost:4000
*/
  const getUrl = () => {
    if (typeof window === "undefined") {
        return apiUrl
        } else {
        return location.origin
    }
  }
  const fetcher = axios.create({
      baseURL: getUrl(),
      proxy: false,
})

export default fetcher