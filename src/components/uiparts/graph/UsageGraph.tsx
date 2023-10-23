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
  } from "chart.js"
  import { Bar } from "react-chartjs-2"
  import type { UsageDataType } from "@/types/graph/dataTypes"
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
  
  // 背景色
  enum BG_COLOR {
  GRAPH = "#FFFFFF", // グラフの背景色
  GENERATION = "#2E4066", // 発電の背景色
  CHARGE = "#4183E8", // 蓄電の背景色
  BUYING = "#8AB0FD", // 買電の背景色
  X_TICK = "#E5E5E5", //横軸の目盛りの背景色
  }
  
  const COLOR_Y_GRID_BORDER = "#D1D7ED" // Y軸のグリッド線の色
  const FONT_COLOR_TICK = "#666666" //目盛りの文字色
  
  // グラフの目盛りで使用するフォント設定
  const FONT_FAMILY = "PUDGoDp2019Mt"
  const FONT_SIZE = 14
  const FONT_LINEHEIGHT = 0.5
  
  const CHANGE_TICK_UMIT = 0.001 //Y軸の目盛りを変更する割合(データはワットでくるが表示はキロワットのため)
  
  type UsageGraphProps = {
  usageData: UsageDataType
  width: number
  height: number
  }
  
  const BORDER_RADIUS = 7 // 棒グラフの上部分の角を丸くする設定
  const BAR_THICKNESS = 10.67 // グラフの表示幅
  
  // デザイン・コーディングでは、このコンポーネントを作成する
  const UsageGraph = ({ usageData, width, height }: UsageGraphProps) => {
  const data: ChartData<"bar"> = {
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
  "時",
  ],
  
  datasets: [
    {
      label: "発電",
      data: usageData.generation, // グラフ表示データ
      backgroundColor: BG_COLOR.GENERATION, // 発電の背景色
      borderRadius: BORDER_RADIUS, // 棒グラフの上部分の角を丸くする
      barThickness: BAR_THICKNESS, // グラフの表示幅を設定する
    },
    {
      label: "蓄電",
      data: usageData.charge, // グラフ表示データ
      backgroundColor: BG_COLOR.CHARGE, // 蓄電の背景色
      borderRadius: BORDER_RADIUS, // 棒グラフの上部分の角を丸くする
      barThickness: BAR_THICKNESS, // グラフの表示幅を設定する
    },
    {
      label: "買電",
      data: usageData.buying, // グラフ表示データ
      backgroundColor: BG_COLOR.BUYING, // 買電の背景色
      borderRadius: BORDER_RADIUS, // 棒グラフの上部分の角を丸くする
      barThickness: BAR_THICKNESS, // グラフの表示幅を設定する
    },
  ],
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
  stacked: true, // 積上げ棒グラフとして表示する
  grid: {
  display: false, // グリッドを非表示に設定する
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
  if (value === 24) {
  return "時"
  } else if (value % 3 !== 0) {
  return ""
  } else {
  return value
  }
  },
  },
  },
  y: {
  stacked: true, // 積上げ棒グラフとして表示する
  // グリッド線
  grid: {
  display: false, // グリッド線を表示するが、グリッド線を幅一杯に広げるので、ここでは出さない設定にする
  },
  // 目盛り
  ticks: {
  display: true,
  font: {
  family: FONT_FAMILY,
  size: FONT_SIZE,
  lineHeight: FONT_LINEHEIGHT,
  },
  padding: 10,
  stepSize: 2500, // 目盛りを表示する間隔を指定する
  // 縦軸の目盛りをクリアする
  callback: (_value: string) => "",
  },
  },
  },
  }
  
  // 拡張機能
  const graphPlugins: Plugin[] = [
  {
  id: "setTickImages",
  // 横軸の目盛りの表示を動的に変更する
  afterDraw: (chart: ChartJS) => {
  const ctx = chart.ctx
  const xAxis = chart.scales.x
  const yAxis = chart.scales.y
  xAxis.ticks.forEach((_tick: Tick, index: number) => {
  const x = xAxis.getPixelForTick(index)
  // 3で割り切れない場合、横軸の目盛りをイメージに変更する
  if (index % 3 !== 0) {
  const image = new Image()
  image.src = "/img/ico_dot.svg"
  // 目盛りのイメージが真ん中にくるように微調整する
  ctx.drawImage(image, x - 3, yAxis.bottom + 13)
  }
  })
  },
  },
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
  {
    id: "drawGrid",
    beforeDraw: (chart: ChartJS) => {
      const ctx = chart.ctx
      const yAxis = chart.scales.y
      // 横のグリッド線をグラフ幅一杯まで広げて描画する
      yAxis.ticks.forEach((tick: Tick, index: number) => {
        const y = yAxis.getPixelForTick(index)
        ctx.fillStyle = COLOR_Y_GRID_BORDER
        ctx.fillRect(0, y, chart.width, 1)
  
        ctx.font = FONT_SIZE + "px " + FONT_FAMILY
        ctx.textAlign = "left"
        ctx.fillStyle = FONT_COLOR_TICK
        // 縦軸の目盛りを再計算する(データはワットでくるが表示はキロワットのため)
        // グリッド線より上に出すので微調整する
        ctx.fillText(String(tick.value * CHANGE_TICK_UMIT), 17, y - 5, 100)
      })
    },
  },
  ]
  
  return
  }
  
  export default UsageGraph