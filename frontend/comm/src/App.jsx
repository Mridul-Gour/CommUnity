import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import SignUp from './components/SignUp'
import Login_first from './components/Login_first';
import SignUp_first from './components/SignUp_first';
import Welcomee from './components/Welcomee.jsx';
import Apartmentt from './components/Apartmentt.jsx';
import UserProfile from './components/UserProfile.jsx';
import Events from './components/Events.jsx';
import Eve from './components/Eve.jsx';
import Notices from './components/Notices.jsx';
import Requestser from './components/Requestser.jsx';
import Complaints from './components/Complaints.jsx';
import Billings from './components/Billings.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import Logout from './components/Logout.jsx';
import EmergencyContacts from './components/EmergencyContacts.jsx';
import Parkings from './components/Parkings.jsx';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup'element={<SignUp />} />
          <Route path='/login_first' element={<Login_first />} />
          <Route path='/signup_first' element={<SignUp_first />} />
          <Route path='/welcome'element={<Welcomee />} />
          <Route path='/apartment'element={<Apartmentt />} />
          <Route path='/userprofile' element={<UserProfile />} />
          <Route path='/events' element={<Events />} /> 
          <Route path='/eve' element={<Eve />} />
          <Route path='/notices' element={<Notices />} />
          <Route path='/requestser' element={<Requestser />} />
          <Route path='/complaints' element={<Complaints />} />
          <Route path='/billings' element={<Billings />} />
          <Route path='/admindashboard' element={<AdminDashboard />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/emergencycontacts' element={<EmergencyContacts />} />
          <Route path='/parkings'element={<Parkings />} />
          
          
        </Routes>
      </Router>
    </>
  )
}

export default App