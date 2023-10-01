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
  Plugin,
  PointElement,
  LineElement,
  } from "chart.js"
  import { Line } from "react-chartjs-2"
  import { Bar } from "react-chartjs-2"
  import type { LineGraphDataType } from "@/types/graph/dataTypes"
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement)
  
  // 背景色
  enum BG_COLOR {
  GRAPH = "#FFFFFF", // グラフの背景色
  GENERATION = "#CC5500", // 発電の背景色
  USAGE = "#CCCCCC", // 蓄電の背景色
  X_TICK = "#FFFFFF", //横軸の目盛りの背景色
  }
  
  // グラフの目盛りで使用するフォント設定
  const FONT_FAMILY = "PUDGoDp2019Mt"
  const FONT_SIZE = 14
  const FONT_LINEHEIGHT = 0.5
  const FONT_X_COLOR = "rgba(0, 0, 0, 0.6)"
  const FONT_Y_COLOR = "rgba(0, 0, 0, 0.3)"
  
  type UsageGraphProps = {
  usageData: LineGraphDataType
  width: number
  height: number
  }
  
  // デザイン・コーディングでは、このコンポーネントを作成する
  const LineGraph = ({ usageData, width, height }: UsageGraphProps) => {
  const data: ChartData<"line"> = {
  // x 軸のラベル
  labels: [
  "0",
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
  ],
  
  datasets: [
    {
      type: "line", //使用するグラフの型
      label: "発電量予測",
      data: usageData.generation, // グラフ表示データ
      borderColor: BG_COLOR.GENERATION, //線の色
      backgroundColor: BG_COLOR.GENERATION, //線とグラフの交差点の●
      tension: 0.3, //折れ目をカクカクにする 0：カクカク 1：めちゃくちゃ曲がる
      pointRadius: 0, //ポイントの円の大きさを指定
    },
    {
      type: "line", //使用するグラフの型
      label: "使用電力予測",
      data: usageData.usage, // グラフ表示データ
      borderColor: BG_COLOR.USAGE, //線の色
      backgroundColor: BG_COLOR.USAGE, //線とグラフの交差点の●
      tension: 0.3, //折れ目をカクカクにする 0：カクカク 1：めちゃくちゃ曲がる
      pointRadius: 0, //ポイントの円の大きさを指定
      borderDash: [5, 5], //点線でグラフを表示する
    },
  ],
  }
  
  // オプション
  const options: ChartOptions<"line"> = {
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
  // 目盛り
  ticks: {
  display: true,
  font: {
  family: FONT_FAMILY,
  size: FONT_SIZE,
  lineHeight: FONT_LINEHEIGHT,
  },
  callback: (value: number) => {
  if (value % 6 !== 0) {
  return ""
  } else {
  return value + "時"
  }
  },
  color: FONT_X_COLOR,
  stepSize: 12, // 目盛りを表示する間隔を指定する
  maxRotation: 0, //目盛りの傾き
  padding: 25,
  },
  },
  y: {
  stacked: false, // 積上げ棒グラフとして表示する
  // グリッド線
  grid: {
  display: true, // グリッド線を表示するが、グリッド線を幅一杯に広げるので、ここでは出さない設定にする
  },
  max: 1000,
  min: 0,
  // 目盛り
  ticks: {
  display: true,
  maxTicksLimit: 3,
  font: {
  family: FONT_FAMILY,
  size: FONT_SIZE,
  lineHeight: FONT_LINEHEIGHT,
  },
  color: FONT_Y_COLOR,
  padding: 10,
  stepSize: 500, // 目盛りを表示する間隔を指定する
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
  
  export default LineGraph