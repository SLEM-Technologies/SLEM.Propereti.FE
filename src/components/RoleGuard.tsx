import React from 'react';
import { useUserProfile } from '../api/queries';

type RoleGuardProps = {
  allow: Array<'admin' | 'company' | 'user'>;
  children: React.ReactNode;
};

function normalize(value?: string): string {
  return (value || '').toLowerCase();
}

export default function RoleGuard({ allow, children }: RoleGuardProps) {
  const { data, isLoading, isError } = useUserProfile();
  if (isLoading) return <div style={{ padding: 16 }}>Loading...</div>;
  if (isError) return <div style={{ padding: 16 }}>Failed to load profile.</div>;

  const profile = (data as any)?.data ?? (data as any) ?? {};

  const rolesArray: string[] = Array.isArray(profile.roles)
    ? profile.roles.map((r: any) => String(r).toLowerCase())
    : [];
  const roleSingle = normalize(profile.role);
  const userType = normalize(profile.userType);
  const isAdmin = Boolean(
    profile.isAdmin === true ||
      rolesArray.includes('admin') ||
      roleSingle === 'admin' ||
      userType === 'admin'
  );
  const isCompany = Boolean(
    profile.isCompany === true ||
      rolesArray.includes('company') ||
      roleSingle === 'company' ||
      userType === 'company'
  );

  const isUser = !isAdmin && !isCompany;

  const allowAdmin = allow.includes('admin');
  const allowCompany = allow.includes('company');
  const allowUser = allow.includes('user');

  const permitted = (allowAdmin && isAdmin) || (allowCompany && isCompany) || (allowUser && isUser);

  if (!permitted) return <div style={{ padding: 16 }}>Access denied.</div>;
  return <>{children}</>;
}

