import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    const res = await axios.get("/leads");
    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const campaignData = leads.reduce((acc, lead) => {
    acc[lead.campaign] = (acc[lead.campaign] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(campaignData),
    datasets: [{
      label: "Leads by Campaign",
      data: Object.values(campaignData),
      backgroundColor: "rgba(75,192,192,0.6)",
    }]
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Leads Overview</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default Dashboard;
