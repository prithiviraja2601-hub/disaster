import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    year: '',
    eventName: 'Disaster Management 2026'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/registrations', formData);
      if (response.data.success) {
        navigate('/success', { state: { registration: response.data.data } });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to register. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 px-8 py-6 text-white">
          <h2 className="text-3xl font-bold">Event Registration</h2>
          <p className="text-blue-100 mt-2">Fill in your details to secure your spot.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Full Name *</label>
              <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Student ID / Register No *</label>
              <input required type="text" name="studentId" value={formData.studentId} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="26CSE001" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Address *</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="student@example.com" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Phone Number *</label>
              <input required type="tel" pattern="[0-9]{10,15}" title="Please enter a valid phone number" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="9876543210" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">College Name *</label>
              <input required type="text" name="college" value={formData.college} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="National Tech University" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Department *</label>
              <select required name="department" value={formData.department} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Department</option>
                <option value="CSE">Computer Science</option>
                <option value="ECE">Electronics</option>
                <option value="MECH">Mechanical</option>
                <option value="CIVIL">Civil Engineering</option>
                <option value="IT">Information Technology</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Year of Study *</label>
              <select required name="year" value={formData.year} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-bold text-lg transition-all ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30'}`}
          >
            {loading ? 'Submitting...' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  );
}
