import { useQuery, useMutation } from '@tanstack/react-query';
import { OpenAPI } from './generated/core/OpenAPI';
import http from './http';
import { tokenStore } from './http';
OpenAPI.BASE = import.meta.env.VITE_API_BASE_URL;
// Mutations
export function useLogin() {
    return useMutation({
        mutationFn: async (payload) => {
            const res = await http.post('/api/v1/accounts/user-login', payload);
            return res.data;
        },
        onSuccess: (data) => {
            const access = data?.accessToken || data?.token || data?.data?.token;
            const refresh = data?.refreshToken || data?.data?.refreshToken;
            if (access)
                tokenStore.access = access;
            if (refresh)
                tokenStore.refresh = refresh;
        },
    });
}
export function useRegister() {
    return useMutation({
        mutationFn: async (payload) => {
            const res = await http.post('/api/v1/accounts/register-user', payload);
            return res.data;
        },
    });
}
// Queries
export function useUserProfile() {
    return useQuery({
        queryKey: ['user-profile'],
        queryFn: async () => (await http.get('/api/v1/users/profile')).data,
        enabled: !!tokenStore.access,
    });
}
export function usePropertiesList() {
    return useQuery({
        queryKey: ['properties'],
        queryFn: async () => (await http.get('/api/v1/properties/get-all-properties')).data,
    });
}
export function usePropertyById(id) {
    return useQuery({
        queryKey: ['property', id],
        queryFn: async () => (await http.get(`/api/v1/properties/get-property-by-id`, { params: { Id: id } })).data,
        enabled: !!id,
    });
}
// Additional Auth flows
export function useForgotPassword() {
    return useMutation({
        mutationFn: async (email) => {
            const res = await http.post('/api/v1/accounts/forgot-password', null, { params: { Email: email } });
            return res.data;
        },
    });
}
export function useResetPasswordConfirm() {
    return useMutation({
        mutationFn: async (payload) => {
            const res = await http.post('/api/v1/auth/password-reset/confirm', payload);
            return res.data;
        },
    });
}
export function useVerifyEmail() {
    return useMutation({
        mutationFn: async (payload) => {
            const res = await http.post('/api/v1/accounts/verify-email', payload);
            return res.data;
        },
    });
}
export function useVerifyPhone() {
    return useMutation({
        mutationFn: async (payload) => {
            const res = await http.post('/api/v1/accounts/verify-phonenumber', payload);
            return res.data;
        },
    });
}
export function useResendEmailVerification() {
    return useMutation({
        mutationFn: async (payload) => {
            const res = await http.post('/api/v1/auth/resend-email-verification', payload);
            return res.data;
        },
    });
}
// Paystack
export function usePaystackInit() {
    return useMutation({
        mutationFn: async (payload) => {
            const res = await http.post('/api/v1/paystack', payload);
            return res.data;
        },
    });
}
export function usePaystackVerify(reference) {
    return useQuery({
        queryKey: ['paystack-verify', reference],
        queryFn: async () => (await http.get('/api/v1/paystack', { params: { reference } })).data,
        enabled: !!reference,
    });
}
export function usePaystackReceipt(reference) {
    return useQuery({
        queryKey: ['paystack-receipt', reference],
        queryFn: async () => (await http.get('/api/v1/paystack/receipt', { params: { reference } })).data,
        enabled: !!reference,
    });
}
// Companies
export function useCompaniesList() {
    return useQuery({
        queryKey: ['companies'],
        queryFn: async () => (await http.get('/api/v1/companies/get-all-companies')).data,
    });
}
// Transactions
export function useTransactionHistory() {
    return useQuery({
        queryKey: ['transactions', 'history'],
        queryFn: async () => (await http.get('/api/v1/transactions/get-transaction-history')).data,
        enabled: !!tokenStore.access,
    });
}
export function useTransactionDetails(reference) {
    return useQuery({
        queryKey: ['transactions', 'details', reference],
        queryFn: async () => (await http.get('/api/v1/transactions/details', { params: { reference } })).data,
        enabled: !!reference && !!tokenStore.access,
    });
}
export function useTransferFunds() {
    return useMutation({
        mutationFn: async (payload) => {
            const res = await http.post('/api/v1/transactions/transfer-funds', null, {
                params: { receiverId: payload.receiverId, Amount: payload.amount },
            });
            return res.data;
        },
    });
}
export function useRefundTransaction() {
    return useMutation({
        mutationFn: async (reference) => {
            const res = await http.post('/api/v1/transactions/refund', null, { params: { reference } });
            return res.data;
        },
    });
}
export function useOpenDispute() {
    return useMutation({
        mutationFn: async (payload) => {
            const res = await http.post('/api/v1/transactions/dispute', null, { params: { reference: payload.reference, reason: payload.reason } });
            return res.data;
        },
    });
}
export function useResolveDispute() {
    return useMutation({
        mutationFn: async (payload) => {
            const res = await http.post('/api/v1/transactions/dispute/resolve', null, { params: { reference: payload.reference, approve: payload.approve, note: payload.note } });
            return res.data;
        },
    });
}
// Notifications
export function useNotificationsList(params) {
    const { page = 1, pageSize = 10, unreadOnly = false } = params || {};
    return useQuery({
        queryKey: ['notifications', { page, pageSize, unreadOnly }],
        queryFn: async () => (await http.get('/api/v1/notifications', { params: { page, pageSize, unreadOnly } })).data,
        enabled: !!tokenStore.access,
        select: (data) => data,
    });
}
export function useMarkNotificationRead() {
    return useMutation({
        mutationFn: async (id) => {
            const res = await http.post(`/api/v1/notifications/${id}/read`);
            return res.data;
        },
    });
}
export function useMarkAllNotificationsRead() {
    return useMutation({
        mutationFn: async () => {
            const res = await http.post('/api/v1/notifications/read-all');
            return res.data;
        },
    });
}
// Wallet
export function useWalletStatements(params) {
    const { page = 1, pageSize = 10, type, from, to } = params || {};
    return useQuery({
        queryKey: ['wallet', 'statements', { page, pageSize, type, from, to }],
        queryFn: async () => (await http.get('/api/v1/wallets/statements', { params: { page, pageSize, type, from, to } })).data,
        enabled: !!tokenStore.access,
    });
}
export function useWalletWithdraw() {
    return useMutation({
        mutationFn: async (amount) => {
            const res = await http.post('/api/v1/wallets/withdraw', null, { params: { amount } });
            return res.data;
        },
    });
}
