// /****************************************************

// クライアント用のローカルホスト判定【IPv4射影アドレス変換処理も考慮】
// *****************************************************/

import ipaddr from "ipaddr.js";


export const cnvIpv4MappedAddressToIpv4Address = (ipv4MappedAddr: string): string => {
let ipv4Addr = "0.0.0.0"
if (ipaddr.IPv6.isIPv6(ipv4MappedAddr) === true) {
const addr = ipaddr.IPv6.parse(ipv4MappedAddr)
ipv4Addr = addr.toIPv4Address().toString()
}
return ipv4Addr
}



/**
* ローカルホスト判定
* @return {boolean} ローカルホスト判定(true/false)
*/
export const isLocalhost = function (): boolean {
  if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      
      // IPv4のローカルホスト判定
      if (host === 'localhost' || host === '127.0.0.1') {
          return true;
      }

      // IPv6のローカルホスト判定
      if (host === '::1') {
          return true;
      }

      // IPv4射影アドレスの判定
      const convertedIPv4 = cnvIpv4MappedAddressToIpv4Address(host);
      if (convertedIPv4 === '127.0.0.1') {
          return true;
      }
  }

  return false;
}




