import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getMeAPI } from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getMeAPI().then(r => setUser(r.data.data)).catch(console.error);
  }, []);

  if (!user) return <div><Navbar /><div style={{ padding: 32 }}>Loading...</div></div>;

  return (
    <div data-testid="profile-page">
      <Navbar />
      <div style={{ padding: 32 }}>
        <div style={card}>
          <h2>My Profile</h2>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>
          <p><b>Member since:</b> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</p>
        </div>
      </div>
    </div>
  );
};

const card = { background: '#fff', borderRadius: 8, padding: 24, maxWidth: 400, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' };
export default Profile;
