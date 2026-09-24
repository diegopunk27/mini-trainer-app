import { ColorModeContext } from '@common/contexts/ColorMode';
import { useContext } from 'react';

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) throw new Error('useColorMode must be used within ColorModeProvider');
  return context;
};
