import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Login            from '../pages/Login';
import Dashboard        from '../pages/Dashboard';
import Students         from '../pages/Students';
import StudentDetail    from '../pages/StudentDetail';
import Companies        from '../pages/Companies';
import CompanyDetail    from '../pages/CompanyDetail';
import Drives           from '../pages/Drives';
import DriveDetail      from '../pages/DriveDetail';
import Applications     from '../pages/Applications';
import ApplicationDetail from '../pages/ApplicationDetail';
import Interviews       from '../pages/Interviews';
import Analytics        from '../pages/Analytics';
import Profile          from '../pages/Profile';

const AppRouter = () => (
  <Routes>
    <Route path="/login"               element={<Login />} />
    <Route path="/dashboard"           element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/students"            element={<ProtectedRoute><Students /></ProtectedRoute>} />
    <Route path="/students/:id"        element={<ProtectedRoute><StudentDetail /></ProtectedRoute>} />
    <Route path="/companies"           element={<ProtectedRoute><Companies /></ProtectedRoute>} />
    <Route path="/companies/:id"       element={<ProtectedRoute><CompanyDetail /></ProtectedRoute>} />
    <Route path="/drives"              element={<ProtectedRoute><Drives /></ProtectedRoute>} />
    <Route path="/drives/:id"          element={<ProtectedRoute><DriveDetail /></ProtectedRoute>} />
    <Route path="/applications"        element={<ProtectedRoute><Applications /></ProtectedRoute>} />
    <Route path="/applications/:id"    element={<ProtectedRoute><ApplicationDetail /></ProtectedRoute>} />
    <Route path="/interviews"          element={<ProtectedRoute><Interviews /></ProtectedRoute>} />
    <Route path="/analytics"           element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
    <Route path="/profile"             element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="/"                    element={<Navigate to="/dashboard" />} />
  </Routes>
);

export default AppRouter;
