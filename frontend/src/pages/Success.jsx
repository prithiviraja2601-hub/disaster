import { useLocation, Link, Navigate } from 'react-router-dom';

export default function Success() {
  const location = useLocation();
  const registration = location.state?.registration;

  if (!registration) {
    return <Navigate to="/" replace />;
  }

  const handleDownload = () => {
    // Simple mock download logic for demonstration
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(registration, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `Registration_${registration.registrationId}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden text-center">
        <div className="bg-green-500 py-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-inner">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
        </div>
        <div className="p-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Registration Successful!</h2>
          <p className="text-slate-600 mb-6">Your spot is confirmed for the event.</p>
          
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 mb-8 text-left space-y-3">
            <div>
              <p className="text-sm text-slate-500 uppercase tracking-wider">Registration ID</p>
              <p className="text-xl font-bold text-blue-600">{registration.registrationId}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 uppercase tracking-wider">Name</p>
              <p className="font-medium text-slate-800">{registration.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 uppercase tracking-wider">Event</p>
              <p className="font-medium text-slate-800">{registration.eventName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 uppercase tracking-wider">Date</p>
              <p className="font-medium text-slate-800">{new Date(registration.registeredAt).toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={handleDownload}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Download Confirmation
            </button>
            <Link 
              to="/"
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-lg transition-colors inline-block"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
