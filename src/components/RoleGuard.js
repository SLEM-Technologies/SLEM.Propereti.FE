import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useUserProfile } from '../api/queries';
function normalize(value) {
    return (value || '').toLowerCase();
}
export default function RoleGuard({ allow, children }) {
    const { data, isLoading, isError } = useUserProfile();
    if (isLoading)
        return _jsx("div", { style: { padding: 16 }, children: "Loading..." });
    if (isError)
        return _jsx("div", { style: { padding: 16 }, children: "Failed to load profile." });
    const profile = data?.data ?? data ?? {};
    const rolesArray = Array.isArray(profile.roles)
        ? profile.roles.map((r) => String(r).toLowerCase())
        : [];
    const roleSingle = normalize(profile.role);
    const userType = normalize(profile.userType);
    const isAdmin = Boolean(profile.isAdmin === true ||
        rolesArray.includes('admin') ||
        roleSingle === 'admin' ||
        userType === 'admin');
    const isCompany = Boolean(profile.isCompany === true ||
        rolesArray.includes('company') ||
        roleSingle === 'company' ||
        userType === 'company');
    const isUser = !isAdmin && !isCompany;
    const allowAdmin = allow.includes('admin');
    const allowCompany = allow.includes('company');
    const allowUser = allow.includes('user');
    const permitted = (allowAdmin && isAdmin) || (allowCompany && isCompany) || (allowUser && isUser);
    if (!permitted)
        return _jsx("div", { style: { padding: 16 }, children: "Access denied." });
    return _jsx(_Fragment, { children: children });
}
