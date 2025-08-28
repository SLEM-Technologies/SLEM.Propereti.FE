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