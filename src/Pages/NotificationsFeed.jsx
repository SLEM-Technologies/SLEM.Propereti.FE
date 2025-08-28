import React, { useEffect, useMemo, useState } from 'react';
import { useNotificationsList, useMarkNotificationRead, useMarkAllNotificationsRead } from '../api/queries';
import toast from 'react-hot-toast';
import { startNotificationsRealtime, subscribeRealtime } from '../lib/realtime';

export default function NotificationsFeed() {
  const [page, setPage] = useState(1);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const pageSize = 10;
  const listQuery = useNotificationsList({ page, pageSize, unreadOnly });
  const markRead = useMarkNotificationRead();
  const markAll = useMarkAllNotificationsRead();

  const items = useMemo(() => {
    const raw = listQuery.data?.data ?? listQuery.data;
    if (Array.isArray(raw)) return raw;
    if (raw?.items) return raw.items;
    return [];
  }, [listQuery.data]);

  const total = listQuery.data?.total || listQuery.data?.pagination?.total || undefined;

  const onToggleUnread = () => {
    setUnreadOnly((v) => !v);
    setPage(1);
  };

  const onRead = (id) => {
    markRead.mutate(id, {
      onSuccess: () => {
        toast.success('Marked as read');
        listQuery.refetch();
      },
      onError: () => toast.error('Failed to mark as read'),
    });
  };

  const onReadAll = () => {
    markAll.mutate(undefined, {
      onSuccess: () => {
        toast.success('All notifications marked as read');
        listQuery.refetch();
      },
      onError: () => toast.error('Failed to mark all as read'),
    });
  };

  useEffect(() => {
    startNotificationsRealtime();
    const unsubscribe = subscribeRealtime((payload) => {
      if (payload?.type === 'notification') {
        listQuery.refetch();
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <h2>Notifications</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <label style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
            <input aria-label="Unread only" type="checkbox" checked={unreadOnly} onChange={onToggleUnread} />
            <span>Unread only</span>
          </label>
          <button onClick={onReadAll} disabled={markAll.isPending}>Mark all read</button>
        </div>
      </div>

      {listQuery.isLoading && <div>Loading notifications...</div>}
      {listQuery.isError && <div>Failed to load notifications</div>}

      <ul style={{ listStyle: 'none', padding: 0, marginTop: 12 }}>
        {items?.map((n) => {
          const id = n?.id || n?.notificationId || n?.reference;
          const title = n?.title || n?.subject || 'Notification';
          const body = n?.body || n?.message || '';
          const unread = n?.isRead === false || n?.read === false || n?.unread === true;
          return (
            <li key={id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, marginBottom: 8, background: unread ? '#f5faff' : 'transparent' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{title}</div>
                  <div style={{ color: '#555' }}>{body}</div>
                </div>
                <div>
                  {unread && <button onClick={() => onRead(id)} disabled={markRead.isPending}>Mark read</button>}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1 || listQuery.isLoading}>Prev</button>
        <div>Page {page}</div>
        <button onClick={() => setPage((p) => p + 1)} disabled={items?.length < pageSize || listQuery.isLoading}>Next</button>
      </div>
    </div>
  );
}

