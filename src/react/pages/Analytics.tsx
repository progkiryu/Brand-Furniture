import "../styles/Analytics.css";
import "../styles/Global.css";
import Navbar from "../components/Navbar";
import LineChartComponent from "../components/LineChartComponent";
import OrderTypeDistributionChart from "../components/OrderTypeDistribution";

function Analytics() {
    return (
        <>
            <Navbar />
            <div id="first-container">
              <div id="header-container">
                <h1>Analytics</h1>
              </div>

              <div className="orderTypeDistribution">
                <h2>Order Type Distribution</h2>
                <OrderTypeDistributionChart />
              </div>
                
            <div className="line-charts">
          <LineChartComponent title="Monthly Job Completion" dateRange={"lastmonth"} />
          <LineChartComponent title="Monthly Order Volume" dateRange={"lastmonth"} />
        </div>
      </div>
    </>
  );
}

export default Analytics;