import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  return children;
}

const App = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="bg-white shadow p-4 flex justify-between items-center rounded mb-4">
        <h1 className="text-xl font-bold text-blue-600">TaskFlow</h1>
        <div className="flex space-x-4 items-center">
          {token ? (
            <>
              <Link to="/dashboard" className="text-blue-500 hover:underline">Dashboard</Link>
              {user.role === 'admin' && (
                <>
                  <span className="text-gray-500">|</span>
                  <Link to="/admin" className="text-red-500 font-bold hover:underline">Admin Panel</Link>
                </>
              )}
              <span className="text-gray-500">|</span>
              <span className="text-gray-600 font-medium">{user.name}</span>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  window.location.href = '/login';
                }}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 border"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
              <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />        <Route path="/admin" element={
          <ProtectedRoute>
            {user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/dashboard" />}
          </ProtectedRoute>
        } />      </Routes>
    </div>
  );
}

export default App;
