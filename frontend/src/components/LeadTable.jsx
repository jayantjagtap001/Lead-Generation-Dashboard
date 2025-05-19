import React from 'react';

const LeadTable = ({ leads }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Leads Table</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Campaign</th>
            <th className="border px-4 py-2">Source</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Lead Score</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">{lead.name}</td>
              <td className="border px-4 py-2">{lead.campaign}</td>
              <td className="border px-4 py-2">{lead.source}</td>
              <td className="border px-4 py-2">{lead.date}</td>
              <td className="border px-4 py-2">{lead.leadScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
