import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend,
Tick,
ChartData,
ChartOptions,
ChartDataset,
Plugin,
PointElement,
LineElement,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import type { LineWithAverageType } from "@/types/graph/dataTypes"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement)

// 背景色
enum BG_COLOR {
GRAPH = "#FFFFFF", // グラフの背景色
AVERAGE = "#478549", // 平均の背景色
USED = "#478549", // 使った電気の背景色
PREDICT = "#E6D119", // 予想の背景色
X_TICK = "#FFFFFF", //横軸の目盛りの背景色
}

// グラフの目盛りで使用するフォント設定
const FONT_FAMILY = "PUDGoDp2019Mt"
const FONT_SIZE = 12
const FONT_LINEHEIGHT = 0.5
const FONT_COLOR = "#666666"

type UsageGraphProps = {
usageData: LineWithAverageType
width: number
height: number
}

// デザイン・コーディングでは、このコンポーネントを作成する
const LineWithAverage = ({ usageData, width, height }: UsageGraphProps) => {
//使用のグラフと予想のグラフで色を変える
const backColor = []
for (let i = 0; i < usageData.electricBill.usage.length; i++) {
backColor.push(BG_COLOR.USED)
}
for (let i = 0; i < usageData.electricBill.predict.length; i++) {
backColor.push(BG_COLOR.PREDICT)
}
const lineDataSet: ChartDataset<"line", number[]> = {
// 折れ線グラフ
type: "line", //使用するグラフの型
data: usageData.electricBill.average, // グラフ表示データ
borderColor: BG_COLOR.AVERAGE, //線の色
backgroundColor: BG_COLOR.AVERAGE, //線とグラフの交差点の●
tension: 0.3, //折れ目をカクカクにする 0：カクカク 1：めちゃくちゃ曲がる
pointRadius: 0, //ポイントの円の大きさを指定
}
const barDataSet: ChartDataset<"bar", number[]> = {
// 棒グラフ
type: "bar", //使用するグラフの型
data: usageData.electricBill.usage.concat(usageData.electricBill.predict), // グラフ表示データ 予測と使用の両方
borderColor: backColor, //棒グラフの色
backgroundColor: backColor, //棒グラフの背景色
}

const data: ChartData<"bar"> = {
// x 軸のラベル
labels: [
"1",
"2",
"3",
"4",
"5",
"6",
"7",
"8",
"9",
"10",
"11",
"12",
"13",
"14",
"15",
"16",
"17",
"18",
"19",
"20",
"21",
"22",
"23",
"24",
"25",
"26",
"27",
"28",
"29",
"30",
"31",
],

datasets: [lineDataSet as any, barDataSet], // as anyは棒グラフ型で線グラフをセットする時のエラー回避
}

// オプション
const options: ChartOptions<"bar"> = {
plugins: {
// 凡例
legend: {
display: false,
},
// グラフタイトル
title: {
display: false,
},
},
layout: {
padding: {
left: 20,
right: 20,
top: 60,
bottom: 20,
},
},
scales: {
x: {
stacked: false, // 積上げ棒グラフとして表示する
grid: {
display: true, // グリッドを非表示に設定する
},
max: 31,
min: 1,
// 目盛り
ticks: {
display: true,
callback: (value: number) => {
if (value == 1 || value == 15) {
return value
} else if (value == 31) {
return value + "日"
} else {
return ""
}
},
color: FONT_COLOR,
stepSize: 15, // 目盛りを表示する間隔を指定する
maxRotation: 0, //目盛りの傾き
},
},
y: {
stacked: false, // 積上げ棒グラフとして表示する
// グリッド線
grid: {
display: true, // グリッド線を表示するが、グリッド線を幅一杯に広げるので、ここでは出さない設定にする
},
// 目盛り
ticks: {
display: true,
maxTicksLimit: 3,
font: {
family: FONT_FAMILY,
size: FONT_SIZE,
lineHeight: FONT_LINEHEIGHT,
},
color: FONT_COLOR,
padding: 5,
},
},
},
}

// 拡張機能
const graphPlugins: Plugin[] = [
{
id: "setGraphBgColor",
beforeDraw: (chart: ChartJS) => {
const ctx = chart.ctx
// グラフの背景色を白色に設定する
ctx.fillStyle = BG_COLOR.GRAPH
ctx.fillRect(0, 0, chart.width, chart.height - 40)

    // 横軸の目盛り部分の高さを取得する
    const xAxis = chart.scales.x
    const xAxisHeight = xAxis.height
    // 横軸の目盛り部分の背景色を設定する。横軸の目盛り分の高さ分だけだと、窮屈な感じがするので微調整する
    ctx.fillStyle = BG_COLOR.X_TICK
    ctx.fillRect(0, chart.height - 40, chart.width, xAxisHeight + 5)
  },
},
]

return
}

export default LineWithAverage