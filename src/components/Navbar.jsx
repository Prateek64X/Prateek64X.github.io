import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import '../index.css';

export default function Navbar() {
  const isMobile = useMediaQuery('(max-width: 768px)'); // Check for mobile screen size
  const [showFullNav, setShowFullNav] = useState(true); // Handle full navbar visibility
  const [drawerOpen, setDrawerOpen] = useState(false); // Drawer open state
  const [lastScrollY, setLastScrollY] = useState(0); // Scroll position tracking
  const location = useLocation();

  // Handle scroll to hide navbar on scroll down
  const handleScroll = useCallback(() => {
    if (window.scrollY > lastScrollY && window.scrollY > 50) {
      setShowFullNav(false);
    } else if (window.scrollY < lastScrollY - 5) {
      setShowFullNav(true);
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Navbar links
  const links = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Portfolio', icon: <DashboardCustomizeIcon /> },
    { text: 'Contact', icon: <ContactMailIcon /> },
  ];

  const navContent = (
    <Box sx={{ pt: 8, px: 2 }}>
      {/* Header Text */}
      <Box sx={{ mb: 3, ml: 2 }}>
        <Box sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 'bold', fontSize: '20px' }}>
          My Portfolio
        </Box>
        <Box sx={{ color: 'white', fontSize: '24px' }}>
          Prateek Panwar
        </Box>
      </Box>

      {/* Links */}
      <List>
        {links.map((link) => {
          const path = link.text === 'Home' ? '/' : `/${link.text.toLowerCase()}`;
          const isActive = location.pathname === path;

          return (
            <ListItem
              button
              key={link.text}
              component={Link}
              to={path}
              onClick={() => setDrawerOpen(false)}
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 2,
                color: isActive ? 'white' : 'rgba(255, 255, 255, 0.3)',
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                textDecoration: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: 'white',
                },
                '& .MuiListItemText-root': {
                  ml: 2,
                },
              }}
            >
              {link.icon}
              <ListItemText primary={link.text} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {/* Top Glass Navbar (desktop) */}
      {showFullNav && !isMobile ? (
        <AppBar
          position="fixed"
          elevation={0}
          className={`navbar-transition ${showFullNav ? 'navbar-visible' : 'navbar-hidden'}`}
          sx={{
            top: 20,
            left: '50%',
            borderRadius: '30px',
            backdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            width: '90%',
            maxWidth: 1000,
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ fontWeight: 'bold' }}>My Portfolio - Prateek Panwar</Box>
            <Box>
              {links.map((link) => {
                const path = link.text === 'Home' ? '/' : `/${link.text.toLowerCase()}`;
                const isActive = location.pathname === path;

                return (
                  <Button
                    key={link.text}
                    component={Link}
                    to={path}
                    startIcon={link.icon}
                    color="inherit"
                    sx={{
                      color: isActive ? 'white' : 'rgba(255, 255, 255, 0.3)',
                      textTransform: 'none',
                      '&:hover': {
                        color: 'white',
                        backgroundColor: 'transparent',
                        textDecoration: 'none',
                      },
                    }}
                  >
                    {link.text}
                  </Button>
                );
              })}
            </Box>
          </Toolbar>
        </AppBar>
      ) : (
        // Mobile: Floating button and Drawer
        <>
          <IconButton
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{
              position: 'fixed',
              top: 20,
              left: 20,
              zIndex: 1400,
              bgcolor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
              borderRadius: '50%',
              p: 1.5,
              opacity: (!showFullNav || isMobile) ? 1 : 0,
              transform: (!showFullNav || isMobile) ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'opacity 300ms ease, transform 300ms ease',
              pointerEvents: (!showFullNav || isMobile) ? 'auto' : 'none',
            }}
          >
            {drawerOpen ? <CloseIcon sx={{ color: 'white' }} /> : <MenuIcon sx={{ color: 'white' }} />}
          </IconButton>

          {/* Drawer for mobile links */}
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
              sx: {
                bgcolor: 'rgba(0, 0, 0, 0.3)', // Consistent grey translucent background
                backdropFilter: 'blur(20px)',  // Glass effect
                color: 'white',
                borderRadius: '20px',
                width: 300,
                m: 2,
                height: 'calc(100% - 32px)', // Full height of the screen minus some margin
                boxSizing: 'border-box',
              },
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {navContent}
          </Drawer>
        </>
      )}
    </>
  );
}
