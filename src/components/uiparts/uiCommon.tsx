/*-------------------------------------------------------------
 * UIパーツ共通関数
  -------------------------------------------------------------*/

/**
 * ヘッダ表示用日付取得
 * @returns {string} 日付文字列
 */
export function HeaderDate(): string {
  const dt = new Date()
  const year = dt.getFullYear()
  const month = ("0" + (dt.getMonth() + 1)).slice(-2)
  const day = ("0" + dt.getDate()).slice(-2)
  const weekdays = "日月火水木金土"
  const today = weekdays[dt.getDay()]
  const hour = ("0" + dt.getHours()).slice(-2)
  const minutes = ("0" + dt.getMinutes()).slice(-2)
  const formatedDate = `${year}/${month}/${day}(${today}) ${hour}:${minutes}`

  return formatedDate
}