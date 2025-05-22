import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Projects from './pages/Projects';
import LinkBrowser from './components/LinkBrowser';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import backgroundImg from '/images/background.jpg';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7ab2e9',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
    custom: {
      buttonBackground: 'rgba(255, 255, 255, 0.12)',
      buttonBackgroundPrimary: 'rgba(180, 220, 255, 0.12)',
      buttonBackgroundSuccess: 'rgba(180, 255, 200, 0.12)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          margin: '2pt',
        },
        contained: {
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          color: '#212121',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
          },
        },
        containedPrimary: {
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backgroundColor: 'rgba(180, 220, 255, 0.12)',
          color: '#0d47a1',
          '&:hover': {
            backgroundColor: 'rgba(180, 220, 255, 0.25)',
            border: '1px solid #90caf9',
          },
        },
        containedSuccess: {
          border: '1px solid rgba(255, 255, 255, 0.2)', // 👈 And here
          backgroundColor: 'rgba(180, 255, 200, 0.12)',
          color: '#1b5e20',
          '&:hover': {
            backgroundColor: 'rgba(180, 255, 200, 0.25)',
            border: '1px solid #81c784',
          },
        },
      },
    },
  },  
});

export default function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
      }}
    >
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Router>
        <div className="min-h-screen bg-gray-50" style={{ paddingTop: 'var(--navbar-offset)' }}>
          <Navbar />
          <Routes>
            {/* <Route path="/" element={<Home />} />  // Temporary disabled Home */}
            {/* <Route path="/portfolio" element={<Portfolio />} /> */}
            <Route path="/" element={<Portfolio />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </div>
      </Router>
      <LinkBrowser />
    </ThemeProvider>
    </Box>
  );
}