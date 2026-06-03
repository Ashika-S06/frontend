import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getApplicationsAPI } from '../services/api';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const limit = 10;

  const fetchApps = async () => {
    try {
      const params = { page, limit };
      if (status) params.status = status;
      if (search) params.search = search;
      const res = await getApplicationsAPI(params);
      setApplications(res.data.data);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchApps(); }, [page, status, search]);

  const statusColor = { applied: '#3498db', shortlisted: '#e67e22', selected: '#2ecc71', rejected: '#e74c3c' };

  return (
    <div data-testid="applications-page">
      <Navbar />
      <div style={{ padding: 32 }}>
        <h2>Applications ({total})</h2>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <input
            placeholder="Search by company/student..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            style={inp}
          />
          <select
            data-testid="application-status-filter"
            value={status}
            onChange={e => { setStatus(e.target.value); setPage(1); }}
            style={inp}
          >
            <option value="">All Status</option>
            <option value="applied">Applied</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <table data-testid="application-table" style={table}>
          <thead>
            <tr style={thead}>
              <th style={th}>App ID</th><th style={th}>Student</th><th style={th}>Company</th>
              <th style={th}>Drive</th><th style={th}>Round</th><th style={th}>Status</th><th style={th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(a => (
              <tr key={a._id} data-testid="application-row" style={{ borderBottom: '1px solid #eee' }}>
                <td style={td}>{a.applicationId}</td>
                <td style={td}>{a.student?.name}</td>
                <td style={td}>{a.drive?.company?.name}</td>
                <td style={td}>{a.drive?.title}</td>
                <td style={td}>{a.currentRound}</td>
                <td style={td}>
                  <span style={{ background: statusColor[a.status] || '#999', color: '#fff', padding: '2px 8px', borderRadius: 12, fontSize: 12 }}>
                    {a.status}
                  </span>
                </td>
                <td style={td}><Link to={`/applications/${a._id}`} style={link}>View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
          <button data-testid="pagination-prev" onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1} style={btn}>Prev</button>
          <span>Page {page} of {totalPages}</span>
          <button data-testid="pagination-next" onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages} style={btn}>Next</button>
        </div>
      </div>
    </div>
  );
};

const inp   = { padding: '7px 12px', borderRadius: 4, border: '1px solid #ccc', fontSize: 14 };
const table = { width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' };
const thead = { background: '#1a1a2e', color: '#fff' };
const th    = { padding: '10px 8px', textAlign: 'left' };
const td    = { padding: '10px 8px' };
const link  = { color: '#3498db', textDecoration: 'none', fontWeight: 500 };
const btn   = { padding: '6px 14px', borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer', background: '#fff' };

export default Applications;
