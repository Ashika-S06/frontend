import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getDrivesAPI, createDriveAPI } from '../services/api';
import { useAppContext } from '../context/AppContext';

const Drives = () => {
  const { state } = useAppContext();
  const navigate = useNavigate();
  const [drives, setDrives] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const limit = 10;
  const isAdmin = ['admin', 'placement_officer'].includes(state.authUser);

  const fetchDrives = async () => {
    try {
      const params = { page, limit };
      if (status) params.status = status;
      if (search) params.company = search;
      const res = await getDrivesAPI(params);
      const data = res.data.data || [];
      setDrives(data);
      setTotal(res.data.total || data.length);
      setTotalPages(Math.ceil((res.data.total || data.length) / limit));
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchDrives(); }, [page, status, search]);

  return (
    <div data-testid="drives-page">
      <Navbar />
      <div style={{ padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2>Drives ({total})</h2>
          {isAdmin && (
            <Link to="/drives/new" data-testid="create-drive-btn"
              style={{ background: '#1a1a2e', color: '#fff', padding: '8px 18px', borderRadius: 4, textDecoration: 'none' }}>
              + Create Drive
            </Link>
          )}
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <input
            data-testid="drive-search"
            placeholder="Search by company..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            style={inp}
          />
          <select
            data-testid="filter-drive-status"
            value={status}
            onChange={e => { setStatus(e.target.value); setPage(1); }}
            style={inp}
          >
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        <div data-testid="drive-list">
          <table style={table}>
            <thead>
              <tr style={thead}>
                <th style={th}>Drive ID</th><th style={th}>Title</th><th style={th}>Company</th>
                <th style={th}>Mode</th><th style={th}>Location</th><th style={th}>Status</th><th style={th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {drives.map(d => (
                <tr key={d._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={tdS}>{d.driveId}</td>
                  <td style={tdS}>{d.title}</td>
                  <td style={tdS}>{d.company?.name}</td>
                  <td style={tdS}>{d.mode}</td>
                  <td style={tdS}>{d.location}</td>
                  <td style={tdS}><span style={badge(d.status)}>{d.status}</span></td>
                  <td style={tdS}>
                    <Link to={`/drives/${d._id}`} style={link}>View</Link>
                    {!isAdmin && (
                      <Link to={`/applications/new?drive=${d._id}`} data-testid="apply-btn"
                        style={{ ...link, marginLeft: 10, background: '#2ecc71', color: '#fff', padding: '3px 10px', borderRadius: 4, textDecoration: 'none' }}>
                        Apply
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
const tdS   = { padding: '10px 8px' };
const link  = { color: '#3498db', textDecoration: 'none', fontWeight: 500 };
const btn   = { padding: '6px 14px', borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer', background: '#fff' };
const badge = s => {
  const c = { open: '#2ecc71', closed: '#e74c3c', completed: '#95a5a6', upcoming: '#3498db' }[s] || '#999';
  return { background: c, color: '#fff', padding: '2px 8px', borderRadius: 12, fontSize: 12 };
};

export default Drives;
