import { useState, useEffect } from 'react';
import { jobApi, walletApi } from '../lib/api';

export default function CustomerDashboard() {
  const userId = localStorage.getItem('userId')!;
  const [jobs, setJobs] = useState<any[]>([]);
  const [wallet, setWallet] = useState(0);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [budget, setBudget] = useState('');

  useEffect(() => {
    fetchJobs();
    fetchWallet();
  }, []);

  const fetchJobs = async () => {
    const res = await jobApi.getJobsByCustomer(userId);
    setJobs(res.data);
  };

  const fetchWallet = async () => {
    const res = await walletApi.getWallet(userId);
    setWallet(res.data.balance);
  };

  const postJob = async () => {
    await jobApi.postJob({ customerId: userId, title, description: desc, category: 'Electrician', city: '', pincode: '', budget: Number(budget) });
    alert('Job posted!');
    fetchJobs();
  };

  const recharge = async () => {
    const amount = Number(prompt('Enter amount to recharge') || 0);
    const res = await walletApi.rechargeWallet(userId, amount);
    setWallet(res.data.balance);
    alert('Wallet recharged!');
  };

  return (
    <div className="p-4">
      <h1>Customer Dashboard</h1>
      <p>Wallet Balance: ₹{wallet} <button onClick={recharge}>Recharge</button></p>

      <h2>Post a Job</h2>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <input placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} />
      <input placeholder="Budget" value={budget} onChange={e=>setBudget(e.target.value)} />
      <button onClick={postJob}>Post Job</button>

      <h2>My Jobs</h2>
      <ul>
        {jobs.map(j=>(
          <li key={j.id}>{j.title} - ₹{j.budget} - {j.status}</li>
        ))}
      </ul>
    </div>
  );
}
