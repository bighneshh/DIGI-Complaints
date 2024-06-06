import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from './pages/signup/signup'
import WelcomePage from './pages/welcome/welcome'
import LoginUser from './pages/login/loginUser'
import LoginAdmin from './pages/login/loginAdmin'
import LoginPIC from './pages/login/loginPIC'
import LoginPrincipal from './pages/login/loginPrincipal'
import LoginVendor from './pages/login/loginVendor'
import LoginHOD from './pages/login/loginHOD'
import Dashboard from './pages/dashboard/dashboard1'
import CreateComplaintForm from './pages/complaint/complaint'
import ForgotPassword from './pages/forgot-password/forgot-password'
import ComplaintList from './components/complaintList/complaintList'
import Profile from './pages/profile/profile'
import TrackStatus from './components/trackStatus/trackStatus'
import HODDashboard from './pages/dashboard/HODdashboard'
import PrincipalDashboard from './pages/dashboard/principalDashboard'
import PICDashboard from './pages/dashboard/PICdashboard'
import VendorDashboard from './pages/dashboard/vendorDashboard'
import AbouUs from './components/about/aboutus'
import Services from './components/service/service'
import ContactUs from './components/contact/contactUs'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login/user" element={<LoginUser />} />
        <Route path="/login/admin" element={<LoginAdmin />} />
        <Route path="/login/pic" element={<LoginPIC />} />
        <Route path="/login/principal" element={<LoginPrincipal />} />
        <Route path="/login/vendor" element={<LoginVendor />} />
        <Route path="/login/hod" element={<LoginHOD />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/complaint" element={<CreateComplaintForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/complaint-list" element={<ComplaintList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/trial" element={<TrackStatus />} />
        <Route path="/hoddashboard" element={<HODDashboard />} />
        <Route path="/principaldashboard" element={<PrincipalDashboard />} />
        <Route path="/PICdashboard" element={<PICDashboard />} />
        <Route path="/vendordashboard" element={<VendorDashboard />} />
        <Route path="/aboutus" element={<AbouUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contactUs" element={<ContactUs />} />
        
      </Routes>
    </Router>
  )
}

export default App