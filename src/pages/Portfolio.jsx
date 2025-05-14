import React from 'react';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import AchievementsSection from '../components/AchievementsSection';
import { FeaturedProjects } from '../components/ProjectCard';
import Footer from '../components/Footer';
import { Box, Container, Typography, Avatar, useTheme } from '@mui/material';


const Section = ({ title, children, id }) => (
  <Box 
    id={id}
    component="section" 
    sx={{ 
      py: { xs: 2, md: 2 },
      borderBottom: '1px solid',
      borderColor: 'divider',
      '&:last-child': {
        borderBottom: 'none'
      }
    }}
  >
    <Container maxWidth="lg" sx={{ pt: 2, pb: 4 }}>
      {title && (
        <Typography 
          variant="h4" 
          component="h2" 
          fontWeight="bold" 
          gutterBottom
          sx={{ mb: 4 }}
        >
          {title}
        </Typography>
      )}
      {children}
    </Container>
  </Box>
);

const Portfolio = () => {
  const theme = useTheme();

  return (
    <Box sx={{ pt: 2 }}>
      {/* Hero/About Section */}
      <Section id="about">
        <Container maxWidth="lg" sx={{ 
          display: 'flex',
          justifyContent: 'center',
          pt: 4,
          ml: 2,
        }}>
          <Box sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 4,
            maxWidth: '1200px',
            width: '90%',
            backdropFilter: 'blur(2px)',
            borderRadius: 4,
            px: 3,
            py: -2,
            mx: { xs: 'auto', md: 0 },
          }}>
            <Avatar
              src="../../public/images/ProfilePhoto.jpg"
              sx={{ 
                width: { xs: 120, md: 160 }, 
                height: { xs: 120, md: 160 },
                border: `4px solid rgba(255, 255, 255, 0.2)`,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                flexShrink: 0
              }}
            />
            
            <Box sx={{ 
              textAlign: { xs: 'center', md: 'left' },
              flex: 1
            }}>
              <Typography variant="h4" component="h1" fontWeight="bold" marginBottom={'2pt'}>
                Prateek Panwar
              </Typography>
              <Typography 
                variant="h6" 
                color="primary.main"
                sx={{ 
                  mb: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}
              >
                Full-Stack Web Developer | AR/VR Experiences | Mobile Developer
              </Typography>
              
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  maxWidth: '700px',
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  mx: { xs: 'auto', md: 0 }
                }}
              >
                Hi, I’m skilled in building full‑stack web applications with React.js, Node.js and Java.
                I enjoy creating immersive AR/VR and architectural visualizations using Unity 3D and Unreal Engine.
                I also develop mobile applications using Flutter and Swift. My strength lies in integrating diverse technologies to build 
                intuitive, scalable, and future-ready digital products.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Section>

      <Section title="Skills" id="skills">
        <SkillsSection />
      </Section>

      <Section title="Experience" id="experience">
        <ExperienceSection />
      </Section>

      <Section title="Featured Projects" id="projects">
        <FeaturedProjects />
      </Section>

      <Section title="Awards & Achievements" id="achievements">
        <AchievementsSection />
      </Section>

      <Footer />
    </Box>
  );
};

export default Portfolio;