import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api";
import { QUERY_KEYS } from "@/feature/query-keys";
import type { LoginRequest } from "../types";
import { setToken } from "@/lib/auth";
import { useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      // 토큰 저장
      setToken(response.token);
      // 인증 상태 캐시 업데이트
      queryClient.setQueryData(QUERY_KEYS.AUTH.LOGIN, response);
    },
  });
};
