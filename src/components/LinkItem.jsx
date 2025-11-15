import { useState, useEffect } from 'react';

export default function LinkItem({ link, onDelete }) {
  const [copied, setCopied] = useState(false);
  const [prevClicks, setPrevClicks] = useState(link.clicks);
  const [pulse, setPulse] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const shortDomain = import.meta.env.VITE_SHORT_DOMAIN || 'http://localhost:3000';
  const shortUrl = `${shortDomain}/${link.shortId}`;

  useEffect(() => {
    if (link.clicks > prevClicks) {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }
    setPrevClicks(link.clicks);
  }, [link.clicks, prevClicks]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(link._id);
    } catch (err) {
      console.error('Delete failed', err);
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 hover:border-slate-300 hover:shadow-sm transition">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline font-medium block truncate text-lg"
          >
            {shortDomain.replace(/^https?:\/\//, '')}/{link.shortId}
          </a>
          <p className="text-sm text-slate-500 truncate mt-1">{link.originalUrl}</p>
          <p className="text-xs text-slate-400 mt-1">Created {formatDate(link.createdAt)}</p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              pulse
                ? 'bg-green-100 text-green-700 scale-110'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {link.clicks} {link.clicks === 1 ? 'click' : 'clicks'}
          </span>

          <button
            onClick={handleCopy}
            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition font-medium"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>

          {showConfirm ? (
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Confirm'}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={deleting}
                className="px-3 py-1 text-sm bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}