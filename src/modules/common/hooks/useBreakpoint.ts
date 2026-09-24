import { BREAKPOINT_MQ } from '@common/constants/breakpoints';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useBreakpoint = () => {
  const isCompact = useMediaQuery(BREAKPOINT_MQ.compact);
  const isTablet = useMediaQuery(BREAKPOINT_MQ.tablet);
  const isTouch = useMediaQuery(BREAKPOINT_MQ.touch);
  return { isCompact, isTablet, isTouch };
};
