import { useMemo, useState } from 'react'

export default function LinkShortener({ onSubmit, loading, error, userName }) {
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = url.trim()
    if (!trimmed) return
    const hasScheme = /^(https?:)\/\//i.test(trimmed)
    const normalized = hasScheme ? trimmed : `http://${trimmed}`
    onSubmit(normalized)
    setUrl('')
  }

  // Fallback name if prop is empty
  const displayName = useMemo(() => {
    if (userName && userName.trim()) return userName.trim()
    try {
      const u = JSON.parse(localStorage.getItem('user') || '{}')
      return u?.name || u?.email?.split('@')[0] || 'User'
    } catch {
      return 'User'
    }
  }, [userName])

  // Greeting in IST (UTC+5:30)
  const getGreeting = () => {
    const now = new Date()
    const istOffset = 5.5 * 60 * 60 * 1000
    const istTime = new Date(now.getTime() + istOffset)
    const hour = istTime.getUTCHours()
    if (hour < 12) return 'good morning'
    if (hour < 17) return 'good afternoon'
    return 'good evening'
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-slate-900 mb-8">
        {getGreeting()}, {displayName}
      </h2>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full">
        <input
          className="w-full max-w-2xl rounded-lg border-2 border-slate-800 px-4 py-3 text-center text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-slate-900 transition"
          placeholder="paste your link here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          disabled={loading}
          className="w-48 rounded-lg border-2 border-slate-800 bg-white px-8 py-3 font-bold text-lg text-slate-900 hover:bg-slate-800 hover:text-white transition disabled:opacity-50"
        >
          {loading ? 'Snipping...' : 'Snip It!'}
        </button>
      </form>
    </div>
  )
}