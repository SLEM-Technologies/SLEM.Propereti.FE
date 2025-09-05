import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});
export default function Providers({ children }) {
    return (_jsxs(QueryClientProvider, { client: queryClient, children: [children, _jsx(Toaster, { position: "top-right", toastOptions: { duration: 3000 } })] }));
}
