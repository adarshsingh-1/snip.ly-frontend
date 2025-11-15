import { useState, useEffect } from 'react';
import api from '../services/api';

export function useLinks() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialLoading, setInitialLoading] = useState(true);

  const loadLinks = async () => {
    try {
      const { data } = await api.get('/links/my');
      setLinks(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.response?.status === 401) {
        return;
      }
      setError(err.response?.data?.message || 'Failed to load links');
      setLinks([]);
    } finally {
      setInitialLoading(false);
    }
  };

  const createLink = async (url) => {
    setLoading(true);
    setError('');
    try {
      await api.post('/links', { url });
      await loadLinks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create link');
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = async (id) => {
    try {
      await api.delete(`/links/${id}`);
      await loadLinks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete link');
      throw err;
    }
  };

  useEffect(() => {
    loadLinks();

    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        loadLinks();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { links, createLink, deleteLink, loading, error, initialLoading, refresh: loadLinks };
}