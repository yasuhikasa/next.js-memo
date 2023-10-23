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
  }

  return false;
}

