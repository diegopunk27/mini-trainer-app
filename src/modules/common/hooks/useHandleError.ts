import { AppContext } from '@global-contexts/AppContext';
import { showErrorToast } from '@common/utils/show-toast';
import axios from 'axios';
import { useContext } from 'react';

export enum ErrorMessages {
  INTERNET_CONNECTION_ERROR = 'Revisá tu conexión a internet e intentá de nuevo',
  UNAUTHORIZED_ERROR = 'La sesión expiró o no estás autorizado. Volvé a iniciar sesión',
  FORBIDDEN_ERROR = 'No tenés permiso para realizar esta acción',
  NOT_FOUND_ERROR = 'No se encontró el recurso solicitado',
  REQUEST_ERROR = 'Ocurrió un error al procesar la solicitud',
  SERVER_ERROR = 'Ocurrió un error de servidor',
  UNKNOWN_ERROR = 'Ocurrió un error desconocido',
}

export const useErrorHandler = () => {
  const onLogout = useContext(AppContext)?.onLogout;

  const handleError = (error: unknown) => {
    if (axios.isCancel(error)) {
      return;
    }

    if (axios.isAxiosError(error)) {
      if (!navigator.onLine) {
        showErrorToast(ErrorMessages.INTERNET_CONNECTION_ERROR);
        return;
      }

      const statusCode = error.response?.status;
      const errorMessage = (error.response?.data as { message?: string } | undefined)?.message;

      switch (statusCode) {
        case 401:
          showErrorToast(ErrorMessages.UNAUTHORIZED_ERROR);
          onLogout?.();
          break;
        case 403:
          showErrorToast(ErrorMessages.FORBIDDEN_ERROR);
          break;
        case 404:
          showErrorToast(ErrorMessages.NOT_FOUND_ERROR);
          break;
        case 409:
        case 422:
          showErrorToast(errorMessage || ErrorMessages.REQUEST_ERROR);
          break;
        default:
          showErrorToast(ErrorMessages.SERVER_ERROR);
      }
      return;
    }

    if (error instanceof Error) {
      showErrorToast(error.message);
      return;
    }

    showErrorToast(ErrorMessages.UNKNOWN_ERROR);
  };

  return handleError;
};
