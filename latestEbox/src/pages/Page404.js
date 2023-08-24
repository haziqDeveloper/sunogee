import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
// components
import Page from '../components/Page';
import NotFound from '../assets/images/illustration_404.svg';
// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
          Sorry, page not found!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
          The page you are looking for could not be found. Perhaps you mistyped the URL?
          </Typography>

          <Box component="img" src={NotFound} sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }} />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go Home
          </Button>
        </ContentStyle>
      </Container>
  );
}
