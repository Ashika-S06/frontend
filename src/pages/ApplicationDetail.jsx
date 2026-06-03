import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getApplicationByIdAPI } from '../services/api';

const ApplicationDetail = () => {
  const { id } = useParams();
  const [app, setApp] = useState(null);

  useEffect(() => {
    getApplicationByIdAPI(id).then(r => setApp(r.data.data)).catch(console.error);
  }, [id]);

  if (!app) return <div><Navbar /><div style={{ padding: 32 }}>Loading...</div></div>;

  const { student, drive } = app;

  return (
    <div data-testid="application-detail-page">
      <Navbar />
      <div style={{ padding: 32 }}>
        <Link to="/applications" style={{ color: '#3498db' }}>← Back to Applications</Link>
        <div style={card}>
          <h2>Application: {app.applicationId}</h2>
          <h3>Student Info</h3>
          <p><b>Name:</b> {student?.name}</p>
          <p><b>Student ID:</b> {student?.studentId}</p>
          <p><b>Department:</b> {student?.department}</p>
          <p><b>CGPA:</b> {student?.cgpa}</p>
          <hr />
          <h3>Drive Info</h3>
          <p><b>Title:</b> {drive?.title}</p>
          <p><b>Company:</b> {drive?.company?.name}</p>
          <p><b>Mode:</b> {drive?.mode}</p>
          <p><b>Location:</b> {drive?.location}</p>
          <hr />
          <p><b>Current Round:</b> {app.currentRound}</p>
          <p><b>Status:</b> {app.status}</p>
          <p><b>Applied At:</b> {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

const card = { background: '#fff', borderRadius: 8, padding: 24, marginTop: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', maxWidth: 560 };
export default ApplicationDetail;
