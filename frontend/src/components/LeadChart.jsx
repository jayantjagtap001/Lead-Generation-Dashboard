import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#B33F62'];

const LeadChart = ({ leads }) => {
  // Summarize by Campaign
  const campaignData = leads.reduce((acc, lead) => {
    const found = acc.find(item => item.campaign === lead.campaign);
    if (found) found.leadScore += Number(lead.leadScore);
    else acc.push({ campaign: lead.campaign, leadScore: Number(lead.leadScore) });
    return acc;
  }, []);

  // Summarize by Source
  const sourceData = leads.reduce((acc, lead) => {
    const found = acc.find(item => item.source === lead.source);
    if (found) found.count += 1;
    else acc.push({ source: lead.source, count: 1 });
    return acc;
  }, []);

  // LineChart: Lead Score over time
  const dateData = leads.map(lead => ({
    date: lead.date,
    leadScore: Number(lead.leadScore)
  })).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="space-y-12 mt-8">

      {/* Bar Chart */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-4">Lead Scores by Campaign</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={campaignData}>
            <XAxis dataKey="campaign" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="leadScore" fill="#3182ce" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-4">Leads Distribution by Source</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={sourceData}
              dataKey="count"
              nameKey="source"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {sourceData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-4">Lead Score Trends Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dateData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="leadScore" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Area Chart */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-4">Cumulative Lead Scores by Campaign</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={campaignData}>
            <XAxis dataKey="campaign" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="leadScore" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default LeadChart;
