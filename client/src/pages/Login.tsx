import { useState } from 'react';
import { api } from '../lib/api';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = async () => {
    await api.post('/auth/send-otp', { phone });
    setOtpSent(true);
    alert('OTP sent (check server log)');
  };

  const verifyOtp = async () => {
    const res = await api.post('/auth/verify-otp', { phone, code: otp });
    localStorage.setItem('token', res.data.token);
    alert('Login successful!');
  };

  return (
    <div className="p-4">
      <h1>Login</h1>
      <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
      {!otpSent ? <button onClick={sendOtp}>Send OTP</button> :
        <>
          <input placeholder="OTP" value={otp} onChange={e=>setOtp(e.target.value)} />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      }
    </div>
  );
}
