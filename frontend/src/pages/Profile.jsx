import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, updateProfile, triggerAlert } = useContext(AuthContext);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState(user?.address || '');
  const [phone, setPhone] = useState(user?.phone || '');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      triggerAlert('Passwords do not match.', 'error');
      return;
    }

    setLoading(true);
    try {
      const updatedFields = { name, email, address, phone };
      if (password) {
        updatedFields.password = password;
      }
      await updateProfile(updatedFields);
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      // Handled in context trigger
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', padding: '24px', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '32px' }}>Your Profile</h1>

      <form onSubmit={handleSubmit} className="glass" style={{ padding: '32px' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Contact Phone</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Shipping Address</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows="3" />
        </div>

        <hr style={{ borderColor: 'var(--border-color)', margin: '24px 0' }} />

        <h4 style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>Change Password (Optional)</h4>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>New Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 6 characters" />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Confirm New Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Retype password" />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }} disabled={loading}>
          {loading ? 'Saving Updates...' : 'Update Settings'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
