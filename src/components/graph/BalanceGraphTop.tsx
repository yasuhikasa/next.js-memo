import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Tick,
  ChartData,
  ChartOptions,
  ChartDataset,
  Plugin,
  ScaleOptions,
  } from "chart.js"
  import { Bar } from "react-chartjs-2"
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend)
  
  // 定数
  enum BG_COLOR {
  GRAPH = "#FFFFFF", // グラフ
  SELLING = "#089184", // 売電
  }
  enum BORDER_COLOR {
  GRID = "#E6E6E6", // グリッド線
  GENERATION = "#997300", // 発電
  }
  const FONT = {
  COLOR: "rgba(0, 0, 0, 0.6)", // 文字色
  FAMILY: "PUDGoDp2019Mt", // 使用フォント
  SIZE: 14, // フォントサイズ
  LINEHEIGHT: 0.5, // フォントの行間
  } as const
  
  const CHANGE_TICK_UNIT = 0.001 // 売電単位
  const TICKS_MAX_LENGTH = 3 // 縦目盛りの最大数
  const TICKS_MAX_VALUE = 7500 // 最大目盛りの想定値
  const TICKS_MAX_PLUS = 1000 // 目盛りの最大表示値に上乗せする値
  
  type BalanceGraphTopProps = {
  generationData: number[]
  sellingData: number[]
  sellingCost: number
  width: number
  height: number
  }
  
  const BalanceGraphTop = ({ generationData, sellingData, sellingCost, width, height }: BalanceGraphTopProps) => {
  const lineDataSet: ChartDataset<"line", number[]> = {
  // 折れ線グラフ
  type: "line",
  data: generationData,
  yAxisID: "y",
  label: "発電量",
  tension: 0.3,
  borderWidth: 2,
  borderColor: BORDER_COLOR.GENERATION,
  }
  const barDataSet: ChartDataset<"bar", number[]> = {
  // 棒グラフ
  type: "bar",
  data: sellingData,
  yAxisID: "y1",
  label: "売電",
  borderRadius: 10,
  maxBarThickness: 9.73,
  backgroundColor: BG_COLOR.SELLING,
  }
  const graphData: ChartData<"bar"> = {
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
  ],
  datasets: [lineDataSet as any, barDataSet], // as anyは棒グラフ型で線グラフをセットする時のエラー回避
  }
  
  // y軸用オプション設定
  // id=0:発電量（y）、id=1:売電（y1）
  const yScalesOptions = (id: number): ScaleOptions => {
  let maxValue = TICKS_MAX_VALUE // 実際に目盛りに表示させる最大値
  const barData = graphData.datasets[id].data as number[]
  
  // 目盛りの最大値から百の値を切り上げ、TICKS_MAX_PLUSを上乗せ
  maxValue = Math.ceil(Math.max(...barData) * 0.001) * 1000 + TICKS_MAX_PLUS
  // 上記で設定したmax値がTICKS_MAX_VALUE以下の場合、TICKS_MAX_VALUEでmax値を上書き
  maxValue = maxValue <= TICKS_MAX_VALUE ? TICKS_MAX_VALUE : maxValue
  
  return {
    display: true,
    position: id === 0 ? "right" : "left", // 目盛りの位置（0:右寄せ、1:左寄せ）
    min: 0,
    max: maxValue,
    ticks: {
      color: FONT.COLOR,
      font: {
        family: FONT.FAMILY,
        size: FONT.SIZE,
      },
      stepSize: maxValue / TICKS_MAX_LENGTH,
      // 0:小数点2桁を超える値の場合、目盛りの余白を調整
      padding: id === 0 && maxValue >= 13000 ? 5.7 : 10,
      crossAlign: "far",
      // 目盛りの値表示処理
      callback: (value: string, ticks: number) => {
        // 目盛りの位置が0または最大の場合は非表示
        if (ticks === 0 || ticks >= TICKS_MAX_LENGTH) {
          return ""
        }
        // 目盛りの単価計算（0:売電単位のみ乗算し小数点表示、1:売電単位からさらに単価を0.01倍で乗算し整数表示）
        const unitPrice = Number(value) * CHANGE_TICK_UNIT
        return id === 0 ? unitPrice.toFixed(1) : (unitPrice * (sellingCost * 0.01)).toFixed(0)
      },
    },
    grid: {
      display: false,
      drawOnChartArea: false,
    },
    afterFit: (axis: LinearScale) => {
      axis.paddingTop = 0
      axis.paddingBottom = 0
      // 目盛りの表示調整（0:右目盛り、1:左目盛り）
      id === 0 ? (axis.paddingRight = 62) : (axis.paddingLeft = 67)
    },
  }
  }
  // オプション
  const graphOption: ChartOptions<"bar"> = {
  scales: {
  x: {
  display: true,
  grid: {
  display: false,
  drawOnChartArea: false,
  tickLength: 0,
  },
  ticks: {
  display: false,
  },
  },
  y: yScalesOptions(0) as any, // as anyは複数軸使用すると出るエラーの回避
  y1: yScalesOptions(1) as any,
  },
  plugins: {
  legend: {
  display: false,
  },
  title: {
  display: false,
  },
  tooltip: {
  enabled: false,
  },
  },
  elements: {
  point: {
  radius: 0,
  },
  },
  }
  // 拡張機能
  const graphPlugins: Plugin[] = [
  {
  id: "bgDraw",
  beforeDraw: (chart: ChartJS) => {
  const ctxBg = chart.ctx
  ctxBg.fillStyle = BG_COLOR.GRAPH
  ctxBg.fillRect(0, 0, chart.width, chart.height)
  },
  },
  {
  id: "xGridBorderDraw",
  beforeDraw: (chart: ChartJS) => {
  const ctxBorder = chart.ctx
  const xAxis = chart.scales["x"]
  xAxis.ticks.forEach((_value: Tick, index: number) => {
  if (index === 0 || index % 3 === 0) {
  const x = xAxis.getPixelForTick(index)
  ctxBorder.fillStyle = BORDER_COLOR.GRID
  ctxBorder.fillRect(x, 0, 1, chart.height)
  ctxBorder.restore()
  }
  })
  },
  },
  {
  id: "yGridBorderDraw",
  beforeDraw: (chart: ChartJS) => {
  const ctxBorder = chart.ctx
  const yAxis = chart.scales["y"]
  const yAxisLength = yAxis.ticks.length - 1 // indexの最大値を取得
  
      yAxis.ticks.forEach((_value: Tick, index: number) => {
        if (index !== 0 && index !== yAxisLength) {
          const y = yAxis.getPixelForTick(index)
          ctxBorder.fillStyle = BORDER_COLOR.GRID
          ctxBorder.fillRect(0, y, chart.width, 1)
          ctxBorder.restore()
        }
      })
    },
  },
  ]
  
  return
  }
  
  export default BalanceGraphTop