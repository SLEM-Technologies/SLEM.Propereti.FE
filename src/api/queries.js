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
export function useCreateProperty() {
    return useMutation({
        mutationFn: async (payload) => {
            const res = await http.post('/api/v1/properties/create-property', payload);
            return res.data;
        },
    });
}
// Legal docs
export function useListLegalDocs(propertyId) {
    return useQuery({
        queryKey: ['legal-docs', propertyId],
        queryFn: async () => (await http.get(`/api/v1/properties/${propertyId}/legal-docs`)).data,
        enabled: !!propertyId && !!tokenStore.access,
    });
}
export function useUploadLegalDoc(propertyId) {
    return useMutation({
        mutationFn: async (payload) => {
            const res = await http.post(`/api/v1/properties/${propertyId}/legal-docs`, payload.base64, { params: { documentType: payload.documentType } });
            return res.data;
        },
    });
}
export function useGetLegalDoc(propertyId) {
    return useMutation({
        mutationFn: async (id) => {
            const res = await http.get(`/api/v1/properties/${propertyId}/legal-docs/${id}`);
            return res.data;
        },
    });
}
export function useDeleteLegalDoc(propertyId) {
    return useMutation({
        mutationFn: async (id) => {
            const res = await http.delete(`/api/v1/properties/${propertyId}/legal-docs/${id}`);
            return res.data;
        },
    });
}
export function useReplaceLegalDoc(propertyId) {
    return useMutation({
        mutationFn: async (payload) => {
            const res = await http.post(`/api/v1/properties/${propertyId}/legal-docs/${payload.id}/replace`, payload.base64);
            return res.data;
        },
    });
}
// Search
export function useSearchProperties(params) {
    const { PageNumber = 1, PageSize = 10, SearchParams, sort } = params || {};
    return useQuery({
        queryKey: ['search', 'properties', { PageNumber, PageSize, SearchParams, sort }],
        queryFn: async () => (await http.get('/api/v1/search/properties', { params: { PageNumber, PageSize, SearchParams, sort } })).data,
    });
}
export function useSearchSuggest(q, limit = 10) {
    return useQuery({
        queryKey: ['search', 'suggest', q, limit],
        queryFn: async () => (await http.get('/api/v1/search/suggest', { params: { q, limit } })).data,
        enabled: (q?.length || 0) > 0,
    });
}
export function useSearchNearby(params) {
    const { lat, lng, radiusKm = 10, page = 1, pageSize = 10 } = params || {};
    return useQuery({
        queryKey: ['search', 'nearby', { lat, lng, radiusKm, page, pageSize }],
        queryFn: async () => (await http.get('/api/v1/search/nearby', { params: { lat, lng, radiusKm, page, pageSize } })).data,
        enabled: typeof lat === 'number' && typeof lng === 'number',
    });
}
// Contracts
export function useContractsList(propertyId) {
    return useQuery({
        queryKey: ['contracts', { propertyId }],
        queryFn: async () => (await http.get('/api/v1/contracts', { params: { propertyId } })).data,
        enabled: !!propertyId && !!tokenStore.access,
    });
}
export function useContractById(id) {
    return useQuery({
        queryKey: ['contract', id],
        queryFn: async () => (await http.get(`/api/v1/contracts/${id}`)).data,
        enabled: !!id && !!tokenStore.access,
    });
}
export function useCreateContract() {
    return useMutation({
        mutationFn: async (payload) => {
            const { propertyId, buyerUserId, sellerUserId, contractType, body } = payload;
            const res = await http.post('/api/v1/contracts', body, { params: { propertyId, buyerUserId, sellerUserId, contractType } });
            return res.data;
        },
    });
}
export function useSignContract() {
    return useMutation({
        mutationFn: async (payload) => {
            const res = await http.post(`/api/v1/contracts/${payload.id}/sign`, null, { params: { role: payload.role } });
            return res.data;
        },
    });
}
export function useCancelContract() {
    return useMutation({
        mutationFn: async (id) => {
            const res = await http.post(`/api/v1/contracts/${id}/cancel`);
            return res.data;
        },
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
// Admin Roles & Permissions
export function useCreateRole() {
    return useMutation({
        mutationFn: async (payload) => {
            const res = await http.post('/api/v1/admin/roles', payload);
            return res.data;
        },
    });
}
export function useListRolesByCompany(companyId) {
    return useQuery({
        queryKey: ['admin', 'roles', companyId],
        queryFn: async () => (await http.get(`/api/v1/admin/roles/${companyId}`)).data,
        enabled: !!companyId && !!tokenStore.access,
    });
}
export function useAssignUserRole() {
    return useMutation({
        mutationFn: async (payload) => {
            const res = await http.post('/api/v1/admin/roles/assign', payload);
            return res.data;
        },
    });
}
export function useAssignPermission() {
    return useMutation({
        mutationFn: async (payload) => {
            const res = await http.post('/api/v1/admin/permissions/assign', payload);
            return res.data;
        },
    });
}
export function useListPermissionsByCompany(companyId) {
    return useQuery({
        queryKey: ['admin', 'permissions', companyId],
        queryFn: async () => (await http.get(`/api/v1/admin/permissions/${companyId}`)).data,
        enabled: !!companyId && !!tokenStore.access,
    });
}
// User preferences & settings
export function useUserPreferences() {
    return useQuery({
        queryKey: ['user-preferences'],
        queryFn: async () => (await http.get('/api/v1/users/preferences')).data,
        enabled: !!tokenStore.access,
    });
}
export function useUpdateUserPreferences() {
    return useMutation({
        mutationFn: async (payload) => {
            const res = await http.put('/api/v1/users/preferences', payload);
            return res.data;
        },
    });
}
export function useUserNotificationSettings() {
    return useQuery({
        queryKey: ['user-notification-settings'],
        queryFn: async () => (await http.get('/api/v1/users/notification-settings')).data,
        enabled: !!tokenStore.access,
    });
}
export function useUpdateUserNotificationSettings() {
    return useMutation({
        mutationFn: async (payload) => {
            const res = await http.put('/api/v1/users/notification-settings', payload);
            return res.data;
        },
    });
}
export function useUploadAvatar() {
    return useMutation({
        mutationFn: async (base64) => {
            const res = await http.post('/api/v1/users/upload-avatar', base64);
            return res.data;
        },
    });
}
