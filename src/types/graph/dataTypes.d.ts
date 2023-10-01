export type sellDataType = number[]

export type BalanceDataType = {
sellingCost: number
selling: number[]
buying: number[]
generation: number[]
usage: number[]
charge: number[]
}

export type UsageDataType = {
generation: number[]
buying: number[]
charge: number[]
}

// 自家消費率グラフ表示用データ
export type SelfConsumptionRateDataType = {
data: number[] // 自家消費率データ
dataChar: string[] // 自家消費率データの文言
backgroundColor: CanvasPattern[] // 背景色。パターンも合わせて指定する
}
//でんき予報のグラフデータ
export type LineGraphDataType = {
generation: number[] //発電量予測
usage: number[] //使用電力予測
}

//電気代のグラフデータ
export type electricBillType = {
average: number[]
usage: number[]
predict: number[]
}
//レポートのグラフデータ
export type LineWithAverageType = {
electricBill: electricBillType
}

