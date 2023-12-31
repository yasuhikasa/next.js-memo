// /****************************************************

// クライアント用のローカルホスト判定【IPv4射影アドレス変換処理も考慮】
// *****************************************************/

// import ipaddr from "ipaddr.js";


// export const cnvIpv4MappedAddressToIpv4Address = (ipv4MappedAddr: string): string => {
// let ipv4Addr = "0.0.0.0"
// if (ipaddr.IPv6.isIPv6(ipv4MappedAddr) === true) {
// const addr = ipaddr.IPv6.parse(ipv4MappedAddr)
// ipv4Addr = addr.toIPv4Address().toString()
// }
// return ipv4Addr
// }



// /**
// * ローカルホスト判定
// * @return {boolean} ローカルホスト判定(true/false)
// */
// export const isLocalhost = function (): boolean {
//   if (typeof window !== 'undefined') {
//       const host = window.location.hostname;
      
//       // IPv4のローカルホスト判定
//       if (host === 'localhost' || host === '127.0.0.1') {
//           return true;
//       }

//       // IPv6のローカルホスト判定
//       if (host === '::1') {
//           return true;
//       }

//       // IPv4射影アドレスの判定
//       const convertedIPv4 = cnvIpv4MappedAddressToIpv4Address(host);
//       if (convertedIPv4 === '127.0.0.1') {
//           return true;
//       }
//   }

//   return false;
// }




/****************************************************

ユーティリティ ライブラリ（認証サーバ全体で使用する関数を定義）
サーバーサイドでのみ使用する関数を定義（参考用）
@module util
*****************************************************/
import crypto from "crypto"
import ipaddr from "ipaddr.js"
// import { execSync } from "child_process"
// // デフォルトゲートウェイのIPアドレス
// let defaultGateWayIpAddress = "0.0.0.0"

/**

MD5変換関数
@param {string} word MD5変換対象の文字列
@example
md5("abc") => "900150983cd24fb0d6963f7d28e17f72"
*/
export const md5 = (word: string) => crypto.createHash("MD5").update(word).digest("hex")
/**

ローカルホスト判定
@param {any} request リクエストオブジェクト
@return {boolean} ローカルホスト判定(true/false)
*/
export const isLocalhost = function (request: any) {
const ip = getClientIp(request)
const ipv4Addr = cnvIpv4MappedAddressToIpv4Address(ip)
return ipv4Addr === "127.0.0.1" || ipv4Addr === "::1";
}
/**

クライアントIP取得
@param {any} request リクエストオブジェクト
@return {any} クライアントIPアドレス
*/
export const getClientIp = function (request: any) {
return request.connection && request.connection.remoteAddress
? request.connection.remoteAddress
: request.connection.socket && request.connection.socket.remoteAddress
? request.connection.socket.remoteAddress
: request.socket && request.socket.remoteAddress
? request.socket.remoteAddress
: "0.0.0.0"
}
/**

IPv4射影アドレス変換処理
@param {string} ipv4MappedAddr IPv4射影アドレス
@returns {string} IPv4アドレス
*/
// export const cnvIpv4MappedAddressToIpv4Address = (ipv4MappedAddr: string): string => {
// let ipv4Addr = "0.0.0.0"
// if (ipaddr.IPv6.isIPv6(ipv4MappedAddr) === true) {
// const addr = ipaddr.IPv6.parse(ipv4MappedAddr)
// ipv4Addr = addr.toIPv4Address().toString()
// }
// return ipv4Addr
// }
export const cnvIpv4MappedAddressToIpv4Address = (ipv4MappedAddr: string): string => {
    if (ipaddr.IPv6.isIPv6(ipv4MappedAddr) === true) {
      const addr = ipaddr.IPv6.parse(ipv4MappedAddr);
      if (addr.isIPv4MappedAddress()) {
        return addr.toIPv4Address().toString();
      }
    }
    return ipv4MappedAddr; // IPv4マッピングアドレスでない場合は入力アドレスをそのまま返す
  }


// /**

// デフォルトゲートウェイ IPアドレス取得
// 起動時に実行し取得したIPアドレスを変数に保持する
// */
// function getDefaultGateWayIpAddress() {
// const utf8decorder = new TextDecoder()
// const result = execSync("ip route show")
// const nets = utf8decorder.decode(result).split(" ")
// defaultGateWayIpAddress = nets[2]
// }
// // 起動時に実行
// getDefaultGateWayIpAddress()