import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
export default function AuthGuard({ children }) {
    // Temporarily bypassing authentication to allow viewing all pages
    return _jsx(_Fragment, { children: children });
}
