import React, { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import toast from 'react-hot-toast';
import {
  useUserPreferences,
  useUpdateUserPreferences,
  useUserNotificationSettings,
  useUpdateUserNotificationSettings,
  useUploadAvatar,
} from '../api/queries';

const prefSchema = z.object({
  theme: z.string().optional(),
  currency: z.string().optional(),
  language: z.string().optional(),
});

const notifSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  pushNotifications: z.boolean(),
});

export default function UserSettings() {
  const prefsQuery = useUserPreferences();
  const notifQuery = useUserNotificationSettings();
  const updatePrefs = useUpdateUserPreferences();
  const updateNotif = useUpdateUserNotificationSettings();
  const uploadAvatar = useUploadAvatar();

  const [theme, setTheme] = useState('');
  const [currency, setCurrency] = useState('');
  const [language, setLanguage] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);

  useEffect(() => {
    const p = prefsQuery.data?.data ?? prefsQuery.data;
    if (p) {
      setTheme(p.theme || '');
      setCurrency(p.currency || '');
      setLanguage(p.language || '');
    }
  }, [prefsQuery.data]);

  useEffect(() => {
    const s = notifQuery.data?.data ?? notifQuery.data;
    if (s) {
      setEmailNotifications(!!s.emailNotifications);
      setSmsNotifications(!!s.smsNotifications);
      setPushNotifications(!!s.pushNotifications);
    }
  }, [notifQuery.data]);

  const onSavePrefs = (e) => {
    e.preventDefault();
    const result = prefSchema.safeParse({ theme, currency, language });
    if (!result.success) {
      toast.error('Invalid preferences');
      return;
    }
    const prev = prefsQuery.data;
    updatePrefs.mutate(result.data, {
      onMutate: async () => {
        toast.loading('Saving preferences...', { id: 'prefs' });
      },
      onSuccess: () => {
        toast.success('Preferences saved', { id: 'prefs' });
        prefsQuery.refetch();
      },
      onError: () => toast.error('Failed to save preferences', { id: 'prefs' }),
    });
  };

  const onSaveNotif = (e) => {
    e.preventDefault();
    const result = notifSchema.safeParse({ emailNotifications, smsNotifications, pushNotifications });
    if (!result.success) {
      toast.error('Invalid notification settings');
      return;
    }
    updateNotif.mutate(result.data, {
      onMutate: async () => {
        toast.loading('Saving notifications...', { id: 'notif' });
      },
      onSuccess: () => {
        toast.success('Notification settings saved', { id: 'notif' });
        notifQuery.refetch();
      },
      onError: () => toast.error('Failed to save notification settings', { id: 'notif' }),
    });
  };

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const onUploadAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await toBase64(file);
      uploadAvatar.mutate(String(base64), {
        onSuccess: () => toast.success('Avatar uploaded'),
        onError: () => toast.error('Failed to upload avatar'),
      });
    } catch {
      toast.error('Failed to read file');
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>User Settings</h2>

      <section style={{ marginBottom: 24 }}>
        <h3>Preferences</h3>
        {prefsQuery.isLoading && <div>Loading preferences...</div>}
        <form onSubmit={onSavePrefs} style={{ display: 'grid', gap: 8, maxWidth: 500 }}>
          <label>
            <div>Theme</div>
            <select aria-label="Theme" value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
          <label>
            <div>Currency</div>
            <input aria-label="Currency" value={currency} onChange={(e) => setCurrency(e.target.value)} placeholder="e.g. NGN" />
          </label>
          <label>
            <div>Language</div>
            <input aria-label="Language" value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="e.g. en" />
          </label>
          <button type="submit" disabled={updatePrefs.isPending}>Save Preferences</button>
        </form>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h3>Notification Settings</h3>
        {notifQuery.isLoading && <div>Loading notification settings...</div>}
        <form onSubmit={onSaveNotif} style={{ display: 'grid', gap: 8, maxWidth: 500 }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <input aria-label="Email notifications" type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
            <span>Email</span>
          </label>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <input aria-label="SMS notifications" type="checkbox" checked={smsNotifications} onChange={(e) => setSmsNotifications(e.target.checked)} />
            <span>SMS</span>
          </label>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <input aria-label="Push notifications" type="checkbox" checked={pushNotifications} onChange={(e) => setPushNotifications(e.target.checked)} />
            <span>Push</span>
          </label>
          <button type="submit" disabled={updateNotif.isPending}>Save Notification Settings</button>
        </form>
      </section>

      <section>
        <h3>Avatar</h3>
        <input aria-label="Upload avatar" type="file" accept="image/*" onChange={onUploadAvatar} />
      </section>
    </div>
  );
}

