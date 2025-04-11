import { useState, useEffect } from 'react';
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

export default function Navbar() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [showFullNav, setShowFullNav] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowFullNav(false);
    } else {
      setShowFullNav(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const links = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Portfolio', icon: <DashboardCustomizeIcon /> },
    { text: 'Contact', icon: <ContactMailIcon /> },
  ];

  const navContent = (
    <Box sx={{ pt: 8, px: 2 }}>
      {/* Header Text */}
      <Box sx={{ mb: 3, ml: 2 }}>
        <Box sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 'bold', fontSize: '20px'}}>
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
          sx={{
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '30px',
            backdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
        // Floating Button (mobile or when navbar hidden)
        <IconButton
          onClick={() => setDrawerOpen(!drawerOpen)}
          sx={{
            position: 'fixed',
            top: 20,
            left: 20,
            zIndex: 1400,
            bgcolor: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '50%',
            p: 1.5,
          }}
        >
          {drawerOpen ? (
            <CloseIcon sx={{ color: 'white' }} />
          ) : (
            <MenuIcon sx={{ color: 'white' }} />
          )}
        </IconButton>
      )}

      {/* Left Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: 'rgba(30,30,30,0.8)',
            backdropFilter: 'blur(20px)',
            color: 'white',
            borderRadius: '20px',
            width: 300,
            m: 2,
            height: 'calc(100% - 32px)',
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
  );
}
