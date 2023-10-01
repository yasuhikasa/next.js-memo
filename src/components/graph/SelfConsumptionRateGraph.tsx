import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  LegendItem,
  } from "chart.js"
  import { Doughnut } from "react-chartjs-2"
  import type { SelfConsumptionRateDataType } from "@/types/graph/dataTypes"
  import styles from "./SelfConsumptionRateGraph.module.scss"
  
  ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend)
  
  type SelfConsumptionRateGraphProps = {
  selfConsumptionRateData: SelfConsumptionRateDataType
  generation: number
  selfConsumptionRate: number
  }
  
  // デザイン・コーディングでは、このコンポーネントを作成する
  const SelfConsumptionRateGraph = ({
  selfConsumptionRateData,
  generation,
  selfConsumptionRate,
  }: SelfConsumptionRateGraphProps) => {
  const dataBreakdownList = selfConsumptionRateData.data.map((item: number, index: number) => {
  return (
  
  {selfConsumptionRateData.dataChar[index]}
  
  {item}
  
  kWh
  
  
  )
  })
  const data: ChartData<"doughnut"> = {
  datasets: [
  {
  data: selfConsumptionRateData.data,
  backgroundColor: selfConsumptionRateData.backgroundColor,
  },
  ],
  labels: selfConsumptionRateData.dataChar,
  }
  
  const options: ChartOptions<"doughnut"> = {
  plugins: {
  // 凡例
  legend: {
  display: false,
  },
  // グラフタイトル
  title: {
  display: false,
  },
  tooltip: {
  enabled: false,
  },
  },
  // ドーナツの穴の大きさ。数字が大きいほど穴が大きくなる
  cutout: "80%",
  //animation :false,
  }
  
  // 凡例のデータ
  const dataLegend: ChartData<"doughnut"> = {
  datasets: [
  {
  data: selfConsumptionRateData.data,
  backgroundColor: selfConsumptionRateData.backgroundColor,
  hidden: true, //円グラフは表示しない
  },
  ],
  labels: selfConsumptionRateData.dataChar,
  }
  
  const optionsLegend: ChartOptions<"doughnut"> = {
  plugins: {
  // 凡例
  legend: {
  display: true,
  position: "left", //凡例をグラフの左に出す(ただし、ここではグラフは表示しない)
  align: "start",
  labels: {
  boxWidth: 16, //凡例の幅
  boxHeight: 16, //凡例の高さ
  padding: 17.1, //凡例間の余白
  
        generateLabels: () => {
          const legendItemAry: LegendItem[] = []
          selfConsumptionRateData.backgroundColor.forEach((bgcolor, index) => {
            const legendItem: LegendItem = {
              text: "", //凡例のラベルを出さないようにする
              fillStyle: bgcolor,
              strokeStyle: "rgba(0,0,0,0)", //凡例の枠線は透明に設定する
              datasetIndex: index,
            }
            legendItemAry.push(legendItem)
          })
          return legendItemAry
        },
      },
    },
    // グラフタイトル
    title: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  }
  
  return (
  
  
  {/* 凡例を表示せずグラフだけ表示する */}
  
    <div className={styles.circle_inner}>
      <div className={styles.generation}>
        <span className={styles.generation_lbl}>発電量</span>
        <span className={styles.generation_val}>{generation}</span>
        <span className={styles.generation_unt}>kWh</span>
      </div>
  
      <div className={styles.self_cons_rate}>
        <span className={styles.self_cons_rate_lbl}>自家消費率</span>
        <span className={styles.self_cons_rate_val}>{selfConsumptionRate}</span>
        <span className={styles.self_cons_rate_unt}>%</span>
      </div>
    </div>
    {/* データの内訳を表示 */}
    <div className={styles.data_breakdown}>
      <div className={styles.legend}>
        {/* 凡例だけを表示する */}
        <Doughnut data={dataLegend} options={optionsLegend} width={190} height={190} />
      </div>
      {dataBreakdownList}
    </div>
  </div>
  )
  }
  
  export default SelfConsumptionRateGraph