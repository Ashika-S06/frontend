import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getDriveByIdAPI } from '../services/api';

const DriveDetail = () => {
  const { id } = useParams();
  const [drive, setDrive] = useState(null);

  useEffect(() => {
    getDriveByIdAPI(id).then(r => setDrive(r.data.data)).catch(console.error);
  }, [id]);

  if (!drive) return <div><Navbar /><div style={{ padding: 32 }}>Loading...</div></div>;

  return (
    <div data-testid="drive-detail-page">
      <Navbar />
      <div style={{ padding: 32 }}>
        <Link to="/drives" style={{ color: '#3498db' }}>← Back to Drives</Link>
        <div style={card}>
          <h2 data-testid="drive-title">{drive.title}</h2>
          <p><b>Drive ID:</b> {drive.driveId}</p>
          <p><b>Company:</b> {drive.company?.name} ({drive.company?.companyId})</p>
          <p><b>Mode:</b> {drive.mode}</p>
          <p><b>Location:</b> {drive.location}</p>
          <p><b>Status:</b> {drive.status}</p>
          <p><b>Registration Deadline:</b> {drive.registrationDeadline ? new Date(drive.registrationDeadline).toLocaleDateString() : 'N/A'}</p>
          <p><b>Rounds:</b> {drive.rounds?.join(', ') || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

const card = { background: '#fff', borderRadius: 8, padding: 24, marginTop: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', maxWidth: 520 };
export default DriveDetail;
