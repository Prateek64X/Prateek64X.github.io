import React from 'react';
import { 
  Grid, 
  Typography, 
  Box,
  useTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import { 
  EmojiEvents as TrophyIcon
} from '@mui/icons-material';
import experienceData from '../data/experience.json';

const AchievementCard = ({ award }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        p: 2,
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(24px)',
        borderRadius: 4,
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderColor: 'rgba(0, 0, 0, 0.2)',
          '& .swiper-button-next, & .swiper-button-prev': {
            opacity: 1,
          }
        }
      }}
    >
      <Box
        sx={{
          p: 1,
          bgcolor: 'rgba(230, 192, 68, 0.4)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          flexShrink: 0,
          mt: 0.5
        }}
      >
        <TrophyIcon 
          sx={{ 
            color: '#D4AF37',
            fontSize: '1.2rem'
          }} 
        />
      </Box>

      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: 'calc(100% - 24px)',
        justifyContent: 'space-between'
      }}>
          <Typography 
            variant="subtitle1" 
            fontWeight="bold"
            color="rgba(0, 0, 0, 0.87)"
            sx={{ 
              lineHeight: 1.3,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {award.award}
          </Typography>
          <Typography
            variant="body2"
            color="rgba(0, 0, 0, 0.7)"
            sx={{ 
              lineHeight: 1.4,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {award.organization}
          </Typography>
          <Typography 
            variant="caption" 
            color="rgba(0, 0, 0, 0.6)"
            sx={{ display: 'block', mt: 1 }}
          >
            {award.date}
          </Typography>
      </Box>
    </Box>
  );
};

const AchievementsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
      <Box sx={{ 
        width: '100%',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
        gap: 2
      }}>
        {experienceData.awards.map((award, index) => (
          <Box 
            key={index}
            sx={{
              display: 'flex',
              minHeight: '120px'
            }}
          >
            <AchievementCard award={award} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default AchievementsSection;