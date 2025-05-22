import React from 'react';
import { Box, Typography, Paper, useMediaQuery } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import experienceData from '../data/experience.json';

const ExperienceSection = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box display="flex" justifyContent="center" width="100%">
      <Box width="100%" maxWidth={isMobile ? '100%' : '800px'}>
        <Timeline 
          position="right" 
          sx={{
            mt: 2,
            mb: 0,
            // Remove default padding before content
            '& .MuiTimelineItem-root:before': {
              flex: 0,
              padding: 0,
            },
            // Adjust spacing for mobile
            padding: isMobile ? '0 16px' : '0',
          }}
        >
          {experienceData.experience.map((item, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                {index < experienceData.experience.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent 
                sx={{ 
                  // Take full available width (minus dot space)
                  maxWidth: 'none',
                  width: '100%',
                  // Adjust padding for mobile
                  px: isMobile ? 1 : 2,
                  py: 1,
                }}
              >
                <Paper 
                  elevation={3} 
                  sx={{ 
                    p: 2, 
                    borderRadius: 4,
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(24px)',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    },
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.company} — {item.duration}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    {item.description}
                  </Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
    </Box>
  );
};

export default ExperienceSection;