import {
  clearAuthenticationKeys,
  getToken,
  setAccessToken,
} from '@common/services/http/private-http.service';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import { AppContext, AppUser } from './App.context';

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | undefined>(() => getToken() || undefined);
  const [user] = useState<AppUser | undefined>(undefined);

  const onLogin = useCallback((nextToken: string) => {
    setAccessToken(nextToken);
    setToken(nextToken);
  }, []);

  const onLogout = useCallback(() => {
    clearAuthenticationKeys();
    setToken(undefined);
  }, []);

  const value = useMemo(
    () => ({ token, user, onLogin, onLogout }),
    [token, user, onLogin, onLogout],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
