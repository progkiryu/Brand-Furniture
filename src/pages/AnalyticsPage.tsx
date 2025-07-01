import React, { useState } from "react";
import LineChartComponent from "../components/analytics-page/LineChartComponent";
import OrderTypeDistributionChart from "../components/analytics-page/OrderTypeDistribution";

export default function AnalyticsPage() {
    return (
        <div className="analytics-page" 
        style={{
            background: "#fff",
            color: "#000",
            minHeight: "100vh",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}
      >
      <h1>Analytics</h1>

      <div className="orderTypeDistribution" 
      style={{ 
        border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "40px",
          textAlign: "center", 
          }}
        >
        <h2>Order Type Distribution</h2>
        <OrderTypeDistributionChart />
        </div>

        <div className="line-charts" 
        style={{ 
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            width: "100%",
            maxWidth: "800px", 
            }}
            >
            <LineChartComponent title="Monthly Job Completion" dateRange={"lastmonth"} />
            <LineChartComponent title="Monthly Order Volume" dateRange={"lastmonth"} />
      </div>
    </div>
  );
};