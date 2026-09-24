import { ColorModeProvider } from '@common/contexts/ColorMode';
import CssBaseline from '@mui/material/CssBaseline';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import '@assets/scss/index.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.tsx';

ModuleRegistry.registerModules([AllCommunityModule]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColorModeProvider>
      <CssBaseline />
      <App />
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} />
    </ColorModeProvider>
  </StrictMode>,
);
