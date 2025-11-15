export default function Navbar({ onLogout, totalLinks = 0, totalClicks = 0 }) {
  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div>
            <h1 className="text-xl font-bold text-blue-600">Snip.ly</h1>
            <p className="text-xs text-slate-500">Snip long links in a snap.</p>
          </div>
          
          {totalLinks > 0 && (
            <div className="flex gap-4 text-sm">
              <div className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg font-medium">
                {totalLinks} {totalLinks === 1 ? 'link' : 'links'}
              </div>
              <div className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-medium">
                {totalClicks} {totalClicks === 1 ? 'click' : 'clicks'}
              </div>
            </div>
          )}
        </div>
        
        <button 
          onClick={onLogout} 
          className="text-sm px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}