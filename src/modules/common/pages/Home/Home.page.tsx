import { Container, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Proyecto inicial con React y Vite
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Boilerplate con TypeScript, Material UI y el shell de navegación. Node 24.
      </Typography>
    </Container>
  );
};

export default HomePage;
