import { Box, Typography, Button, Container } from '@mui/material';
import { Email, Phone, GitHub, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        backdropFilter: 'blur(24px)',
        backgroundColor: 'rgba(207, 207, 207, 0.25)',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            {[
              { icon: <Email fontSize="small" />, label: 'Email', href: 'mailto:prateekpanwarengine@gmail.com' },
              { icon: <Phone fontSize="small" />, label: 'Call', href: 'tel:+917999956242' },
              { icon: <GitHub fontSize="small" />, label: 'GitHub', href: 'https://github.com/Prateek64X', target: '_blank' },
              { icon: <LinkedIn fontSize="small" />, label: 'LinkedIn', href: 'https://linkedin.com/in/prateek64x', target: '_blank' },
            ].map(({ icon, label, href, target }) => (
              <Button
                key={label}
                component="a"
                href={href}
                target={target}
                startIcon={icon}
                sx={{
                  color: 'rgba(0, 0, 0, 0.8)',
                  textTransform: 'none',
                  fontSize: '0.85rem',
                  minWidth: 'auto',
                  padding: '6px 12px',
                  borderRadius: 4,
                  transition: 'filter 0.3s',
                  '&:hover': {
                    backgroundColor: 'rgb(255,255,255,0.4)',
                    color: 'rgba(0, 0, 0, 0.8)',
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'rgba(0, 0, 0, 0.8)',
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
