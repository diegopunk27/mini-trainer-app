import { Card, CardContent, Typography } from '@mui/material';

export const CenteredMessageCard = ({ message }: { message: string }) => (
  <Card sx={{ maxWidth: 480, mx: 'auto', mt: 6 }}>
    <CardContent>
      <Typography align="center">{message}</Typography>
    </CardContent>
  </Card>
);
