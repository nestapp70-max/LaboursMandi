import { useState } from 'react';
import { api } from '../lib/api';
import { useNavigate } from 'wouter';

export default function Signup() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'customer'|'technician'>('customer');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await api.post('/auth/signup', { name, phone, role });
      alert('Signup success! Request OTP now.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Signup failed');
    }
  };

  return (
    <div className="p-4">
      <h1>Signup</h1>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
      <select value={role} onChange={e => setRole(e.target.value as any)}>
        <option value="customer">Customer</option>
        <option value="technician">Technician</option>
      </select>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}
