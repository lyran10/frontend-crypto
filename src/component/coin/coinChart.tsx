import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Loading } from "../utils/loading";
import { chartDays } from "./data";
import { SelectButton } from "./selectedButton";
import { historicalChart } from "../redux/actions";
import { period } from "../redux/reducer";
import { useRedux } from "../../customHooks/useRedux";
Chart.register(CategoryScale);

type Props = {
  id: string | undefined;
};

export const CoinChart = ({ id }: Props) => {
  const [methods] = useRedux()
  const [days, setdays] = useState(1);
  const currency = methods.selector((state) => state.data.currency);
  const chartData = methods.selector((state) => state.data.chartData);

  useEffect(() => {
    methods.dispatch(historicalChart({ currency, days, id }));
  }, [currency, days]);

  return (
    <section className="flex p-[30px] flex-col gap-3 mt-10 justify-center h-[90%] items-center w-[100%] text-offWhite">
      {!chartData ? (
        <Loading />
      ) : (
        <Line
          data={{
            labels: chartData.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
                  : `${date.getHours()} : ${date.getMinutes()} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: chartData.map((coin) => coin[1]),
                label: `Price (Past ${days} ${
                  days === 1 ? "Day" : "Days"
                }) in ${currency}`,
                borderColor: "#EEBC1D",
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            elements: {
              point: {
                radius: 2.5,
              },
            },
          }}
        />
      )}
      <div className="flex gap-2 flex-wrap mb-3">
        {chartDays.map((data, index) => {
          return (
            <SelectButton
              key={index}
              onClick={() => {
                methods.dispatch(period(data.value));
                setdays(data.value);
              }}
              selected={data.value === days}
            >
              <span>{data.label}</span>
            </SelectButton>
          );
        })}
      </div>
    </section>
  );
};
