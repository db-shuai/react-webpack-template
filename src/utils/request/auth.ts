// import { Persistent } from '@/utils/cache/persistent'
// import { PLATFORM_TOKEN_KEY } from '@/enums/cacheEnum'
// import { PageEnum } from '@/enums/pageEnum'
import { useNavigate } from "react-router-dom";

const LOGIN = "/login";
const PLATFORM_TOKEN_KEY = "TOKEN_KEY";
export function setToken(token: string) {
  localStorage.setItem(PLATFORM_TOKEN_KEY, token);
}

export function getToken() {
  const token = localStorage.get(PLATFORM_TOKEN_KEY);
  return token as string;
}

export function removeToken() {
  localStorage.removeItem(PLATFORM_TOKEN_KEY);
}

// 重新验证
export const goToLogin = (): void => {
  const navigate = useNavigate();
  navigate(LOGIN);
};
