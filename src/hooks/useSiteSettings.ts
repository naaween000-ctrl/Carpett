import { useState, useEffect } from 'react';
import { SiteSettings } from '../types/settings';
import { getSiteSettings, updateSiteSettings as updateSettingsApi } from '../lib/dataService';
import { INITIAL_SITE_SETTINGS } from '../lib/mockData';

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await getSiteSettings();
      setSettings(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load site settings');
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    try {
      const updated = await updateSettingsApi(newSettings);
      setSettings(updated);
      return updated;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update settings');
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return { settings, loading, error, refreshSettings: fetchSettings, updateSettings };
}
