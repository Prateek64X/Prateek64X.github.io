import { useEffect, useState } from 'react';
import { Box, IconButton, keyframes } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Animation keyframes
const fadeIn = keyframes`
  from { background-color: rgba(0, 0, 0, 0); }
  to { background-color: rgba(0, 0, 0, 0.7); }
`;

const fadeOut = keyframes`
  from { background-color: rgba(0, 0, 0, 0.7); }
  to { background-color: rgba(0, 0, 0, 0); }
`;

const scaleIn = keyframes`
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const scaleOut = keyframes`
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0; }
`;

export default function LinkBrowser() {
  const [link, setLink] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      setIsClosing(false);
      setLink(e.detail);
    };
    window.addEventListener('openLinkBrowser', handler);
    return () => window.removeEventListener('openLinkBrowser', handler);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setLink(null);
    }, 300); // Match this with your animation duration
  };

  const handleBackgroundClick = (e) => {
    if (e.target.id === 'link-browser-backdrop') {
      handleClose();
    }
  };

  const isYouTube = (url) =>
    url.includes("youtube.com/watch") || url.includes("youtu.be/");

  const getEmbedUrl = (url) => {
    if (url.includes("youtube.com/watch"))
      return url.replace("watch?v=", "embed/");
    if (url.includes("youtu.be/"))
      return "https://www.youtube.com/embed/" + url.split("/").pop();
    return url;
  };

  // Directly open external sites (non-YouTube) in new tab
  if (link && !isYouTube(link)) {
    window.open(link, '_blank', 'noopener,noreferrer');
    setLink(null);
    return null;
  }

  if (!link) return null;

  return (
    <Box
      id="link-browser-backdrop"
      onClick={handleBackgroundClick}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        animation: `${isClosing ? fadeOut : fadeIn} 0.3s ease-out`,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: '70vw',
          height: '84.4vh',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          borderRadius: 3,
          position: 'relative',
          boxShadow: 4,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          animation: `${isClosing ? scaleOut : scaleIn} 0.3s ease-in-out`,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 10,
            display: 'flex',
            gap: 1,
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              color: 'white',
              transform: 'scale(1.2)',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, mt: 8 }}>
          <iframe
            src={getEmbedUrl(link)}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="YouTube Preview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </Box>
      </Box>
    </Box>
  );
}