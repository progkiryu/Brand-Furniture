import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

type DateRange = "lastmonth" | "last6months" | "last12months" | "last2years";

interface BarChartComponentProps {
  dateRange: DateRange;
}

// dummy data generator
const generateData = (range: string) => {
  const data = [];
  const today = new Date();

  const formatDate = (date: Date, format: string) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dayOfWeek = date.getDay();

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let formattedString = format;
    if (format.includes("MMM")) {
      formattedString = formattedString.replace("MMM", monthNames[month]);
    }
    if (format.includes("D")) {
      formattedString = formattedString.replace("D", day.toString());
    }
    if (format.includes("YYYY")) {
      formattedString = formattedString.replace("YYYY", year.toString());
    }
    if (format.includes("ddd")) {
      formattedString = formattedString.replace("ddd", dayNames[dayOfWeek]);
    }
    return formattedString;
  };

  switch (range) {
    case "lastmonth":
      const lastMonthDate = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
      );
      const daysInLastMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();

      for (let i = 0; i < daysInLastMonth; i++) {
        const date = new Date(
          lastMonthDate.getFullYear(),
          lastMonthDate.getMonth(),
          i + 1
        );
        data.push({
          name: formatDate(date, "MMM D"),
          value: Math.floor(Math.random() * 100), //this line generates dummy data
        });
      }
      break;

    case "last6months":
      for (let i = 5; i >= 0; i--) {
        const monthDate = new Date(
          today.getFullYear(),
          today.getMonth() - i,
          1
        );
        data.push({
          name: formatDate(monthDate, "MMM YYYY"),
          value: Math.floor(Math.random() * 100),
        });
      }
      break;

    case "last12months":
      for (let i = 11; i >= 0; i--) {
        const monthDate = new Date(
          today.getFullYear(),
          today.getMonth() - i,
          1
        );
        data.push({
          name: formatDate(monthDate, "MMM YYYY"),
          value: Math.floor(Math.random() * 100),
        });
      }
      break;

    case "last2years":
      for (let i = 23; i >= 0; i--) {
        const monthDate = new Date(
          today.getFullYear(),
          today.getMonth() - i,
          1
        );
        data.push({
          name: formatDate(monthDate, "MMM YYYY"),
          value: Math.floor(Math.random() * 100),
        });
      }
      break;
  }
  return data;
};

export default function BarChartComponent({
  dateRange,
}: BarChartComponentProps) {
  const data = generateData(dateRange);
  // console.log("Bar chart data:", data);

  return (
    <div style={{ marginBottom: "40px" }}>
      <BarChart
        width={600}
        height={200}
        data={data}
        margin={{ top: 5, right: 30, bottom: 5, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#1B263B" />
      </BarChart>
    </div>
  );
}
