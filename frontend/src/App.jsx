import React, { useEffect, useState } from 'react';
import LeadForm from './components/LeadForm';
import LeadTable from './components/LeadTable';
import LeadChart from './components/LeadChart';
import axios from './api/axios';

const App = () => {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    const res = await axios.get('/leads');
    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleAddLead = newLead => {
    setLeads(prev => [...prev, newLead]);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Lead Generation Dashboard</h1>
      <LeadForm onAdd={handleAddLead} />
      <LeadTable leads={leads} />
      <LeadChart leads={leads} />
    </div>
  );
};

export default App;
