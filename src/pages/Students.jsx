import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getStudentsAPI } from '../services/api';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [cgpaMin, setCgpaMin] = useState('');
  const [status, setStatus] = useState('');
  const limit = 10;

  const fetchStudents = async () => {
    try {
      const params = { page, limit };
      if (department) params.department = department;
      if (cgpaMin) params.cgpaMin = cgpaMin;
      if (status) params.status = status;
      if (search) params.search = search;
      const res = await getStudentsAPI(params);
      setStudents(res.data.data);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchStudents(); }, [page, department, cgpaMin, status, search]);

  return (
    <div data-testid="students-page">
      <Navbar />
      <div style={{ padding: 32 }}>
        <h2>Students ({total})</h2>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <input
            data-testid="student-search"
            placeholder="Search students..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            style={inp}
          />
          <select
            data-testid="student-filter"
            value={department}
            onChange={e => { setDepartment(e.target.value); setPage(1); }}
            style={inp}
          >
            <option value="">All Departments</option>
            {['CSE','IT','ECE','EEE','CIVIL','MECH','AI&DS','MBA'].map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <input
            data-testid="filter-cgpa"
            placeholder="Min CGPA"
            type="number"
            value={cgpaMin}
            onChange={e => { setCgpaMin(e.target.value); setPage(1); }}
            style={{ ...inp, width: 100 }}
          />
          <select
            data-testid="filter-status"
            value={status}
            onChange={e => { setStatus(e.target.value); setPage(1); }}
            style={inp}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <table data-testid="student-table" style={table}>
          <thead>
            <tr style={thead}>
              <th style={th}>ID</th><th style={th}>Name</th><th style={th}>Dept</th>
              <th style={th}>CGPA</th><th style={th}>Status</th><th style={th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s._id} data-testid="student-row" style={{ borderBottom: '1px solid #eee' }}>
                <td style={td}>{s.studentId}</td>
                <td style={td}>{s.name}</td>
                <td style={td}>{s.department}</td>
                <td style={td}>{s.cgpa}</td>
                <td style={td}><span style={badge(s.status)}>{s.status}</span></td>
                <td style={td}><Link to={`/students/${s._id}`} style={link}>View</Link></td>
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
const badge = s => ({ background: s === 'active' ? '#2ecc71' : '#e74c3c', color: '#fff', padding: '2px 8px', borderRadius: 12, fontSize: 12 });
const link  = { color: '#3498db', textDecoration: 'none', fontWeight: 500 };
const btn   = { padding: '6px 14px', borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer', background: '#fff' };

export default Students;
