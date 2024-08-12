import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../homepage/Homepage';
import AdminDashboard from '../admin/AdminDashboard';
import SignupForm from '../auth/SignupForm';
import LoginForm from '../auth/LoginForm';
import ProfileForm from '../profiles/ProfileForm';
import EmployeeList from '../employees/EmployeeList';
import EmployeeDetail from '../employees/EmployeeDetail';
import EmployeeNew from '../employees/EmployeeNew';
import SearchForm from '../auth/SearchForm';
import SkillList from '../skills/SkillList';
import SkillDetail from '../skills/SkillDetail';
import SkillNew from '../skills/SkillNew';
import NotAuthorizedPage from `../auth/NotAuthorizedPage`; 
import PrivateRoute from '../nav-routes/PrivateRoute';
import AdminRoute from '../nav-routes/AdminRoute';
import DepartmentList from '../departments/DepartmentList';
import OfficeLocationList from '../officeLocations/OfficeLocationList';
import SkillEdit from '../skills/SkillEdit';
import EmployeeEdit from '../employees/EmployeeEdit';

// This is my mail Routes component. It displays the routes for the app. It uses the PrivateRoute and AdminRoute components to protect the routes from unauthorized users. 

function AppRoutes({ login, signup, search, isAuthenticated, profile, updateProfile, logout, isadmin }) {
    return (
      <div className="pt-5">
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<SignupForm signup={signup} />} />
            <Route path="/login" element={<LoginForm login={login} />} />
        
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated}  />}>
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employees/:employee_id" element={<EmployeeDetail />} />
            <Route path="/skills" element={<SkillList />} />
            <Route path="/skills/:skill_id" element={<SkillDetail />} />
            <Route path="/profile" element={<ProfileForm profile={profile} updateProfile={updateProfile} />} />
            <Route path="/logout" element={<Homepage logout={logout} />} />
            <Route path="/search" element={<SearchForm search={search} />} />
            <Route path="/admin" element={<AdminDashboard />} />               
            <Route path="/not-authorized" element={<NotAuthorizedPage />} />
            <Route path="/departments" element={<DepartmentList />} />
            <Route path="/officeLocations" element={<OfficeLocationList />} />
            <Route path="*" element={<Homepage />} />
          </Route>

          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route element={<AdminRoute isadmin={isadmin} />}/>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/skills/new" element={<SkillNew />} />
              <Route path="/skills/:skill_id/edit" element={< SkillEdit />} />
              <Route path="/skills/:delete" element={< SkillEdit />} />
              <Route path="/employees/new" element={<EmployeeNew />} />  
              <Route path="/employees/:employee_id/edit" element={<EmployeeEdit />} />
              <Route path="/employees/:delete" element={<EmployeeEdit />} />
          </Route>
        </Routes>
      </div>
    );
  }



export default AppRoutes;