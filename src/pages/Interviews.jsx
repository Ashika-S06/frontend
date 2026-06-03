import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import API from '../utils/axios';
import { useAppContext } from '../context/AppContext';

const Interviews = () => {
  const { state, dispatch } = useAppContext();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultMap, setResultMap] = useState({});
  const isAdmin = ['admin', 'placement_officer'].includes(state.authUser);

  const fetchInterviews = async () => {
    try {
      const res = await API.get('/interviews');
      const data = res.data.data || [];
      setInterviews(data);
      dispatch({ type: 'SET_INTERVIEWS', payload: data });
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchInterviews(); }, []);

  const handleResultChange = (id, val) => {
    setResultMap(m => ({ ...m, [id]: val }));
  };

  const updateResult = async (id) => {
    try {
      await API.patch(`/interviews/${id}`, { result: resultMap[id], status: 'completed' });
      fetchInterviews();
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div data-testid="interviews-page">
      <Navbar />
      <div style={{ padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2>Interviews ({interviews.length})</h2>
          {isAdmin && (
            <button
              data-testid="schedule-interview-btn"
              style={{ background: '#1a1a2e', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: 4, cursor: 'pointer' }}
              onClick={() => alert('Use POST /interviews API to schedule')}
            >
              + Schedule Interview
            </button>
          )}
        </div>

        <table data-testid="interview-table" style={table}>
          <thead>
            <tr style={thead}>
              <th style={th}>ID</th><th style={th}>Student</th><th style={th}>Company</th>
              <th style={th}>Round</th><th style={th}>Date</th><th style={th}>Status</th>
              <th style={th}>Result</th>{isAdmin && <th style={th}>Action</th>}
            </tr>
          </thead>
          <tbody>
            {interviews.map(i => (
              <tr key={i._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={td}>{i.interviewId}</td>
                <td style={td}>{i.application?.student?.name}</td>
                <td style={td}>{i.application?.drive?.company?.name}</td>
                <td style={td}>{i.round}</td>
                <td style={td}>{i.interviewDate ? new Date(i.interviewDate).toLocaleDateString() : '—'}</td>
                <td style={td}>{i.status}</td>
                <td style={td}>
                  {isAdmin ? (
                    <select
                      data-testid="interview-result-dropdown"
                      value={resultMap[i._id] ?? i.result}
                      onChange={e => handleResultChange(i._id, e.target.value)}
                      style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc' }}
                    >
                      <option value="pending">Pending</option>
                      <option value="pass">Pass</option>
                      <option value="fail">Fail</option>
                    </select>
                  ) : (
                    <span>{i.result}</span>
                  )}
                </td>
                {isAdmin && (
                  <td style={td}>
                    <button
                      onClick={() => updateResult(i._id)}
                      style={{ background: '#3498db', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: 4, cursor: 'pointer' }}
                    >
                      Save
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {interviews.length === 0 && <p style={{ color: '#999', marginTop: 20 }}>No interviews scheduled yet.</p>}
      </div>
    </div>
  );
};

const table = { width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' };
const thead = { background: '#1a1a2e', color: '#fff' };
const th    = { padding: '10px 8px', textAlign: 'left' };
const td    = { padding: '10px 8px' };

export default Interviews;
