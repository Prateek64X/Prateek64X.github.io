import React, { useState } from 'react';
import { Box, Tabs, Tab, Grid, Typography } from '@mui/material';
import { coloredTechnologyIcons } from '../utils/technologyIcons';
import skillsData from '../data/experience.json';

const categories = ['All', ...Object.keys(skillsData.skills)];

const SkillsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const allSkills =
    selectedCategory === 'All'
      ? Object.values(skillsData.skills).flat()
      : skillsData.skills[selectedCategory];

  return (
    <Box>
      <Tabs
        value={selectedCategory}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          backdropFilter: 'blur(15px)',
          backgroundColor: 'rgba(207, 207, 207, 0.25)',
          borderRadius: '30px',
          mb: 2,
          px: 1.5,
          py: 0.5,
          width: 'fit-content',
          mx: 'auto',
          boxShadow: '0 4px 8px rgba(39, 39, 39, 0.1)',
          transform: { xs: 'scale(0.9)', sm: 'scale(0.7)' },
          '& .MuiTab-root': {
            minWidth: 'fit-content',
            color: 'rgba(0, 0, 0, 0.7)',
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            padding: { xs: '6px 14px', sm: '8px 18px' },
            borderRadius: '30px',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },

            '&.Mui-selected': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              color: '#000',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)',
              mx: 1,
            },
          },

          '& .MuiTabs-indicator': {
            display: 'none',
          },
        }}
      >
        {categories.map((category) => (
          <Tab key={category} label={category} value={category} />
        ))}
      </Tabs>


      <Grid container spacing={3} justifyContent="center" sx={{ width: '100%' }}>
        {allSkills.map((skill) => (
          <Grid item xs={4} sm={3} md={2} key={skill}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{
                transition: 'transform 0.2s',
                gap: '4px',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '50%',
                  width: 90,
                  height: 90,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={coloredTechnologyIcons[skill]}
                  alt={skill}
                  sx={{ width: 40, height: 40 }}
                />
                <Typography
                  variant="caption"
                  align="center"
                  sx={{
                    fontSize: '0.6rem',
                    fontWeight: 500,
                    letterSpacing: -0.2,
                    pt: 0.5,
                    color: 'rgba(50, 50, 50, 0.9)',
                  }}
                >
                  {skill}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SkillsSection;
