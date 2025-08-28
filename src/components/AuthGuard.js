import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../app/auth';
export default function AuthGuard({ children }) {
    const location = useLocation();
    if (!isAuthenticated()) {
        const from = encodeURIComponent(location.pathname + location.search);
        return _jsx(Navigate, { to: `/login?from=${from}`, replace: true });
    }
    return _jsx(_Fragment, { children: children });
}
