import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getStudentByIdAPI } from '../services/api';

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    getStudentByIdAPI(id).then(r => setStudent(r.data.data)).catch(console.error);
  }, [id]);

  if (!student) return <div><Navbar /><div style={{ padding: 32 }}>Loading...</div></div>;

  return (
    <div data-testid="student-detail-page">
      <Navbar />
      <div style={{ padding: 32 }}>
        <Link to="/students" style={{ color: '#3498db' }}>← Back to Students</Link>
        <div style={card}>
          <h2 data-testid="student-name">{student.name}</h2>
          <p><b>Student ID:</b> {student.studentId}</p>
          <p><b>Email:</b> {student.email}</p>
          <p><b>Department:</b> {student.department}</p>
          <p><b>CGPA:</b> {student.cgpa}</p>
          <p><b>Phone:</b> {student.phone}</p>
          <p><b>Graduation Year:</b> {student.graduationYear}</p>
          <p><b>Status:</b> {student.status}</p>
          <p><b>Skills:</b> {student.skills?.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

const card = { background: '#fff', borderRadius: 8, padding: 24, marginTop: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', maxWidth: 500 };
export default StudentDetail;
