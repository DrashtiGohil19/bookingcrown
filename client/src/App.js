import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import UserDashboard from './user/pages/Dashboard/Dashboard';
import AddBooking from './user/pages/AddBooking/AddBooking';
import BookingList from './user/pages/BookingList/BookingList';
import EditBooking from './user/pages/EditBooking/EditBooking';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import AdminDashboard from './admin/pages/Dashboard/Dashboard';
import ProtectedRoute from './services/protectedRoute/ProtectedRoute';
import Profile from './user/pages/Profile/Profile';
import ThankYou from './user/pages/ThankYou/ThankYou';
import AccessDenied from './user/pages/AccessDenied/AccessDenied';
import ProtectedAccessDenied from './services/protectedRoute/ProtectedAccessDenied';
import NotFound from './pages/NotFound/NotFound';
import ProtectedAdminRoute from './services/protectedRoute/ProtectedAdminRoute';
import HourlyBookingDetail from './user/components/Hourly/HourlyBookingDetail';
import DailyBookingDetail from './user/components/Daily/DailyBookingDetail';
import CustomerDetail from './user/pages/CustomerDetail/CustomerDetail';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import IncomeExpense from './user/pages/IncomeExpense/IncomeExpense';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-confirmation" element={<ThankYou />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/customer/booking-details/:id" element={<CustomerDetail />} />
        <Route path="/*" element={<NotFound />} />

        <Route path="/access-denied" element={<ProtectedAccessDenied element={AccessDenied} />} />

        {/* ------------------ protected routes ------------------ */}
        <Route path="/user/dashboard" element={<ProtectedRoute element={UserDashboard} requiredRole="user" />} />
        <Route path="/user/add-booking" element={<ProtectedRoute element={AddBooking} requiredRole="user" />} />
        <Route path="/user/booking-list" element={<ProtectedRoute element={BookingList} requiredRole="user" />} />
        <Route path="/user/edit-booking/:id" element={<ProtectedRoute element={EditBooking} requiredRole="user" />} />
        <Route path="/user/profile" element={<ProtectedRoute element={Profile} requiredRole="user" />} />
        <Route path="/user/hourly-booking-details/:id" element={<ProtectedRoute element={HourlyBookingDetail} requiredRole="user" />} />
        <Route path="/user/daily-booking-details/:id" element={<ProtectedRoute element={DailyBookingDetail} requiredRole="user" />} />
        <Route path="/user/income-expense" element={<ProtectedRoute element={IncomeExpense} requiredRole="user" />} />

        <Route path="/admin/dashboard" element={<ProtectedAdminRoute element={AdminDashboard} requiredRole="admin" />} />

      </Routes>
    </div>
  );
}

export default App;
