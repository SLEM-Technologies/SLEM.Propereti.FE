import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
export default function RoleGuard({ children }) {
    // Temporarily bypassing role checks to allow viewing all pages
    return _jsx(_Fragment, { children: children });
}
