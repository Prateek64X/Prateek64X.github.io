import React from 'react';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import AchievementsSection from '../components/AchievementsSection';
import { FeaturedProjects } from '../components/ProjectCard';
import Footer from '../components/Footer';
import { Box, Container, Typography, Avatar, useTheme } from '@mui/material';

const Section = ({ title, children, id, hasBorder = true }) => (
  <Box id={id} component="section" >
    <Container 
      maxWidth={false}
      sx={{
        width: '100%',
        px: { xs: 2, sm: 4, md: 6 },
        maxWidth: { md: '1200px' },
        mx: 'auto',
      }}
    >
      {title && (
        <Typography 
          component="h2" 
          fontWeight="bold" 
          gutterBottom
          sx={{ 
            mb: 2,
            fontSize: '2.6rem',
            color: 'rgb(20,20,20)',
            lineHeight: 1.2,
            textShadow: `
              2px 2px 0 rgba(234,234,234,0.6),
              -2px -2px 0 rgba(234,234,234,0.6),
              2px -2px 0 rgba(234,234,234,0.6),
              -2px 2px 0 rgba(234,234,234,0.6)
            `
          }}
        >
          {title}
        </Typography>
      )}
      {children}
    </Container>
    {hasBorder && (
      <Box
        maxWidth="lg"
        sx={{
          width: '50%',
          borderBottom: '1px solid',
          borderColor: 'divider',
          mx: 'auto',
          my: 3,
        }}
      />
    )}
  </Box>
);


const Portfolio = () => {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero/About Section */}
      <Section id="about">
        <Container 
          maxWidth={false}
          sx={{
            width: '100%',
            px: { xs: 2, sm: 4, md: 6 },
            maxWidth: { md: '1200px' },
            mx: 'auto',
            mt: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: 4,
              p: { xs: 2, md: 2 },
              backdropFilter: 'blur(2px)',
              backgroundColor: 'rgba(234, 234, 234, 0.6)',
              borderRadius: 4,
              mx: 'auto',
              maxWidth: '1200px',
            }}
          >
            {/* Profile Image */}
            <Avatar
              src="/images/ProfilePhoto.webp"
              sx={{
                width: { xs: 120, md: 160 },
                height: { xs: 120, md: 160 },
                border: `4px solid rgba(255, 255, 255, 0.2)`,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                flexShrink: 0,
              }}
            />

            {/* Text Content */}
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, flex: 1 }}>
              <Typography variant="h4" fontWeight="bold" mb={1}>
                Prateek Panwar
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  fontWeight: 600,
                }}
              >
                Full-Stack Web Developer · AR/VR Enthusiast · Mobile App Developer
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  fontSize: '1.05rem',
                  fontWeight: 500,
                  maxWidth: '700px',
                  mx: { xs: 'auto', md: 0 },
                }}
              >
                Hi, I’m a full-stack developer experienced in React, Node.js, and Java.
                I love building immersive AR/VR experiences with Unreal and Unity, and also develop mobile apps.<br/>
                I specialize in integrating diverse technologies to create seamless, scalable solutions.
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

      <Section title="Awards & Achievements" id="achievements" hasBorder={false}>
        <AchievementsSection />
      </Section>

      <Footer />
    </Box>
  );
};

export default Portfolio;