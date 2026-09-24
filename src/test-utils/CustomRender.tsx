import { AppActionsProvider } from '@common/contexts/AppActions';
import { ColorModeProvider } from '@common/contexts/ColorMode';
import { PageHeaderProvider } from '@common/contexts/PageHeader';
import { AppProvider } from '@global-contexts/AppContext';
import CssBaseline from '@mui/material/CssBaseline';
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
}

const Providers = ({ children, route }: { children: ReactNode; route: string }) => (
  <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
    <ColorModeProvider>
      <MemoryRouter initialEntries={[route]}>
        <AppProvider>
          <PageHeaderProvider>
            <AppActionsProvider>
              <CssBaseline />
              {children}
              <ToastContainer />
            </AppActionsProvider>
          </PageHeaderProvider>
        </AppProvider>
      </MemoryRouter>
    </ColorModeProvider>
  </SWRConfig>
);

export const customRender = (ui: ReactElement, options: CustomRenderOptions = {}) => {
  const { route = '/', ...renderOptions } = options;
  return render(ui, {
    wrapper: ({ children }) => <Providers route={route}>{children}</Providers>,
    ...renderOptions,
  });
};
