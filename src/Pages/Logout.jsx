import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../api/queries';

export default function Logout() {
  const navigate = useNavigate();
  const logout = useLogout();

  useEffect(() => {
    logout.mutate(undefined, {
      onSettled: () => {
        navigate('/login', { replace: true });
      }
    });
  }, []);

  return <div style={{ padding: 16 }}>Signing out...</div>;
}

