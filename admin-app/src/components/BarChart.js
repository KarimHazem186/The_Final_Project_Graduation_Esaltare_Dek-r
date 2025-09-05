import React, { useEffect } from "react";
import { Column } from "@ant-design/plots";
import axios from "axios";
import { useTranslation } from "react-i18next";

const BarChart = () => {
  const { t } = useTranslation();

  const data = [
    { name: "Inhouse", month: "Jan.", sales: 18 },
    { name: "Inhouse", month: "Feb.", sales: 28 },
    { name: "Inhouse", month: "Mar.", sales: 39 },
    { name: "Inhouse", month: "Apr.", sales: 81 },
    { name: "Inhouse", month: "May.", sales: 40 },
    { name: "Inhouse", month: "Jun.", sales: 50 },
    { name: "Inhouse", month: "Jul.", sales: 33 },
    { name: "Inhouse", month: "Aug.", sales: 47 },
    { name: "Inhouse", month: "Sep.", sales: 55 },
    { name: "Inhouse", month: "Oct.", sales: 60 },
    { name: "Inhouse", month: "Nov.", sales: 72 },
    { name: "Inhouse", month: "Dec.", sales: 90 },
    { name: "Vendor", month: "Jan.", sales: 8 },
    { name: "Vendor", month: "Feb.", sales: 18 },
    { name: "Vendor", month: "Mar.", sales: 39 },
    { name: "Vendor", month: "Apr.", sales: 71 },
    { name: "Vendor", month: "May.", sales: 30 },
    { name: "Vendor", month: "Jun.", sales: 20 },
    { name: "Vendor", month: "Jul.", sales: 23 },
    { name: "Vendor", month: "Aug.", sales: 37 },
    { name: "Vendor", month: "Sep.", sales: 45 },
    { name: "Vendor", month: "Oct.", sales: 50 },
    { name: "Vendor", month: "Nov.", sales: 62 },
    { name: "Vendor", month: "Dec.", sales: 80 },
  ];

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("https://api.com/sales-data");
  //       setData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);



  const config = {
    data,
    xField: "month",
    yField: "sales",
    colorField: "name",
    color: ({ name }) => (name === "Inhouse" ? "#294f85" : "#ff7f0e"),
    group: true,
    label: {
      position: "top",
      content: ({ sales }) => `${sales}`,
      style: {
        fontSize: 12,
        fill: "#000000",
      },
    },
    xAxis: {
      label: {
        autoRotate: true,
        style: {
          fontSize: 12,
          fill: "#000000",
        },
      },
    },
    meta: {
      month: {
        alias: t('month'),
      },
      sales: {
        alias: t('income'),
      },
    },
    legend: {
      position: "top",
      layout: "horizontal",
    },
    onReady: (chartInstance) => {
      chartInstance.chart.on("afterrender", () => {
        console.log("Chart rendered successfully");
      });
    },
  };

  return <Column {...config} />;
};

export default BarChart;


















