import { useEffect, useState } from 'react';
import { jobApi, walletApi } from '../lib/api';

export default function TechnicianDashboard() {
  const userId = localStorage.getItem('userId')!;
  const [wallet, setWallet] = useState(0);
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    fetchWallet();
    fetchJobs();
  }, []);

  const fetchWallet = async () => {
    const res = await walletApi.getWallet(userId);
    setWallet(res.data.balance);
  };

  const fetchJobs = async () => {
    const res = await jobApi.getJobsByCustomer(userId); // demo: all jobs
    setJobs(res.data);
  };

  return (
    <div className="p-4">
      <h1>Technician Dashboard</h1>
      <p>Wallet Balance: ₹{wallet}</p>

      <h2>Available Jobs</h2>
      <ul>
        {jobs.map(j => (
          <li key={j.id}>{j.title} - ₹{j.budget} - {j.status}</li>
        ))}
      </ul>
    </div>
  );
}
