import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getCompanyByIdAPI } from '../services/api';

const CompanyDetail = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    getCompanyByIdAPI(id).then(r => setCompany(r.data.data)).catch(console.error);
  }, [id]);

  if (!company) return <div><Navbar /><div style={{ padding: 32 }}>Loading...</div></div>;

  return (
    <div data-testid="company-detail-page">
      <Navbar />
      <div style={{ padding: 32 }}>
        <Link to="/companies" style={{ color: '#3498db' }}>← Back to Companies</Link>
        <div style={card}>
          <h2 data-testid="company-name">{company.name}</h2>
          <p><b>Company ID:</b> {company.companyId}</p>
          <p><b>Role:</b> {company.role}</p>
          <p><b>Package:</b> {company.package} LPA</p>
          <p><b>Min CGPA:</b> {company.minimumCgpa}</p>
          <p><b>Drive Date:</b> {company.driveDate ? new Date(company.driveDate).toLocaleDateString() : 'N/A'}</p>
          <p><b>Status:</b> {company.status}</p>
          <p><b>Eligible Departments:</b> {company.eligibleDepartments?.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

const card = { background: '#fff', borderRadius: 8, padding: 24, marginTop: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', maxWidth: 500 };
export default CompanyDetail;
