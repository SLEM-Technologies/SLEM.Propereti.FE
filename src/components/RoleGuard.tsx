import React from 'react';

export default function RoleGuard({ children }: { children: React.ReactNode }) {
  // Temporarily bypassing role checks to allow viewing all pages
  return <>{children}</>;
}

