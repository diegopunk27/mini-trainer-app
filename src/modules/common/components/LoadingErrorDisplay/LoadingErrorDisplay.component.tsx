import { CenteredMessageCard } from '../CenteredMessageCard';
import { FullScreenSpinner } from '../FullScreenSpinner';

export interface LoadingErrorDisplayProps {
  isLoading: boolean;
  error?: { message?: string } | null;
  isEmpty?: boolean;
  emptyMessage?: string;
  errorMessage?: string;
}

export const LoadingErrorDisplay = ({
  isLoading,
  error,
  isEmpty,
  emptyMessage = 'No hay datos para mostrar',
  errorMessage = 'Ocurrió un error al cargar los datos',
}: LoadingErrorDisplayProps) => {
  if (isLoading) {
    return <FullScreenSpinner />;
  }

  if (error) {
    return <CenteredMessageCard message={error.message || errorMessage} />;
  }

  if (isEmpty) {
    return <CenteredMessageCard message={emptyMessage} />;
  }

  return null;
};
