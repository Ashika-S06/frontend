import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getCompaniesAPI } from '../services/api';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getCompaniesAPI().then(r => setCompanies(r.data.data)).catch(console.error);
  }, []);

  const filtered = companies.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div data-testid="companies-page">
      <Navbar />
      <div style={{ padding: 32 }}>
        <h2>Companies ({companies.length})</h2>
        <input data-testid="search-company" placeholder="Search company..." value={search}
          onChange={e => setSearch(e.target.value)} style={input} />
        <table style={table}>
          <thead>
            <tr style={th}>
              <th>ID</th><th>Name</th><th>Role</th><th>Package (LPA)</th><th>Min CGPA</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c._id} data-testid={`company-row-${c._id}`} style={{ borderBottom: '1px solid #eee' }}>
                <td style={td}>{c.companyId}</td>
                <td style={td}>{c.name}</td>
                <td style={td}>{c.role}</td>
                <td style={td}>{c.package}</td>
                <td style={td}>{c.minimumCgpa}</td>
                <td style={td}>{c.status}</td>
                <td style={td}><Link to={`/companies/${c._id}`} data-testid={`view-company-${c._id}`} style={link}>View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const input = { padding: '7px 12px', borderRadius: 4, border: '1px solid #ccc', fontSize: 14, marginBottom: 16 };
const table = { width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' };
const th = { background: '#1a1a2e', color: '#fff' };
const td = { padding: '10px 8px' };
const link = { color: '#3498db', textDecoration: 'none', fontWeight: 500 };
export default Companies;
