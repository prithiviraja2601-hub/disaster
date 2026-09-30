import { useState, useEffect } from 'react';
import api from '../services/api';
import { auth } from '../services/firebase';

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();
      
      const response = await api.get('/registrations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRegistrations(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch registrations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this registration?')) return;
    
    try {
      const token = await auth.currentUser.getIdToken();
      await api.delete(`/registrations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRegistrations(registrations.filter(r => r.id !== id));
    } catch (err) {
      alert('Failed to delete registration.');
    }
  };

  const exportCSV = () => {
    if (registrations.length === 0) return;
    const headers = ['Registration ID', 'Name', 'Student ID', 'Email', 'Phone', 'College', 'Department', 'Year', 'Date'];
    const csvContent = [
      headers.join(','),
      ...filteredRegistrations.map(r => 
        [r.registrationId, r.fullName, r.studentId, r.email, r.phone, r.college, r.department, r.year, new Date(r.registeredAt).toLocaleDateString()].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'registrations.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter logic
  const filteredRegistrations = registrations.filter(r => {
    const matchSearch = r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        r.registrationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        r.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCollege = collegeFilter === '' || r.college === collegeFilter;
    const matchDept = deptFilter === '' || r.department === deptFilter;
    const matchYear = yearFilter === '' || r.year === yearFilter;
    return matchSearch && matchCollege && matchDept && matchYear;
  });

  // Unique lists for filters
  const colleges = [...new Set(registrations.map(r => r.college))];
  const departments = [...new Set(registrations.map(r => r.department))];
  const years = [...new Set(registrations.map(r => r.year))];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Registrations</h3>
            <p className="text-3xl font-bold text-blue-600">{registrations.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Confirmed</h3>
            <p className="text-3xl font-bold text-green-600">{registrations.filter(r => r.status === 'confirmed').length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Today's Registrations</h3>
            <p className="text-3xl font-bold text-purple-600">
              {registrations.filter(r => new Date(r.registeredAt).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Registration Data</h2>
            <div className="flex gap-2">
              <button onClick={fetchRegistrations} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                Refresh
              </button>
              <button onClick={exportCSV} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Export CSV
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
              type="text" 
              placeholder="Search by ID, Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select value={collegeFilter} onChange={(e) => setCollegeFilter(e.target.value)} className="px-4 py-2 border border-slate-300 rounded-lg">
              <option value="">All Colleges</option>
              {colleges.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="px-4 py-2 border border-slate-300 rounded-lg">
              <option value="">All Departments</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} className="px-4 py-2 border border-slate-300 rounded-lg">
              <option value="">All Years</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold">Reg ID</th>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Student ID</th>
                  <th className="p-4 font-semibold">Contact</th>
                  <th className="p-4 font-semibold">Academics</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr><td colSpan="7" className="p-8 text-center text-slate-500">Loading data...</td></tr>
                ) : filteredRegistrations.length === 0 ? (
                  <tr><td colSpan="7" className="p-8 text-center text-slate-500">No registrations found.</td></tr>
                ) : (
                  filteredRegistrations.map(reg => (
                    <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-medium text-blue-600">{reg.registrationId}</td>
                      <td className="p-4 text-slate-800 font-medium">{reg.fullName}</td>
                      <td className="p-4 text-slate-600">{reg.studentId}</td>
                      <td className="p-4 text-slate-600 text-sm">
                        <div>{reg.email}</div>
                        <div className="text-slate-500">{reg.phone}</div>
                      </td>
                      <td className="p-4 text-slate-600 text-sm">
                        <div className="font-medium text-slate-700">{reg.college}</div>
                        <div>{reg.department} • Year {reg.year}</div>
                      </td>
                      <td className="p-4 text-slate-600 text-sm">{new Date(reg.registeredAt).toLocaleDateString()}</td>
                      <td className="p-4 text-right space-x-2">
                        <button onClick={() => alert(JSON.stringify(reg, null, 2))} className="text-blue-600 hover:text-blue-800 p-1">View</button>
                        <button onClick={() => handleDelete(reg.id)} className="text-red-600 hover:text-red-800 p-1">Del</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
