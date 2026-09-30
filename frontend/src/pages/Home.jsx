import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-hero-pattern text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold tracking-wider uppercase mb-4 inline-block">National Symposium</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Disaster Management 2026</h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Join the leading minds in crisis response, environmental resilience, and emergency planning. Prepare today for a safer tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1">
              Register Now
            </Link>
            <a href="#details" className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all">
              Event Details
            </a>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div id="details" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800">Date</h3>
              <p className="text-slate-600">October 15-16, 2026</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800">Venue</h3>
              <p className="text-slate-600">Main Auditorium, National Tech University</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800">Highlights</h3>
              <p className="text-slate-600">Expert Talks, Mock Drills, Tech Showcase</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
