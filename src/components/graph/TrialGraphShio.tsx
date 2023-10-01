// 棒グラフ用のコンポーネントをインポート
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartDataset,
  ChartOptions,
  } from "chart.js"
  import { Bar } from "react-chartjs-2"
  import type { sellDataType } from "@/types/graph/dataTypes"
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
  
  // 定数
  enum BG_COLOR {
  GRAPH = "#519108", // グラフ
  BG = "rgba(0,0,0,0)", // 背景色を出したくないので透明値で設定
  }
  
  // TODO:ボーダー幅が4.51pxしかないため、Figma設定の8pxの丸みを持たせても表示に反映されているか分かり難い
  const BORDER_RADIUS = 8 // 枠線の丸み(ピクセル)
  const BAR_SIZE = 4.51 // グラフの太さ
  
  type TrialGraphShioProps = {
  sellData: sellDataType
  width: number
  height: number
  }
  
  // データセットにて使用する各プロパティ設定処理
  const getChargeDataset = (plusCount: number, plusFlag: boolean): ChartDataset<"bar"> => {
  let dataset = {} as ChartDataset<"bar">
  
  // 修正がプラスの場合
  if (plusFlag) {
  dataset = {
  data: [1 * plusCount], // グラフ表示データ
  backgroundColor: BG_COLOR.GRAPH, // 背景色と同じ色にする
  //左側と右側の角を丸くする
  borderSkipped: false,
  borderRadius: {
  bottomLeft: BORDER_RADIUS,
  bottomRight: BORDER_RADIUS,
  topLeft: BORDER_RADIUS,
  topRight: BORDER_RADIUS,
  },
  barThickness: BAR_SIZE, // グラフの表示幅を設定する
  }
  } else {
  // 収支がマイナスの場合
  // 収支がマイナスのデータを作成する。背景色がグラフの背景と同じにして、見せない
  dataset = {
  data: [1], // グラフ表示データ
  backgroundColor: BG_COLOR.BG, // 透明を指定する
  barThickness: BAR_SIZE, // グラフの表示幅を設定する
  }
  }
  
  return dataset
  }
  
  // データセットを作成する
  const getChargeDatasets = (chargeDatas: number[]): ChartDataset<"bar">[] => {
  let defDatasets = {} as ChartDataset<"bar">
  const retDatasets = [] as ChartDataset<"bar">[]
  let plusCount = 0
  
  chargeDatas.forEach((chargeData) => {
  if (chargeData <= 0) {
  //収支がマイナスの場合
  //今までプラスの個数分のデータを作成する
  if (plusCount > 0) {
  defDatasets = getChargeDataset(plusCount, true)
  retDatasets.push(defDatasets)
  plusCount = 0
  }
  // 収支がマイナスのデータを作成する。背景色を透明にして見せない
  defDatasets = getChargeDataset(plusCount, false)
  retDatasets.push(defDatasets)
  } else {
  // 収支がプラスだった場合
  plusCount = plusCount + 1
  }
  })
  
  // 収支がマイナスの場合にデータセットを作成するようにしているため、chargeDatasの最後の修正がプラスだった場合の考慮
  // 今までのプラスの個数分のデータを作成する
  if (plusCount > 0) {
  defDatasets = getChargeDataset(plusCount, true)
  retDatasets.push(defDatasets)
  }
  
  return retDatasets
  }
  
  const TrialGraphShio = ({ sellData, width, height }: TrialGraphShioProps) => {
  const graphData: ChartData<"bar"> = {
  labels: [""],
  datasets: getChargeDatasets(sellData),
  }
  
  // オプション
  const graphOption: ChartOptions<"bar"> = {
  indexAxis: "y",
  plugins: {
  // 凡例
  legend: {
  display: false,
  },
  // グラフタイトル
  title: {
  display: false,
  },
  // ツールチップ
  tooltip: {
  enabled: false,
  },
  },
  responsive: false,
  maintainAspectRatio: true,
  layout: {
  // グラフの表示位置を微調整する
  padding: {
  left: -20,
  top: 0,
  bottom: 0,
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
  display: false,
  },
  },
  y: {
  stacked: true, // 積上げ棒グラフとして表示する
  // グリッド線
  grid: {
  display: false, // グリッドを非表示に設定する
  },
  // 目盛り
  ticks: {
  display: false,
  },
  // グラフを余白なしに左端から描画する
  // スケールをキャンバスにフィットさせた後に呼ばれるコールバック(afterFit)
  afterFit: (axis: { paddingTop: number; paddingBottom: number; paddingRight: number; paddingLeft: number }) => {
  axis.paddingTop = 0
  axis.paddingBottom = 0
  axis.paddingRight = 0
  axis.paddingLeft = 0
  },
  },
  },
  }
  
  return
  }
  
  export default TrialGraphShio