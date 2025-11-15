import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import LinkShortener from '../components/LinkShortener';
import LinkList from '../components/LInkList';
import { useLinks } from '../hooks/useLinks';

export default function Dashboard() {
  const navigate = useNavigate();
  // Add deleteLink here ↓
  const { links, createLink, deleteLink, loading, error, initialLoading, refresh } = useLinks();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserName(user?.name || user?.email?.split('@')[0] || 'User');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onLogout={handleLogout} totalLinks={links.length} totalClicks={totalClicks} />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <LinkShortener onSubmit={createLink} loading={loading} error={error} userName={userName} />
        
        {initialLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <LinkList links={links} onDelete={deleteLink} />
        )}
      </div>
    </div>
  );
}