import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { AuthContext, AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Layout Elements
import Navbar from './components/Navbar';

// Page Views
import Home from './pages/Home';
import BooksListing from './pages/BooksListing';
import BookDetails from './pages/BookDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Administrative Dashboard Pages
import AdminDashboard from './pages/AdminDashboard';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import ManageUsers from './pages/ManageUsers';
import ManageOrders from './pages/ManageOrders';

// Wrapper
import ProtectedRoute from './components/ProtectedRoute';

function MainApp() {
  const { alerts } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />

      {/* Global Alerts Banner */}
      <div className="alert-container">
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert-toast ${alert.type}`}>
            <span>{alert.message}</span>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Routes>
          {/* Public Views */}
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BooksListing />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />

          {/* User Protected Routes */}
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Admin Protected Routes */}
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/add-book" element={<ProtectedRoute adminOnly><AddBook /></ProtectedRoute>} />
          <Route path="/admin/edit-book/:id" element={<ProtectedRoute adminOnly><EditBook /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute adminOnly><ManageUsers /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute adminOnly><ManageOrders /></ProtectedRoute>} />

          {/* Fallback View */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Global Footer */}
      <footer style={{
        marginTop: '60px',
        padding: '32px 24px',
        borderTop: '1px solid var(--border-color)',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
      }}>
        <div>&copy; {new Date().getFullYear()} Book Haven. Designed for absolute reading comfort.</div>
      </footer>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
