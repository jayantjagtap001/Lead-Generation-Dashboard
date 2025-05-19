import React, { useState } from 'react';
import axios from '../api/axios';

const LeadForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    campaign: '',
    source: '',
    date: '',
    leadScore: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/leads', formData);
      onAdd(res.data);
      setFormData({ name: '', campaign: '', source: '', date: '', leadScore: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to add lead.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg space-y-4 mb-6">
      <h2 className="text-xl font-semibold">Add New Lead</h2>
      {['name', 'campaign', 'source', 'date', 'leadScore'].map(field => (
        <input
          key={field}
          type={field === 'date' ? 'date' : field === 'leadScore' ? 'number' : 'text'}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Lead</button>
    </form>
  );
};

export default LeadForm;
