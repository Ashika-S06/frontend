import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getPlacementAnalyticsAPI, getDepartmentAnalyticsAPI, getCompanyAnalyticsAPI } from '../services/api';
import { useAppContext } from '../context/AppContext';

const Analytics = () => {
  const { dispatch } = useAppContext();
  const [placement, setPlacement] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [p, d, c] = await Promise.all([
          getPlacementAnalyticsAPI(),
          getDepartmentAnalyticsAPI(),
          getCompanyAnalyticsAPI()
        ]);
        setPlacement(p.data.data);
        setDepartments(d.data.data);
        setCompanies(c.data.data);
        dispatch({ type: 'SET_ANALYTICS', payload: { placement: p.data.data, departments: d.data.data, companies: c.data.data } });
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, []);

  return (
    <div data-testid="analytics-page">
      <Navbar />
      <div style={{ padding: 32 }}>
        <h2>Analytics</h2>

        {placement && (
          <div style={{ marginBottom: 32 }}>
            <h3>Placement Overview</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[
                { label: 'Total Applications', value: placement.totalApplications, color: '#3498db', testid: 'total-applications' },
                { label: 'Shortlisted', value: placement.shortlistedCount, color: '#e67e22', testid: 'shortlisted-count' },
                { label: 'Selected', value: placement.selectedCount, color: '#2ecc71', testid: 'selected-count' },
                { label: 'Rejected', value: placement.rejectedCount, color: '#e74c3c', testid: 'rejected-count' },
              ].map(s => (
                <div key={s.testid} data-testid={s.testid} style={{ background: '#fff', borderRadius: 8, padding: 20, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', borderTop: `4px solid ${s.color}` }}>
                  <p style={{ fontSize: 28, fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
                  <p style={{ color: '#666', marginTop: 6 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div data-testid="department-analytics">
            <h3>Department-wise Placement</h3>
            <table style={table}>
              <thead>
                <tr style={th}>
                  <th style={thCell}>Department</th>
                  <th style={thCell}>Placed Count</th>
                  <th style={thCell}>Placement %</th>
                </tr>
              </thead>
              <tbody>
                {departments.map(d => (
                  <tr key={d.department} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={td}>{d.department}</td>
                    <td style={td}>{d.placedCount}</td>
                    <td style={td}>{d.placementPercentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div data-testid="company-analytics">
            <h3>Company-wise Analytics</h3>
            <table style={table}>
              <thead>
                <tr style={th}>
                  <th style={thCell}>Company</th>
                  <th style={thCell}>Package (LPA)</th>
                  <th style={thCell}>Participants</th>
                  <th style={thCell}>Selected</th>
                </tr>
              </thead>
              <tbody>
                {companies.map(c => (
                  <tr key={c._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={td}>{c.companyName}</td>
                    <td style={td}>{c.highestPackage}</td>
                    <td style={td}>{c.participationCount}</td>
                    <td style={td}>{c.selectedStudents}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const table = { width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' };
const th = { background: '#1a1a2e', color: '#fff' };
const thCell = { padding: '10px 8px', textAlign: 'left' };
const td = { padding: '10px 8px' };
export default Analytics;
