import React from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  // Temporarily bypassing authentication to allow viewing all pages
  return <>{children}</>;
}