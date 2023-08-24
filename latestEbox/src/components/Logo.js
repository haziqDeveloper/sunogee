import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import Dtilogo from '../assets/images/logo_dti.png';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR
  // const logo = <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />

  const logo = () => {
    return(
      <>
      <img src={Dtilogo} alt="a"/>
      </>
    )
    };
  if (disabledLink) {
    return <>{Logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
