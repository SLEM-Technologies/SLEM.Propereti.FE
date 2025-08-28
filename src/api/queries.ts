import { useQuery, useMutation } from '@tanstack/react-query';
import { OpenAPI } from './generated/core/OpenAPI';
import http from './http';
import { tokenStore } from './http';

OpenAPI.BASE = import.meta.env.VITE_API_BASE_URL as string;

// Mutations
export function useLogin() {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string; firstLogin?: boolean }) => {
      const res = await http.post('/api/v1/accounts/user-login', payload);
      return res.data;
    },
    onSuccess: (data: any) => {
      const access = data?.accessToken || data?.token || data?.data?.token;
      const refresh = data?.refreshToken || data?.data?.refreshToken;
      if (access) tokenStore.access = access;
      if (refresh) tokenStore.refresh = refresh;
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (payload: any) => {
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

export function usePropertyById(id?: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: async () => (await http.get(`/api/v1/properties/get-property-by-id`, { params: { Id: id } })).data,
    enabled: !!id,
  });
}

// Additional Auth flows
export function useForgotPassword() {
  return useMutation({
    mutationFn: async (email: string) => {
      const res = await http.post('/api/v1/accounts/forgot-password', null, { params: { Email: email } });
      return res.data;
    },
  });
}

export function useResetPasswordConfirm() {
  return useMutation({
    mutationFn: async (payload: { token: string; newPassword: string }) => {
      const res = await http.post('/api/v1/auth/password-reset/confirm', payload);
      return res.data;
    },
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: async (payload: { email: string; otpCode: string }) => {
      const res = await http.post('/api/v1/accounts/verify-email', payload);
      return res.data;
    },
  });
}

export function useVerifyPhone() {
  return useMutation({
    mutationFn: async (payload: { phoneNumber: string; otpCode: string }) => {
      const res = await http.post('/api/v1/accounts/verify-phonenumber', payload);
      return res.data;
    },
  });
}

export function useResendEmailVerification() {
  return useMutation({
    mutationFn: async (payload: { email: string }) => {
      const res = await http.post('/api/v1/auth/resend-email-verification', payload);
      return res.data;
    },
  });
}

// Paystack
export function usePaystackInit() {
  return useMutation({
    mutationFn: async (payload: { amount: string; email: string }) => {
      const res = await http.post('/api/v1/paystack', payload);
      return res.data;
    },
  });
}

export function usePaystackVerify(reference?: string) {
  return useQuery({
    queryKey: ['paystack-verify', reference],
    queryFn: async () => (await http.get('/api/v1/paystack', { params: { reference } })).data,
    enabled: !!reference,
  });
}

export function usePaystackReceipt(reference?: string) {
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