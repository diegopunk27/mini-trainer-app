export interface PageMeta {
  title: string;
  subtitle: string;
}

export const resolvePageMeta = (pathname: string): PageMeta => {
  if (pathname.startsWith('/home')) {
    return { title: 'Inicio', subtitle: 'Plantilla' };
  }
  if (pathname.startsWith('/login')) {
    return { title: 'Iniciar sesión', subtitle: '' };
  }
  return { title: 'App', subtitle: '' };
};
