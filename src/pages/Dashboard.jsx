import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getStudentsAPI, getCompaniesAPI, getDrivesAPI, getApplicationsAPI, getPlacementAnalyticsAPI } from '../services/api';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const { state, dispatch } = useAppContext();
  const [stats, setStats] = useState({ students: 0, companies: 0, drives: 0, applications: 0 });
  const [analytics, setAnalytics] = useState(null);
  const [recentInterviews] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [s, c, d, a, an] = await Promise.all([
          getStudentsAPI({ limit: 1000 }),
          getCompaniesAPI(),
          getDrivesAPI(),
          getApplicationsAPI({ limit: 1000 }),
          getPlacementAnalyticsAPI()
        ]);
        dispatch({ type: 'SET_STUDENTS',    payload: s.data.data });
        dispatch({ type: 'SET_COMPANIES',   payload: c.data.data });
        dispatch({ type: 'SET_DRIVES',      payload: d.data.data });
        dispatch({ type: 'SET_APPLICATIONS', payload: a.data.data });
        dispatch({ type: 'SET_ANALYTICS',   payload: an.data.data });
        setStats({ students: s.data.total, companies: c.data.total, drives: d.data.total, applications: a.data.total });
        setAnalytics(an.data.data);
      } catch (err) { console.error(err); }
    };
    fetchAll();
  }, []);

  const upcoming = (state.drives || []).filter(d => d.status === 'open').slice(0, 5);

  return (
    <div data-testid="dashboard-page">
      <Navbar />
      <div style={{ padding: 32 }}>
        <h2 style={{ marginBottom: 24, color: '#1a1a2e' }}>Dashboard</h2>

        {/* Stats Cards */}
        <div data-testid="analytics-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
          <div data-testid="total-students-card" style={card('#3498db')}>
            <p style={num('#3498db')}>{stats.students}</p>
            <p style={label}>Total Students</p>
          </div>
          <div data-testid="total-companies-card" style={card('#2ecc71')}>
            <p style={num('#2ecc71')}>{stats.companies}</p>
            <p style={label}>Total Companies</p>
          </div>
          <div data-testid="total-drives-card" style={card('#e67e22')}>
            <p style={num('#e67e22')}>{stats.drives}</p>
            <p style={label}>Total Drives</p>
          </div>
          <div data-testid="total-applications-card" style={card('#9b59b6')}>
            <p style={num('#9b59b6')}>{stats.applications}</p>
            <p style={label}>Total Applications</p>
          </div>
        </div>

        {/* Placement Analytics Chart */}
        {analytics && (
          <div data-testid="placement-chart" style={section}>
            <h3 style={{ marginBottom: 16 }}>Placement Analytics</h3>
            <div style={{ display: 'flex', gap: 20 }}>
              {[
                { l: 'Total Applications', v: analytics.totalApplications, c: '#3498db' },
                { l: 'Shortlisted',        v: analytics.shortlistedCount,  c: '#e67e22' },
                { l: 'Selected',           v: analytics.selectedCount,     c: '#2ecc71' },
                { l: 'Rejected',           v: analytics.rejectedCount,     c: '#e74c3c' },
              ].map(s => (
                <div key={s.l} style={{ textAlign: 'center', flex: 1, background: '#f8f9fa', borderRadius: 6, padding: 16 }}>
                  <p style={{ fontSize: 28, fontWeight: 700, color: s.c, margin: 0 }}>{s.v}</p>
                  <p style={{ color: '#666', margin: '6px 0 0' }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Drives */}
        <div style={section}>
          <h3 style={{ marginBottom: 12 }}>Upcoming / Open Drives</h3>
          {upcoming.length === 0 ? <p style={{ color: '#999' }}>No open drives</p> : (
            <ul style={{ padding: 0, listStyle: 'none' }}>
              {upcoming.map(d => (
                <li key={d._id} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  <b>{d.title}</b> — {d.company?.name} | {d.location} | {d.mode}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Interviews */}
        <div data-testid="recent-interviews" style={section}>
          <h3 style={{ marginBottom: 12 }}>Recent Interviews</h3>
          {recentInterviews.length === 0
            ? <p style={{ color: '#999' }}>No recent interviews</p>
            : <p>{recentInterviews.length} interviews</p>
          }
        </div>
      </div>
    </div>
  );
};

const card = (c) => ({ background: '#fff', borderRadius: 8, padding: 24, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderTop: `4px solid ${c}` });
const num  = (c) => ({ fontSize: 32, fontWeight: 700, color: c, margin: 0 });
const label = { color: '#666', marginTop: 8 };
const section = { background: '#fff', borderRadius: 8, padding: 24, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' };

export default Dashboard;
