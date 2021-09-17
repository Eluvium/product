import { backendService } from '_services';

export function authHeader() {
  // return authorization header with jwt token
  const token = backendService.currentTokenValue;
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}
