import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Tooltip,
  Button,
  Chip
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { technologyIcons } from '../utils/technologyIcons';
import { MdPlayCircleOutline, MdOpenInNew } from 'react-icons/md';
import { FaTrophy } from "react-icons/fa";
import projectsData from '../data/projects.json';

export default function ProjectCard({ project }) {
  const hasImages = Array.isArray(project.images) && project.images.length > 0;

  return (
    <Card
      sx={{
        backdropFilter: 'blur(24px)',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: 'none',
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(100, 100, 100, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderColor: 'rgba(0, 0, 0, 0.2)',
          '& .swiper-button-next, & .swiper-button-prev': {
            opacity: 1,
          }
        },
        '& .swiper': {
          width: '100%',
          height: '200px',
        },
        '& .swiper-button-next, & .swiper-button-prev': {
          color: '#666',
          opacity: 0.5,
          transition: 'opacity 0.3s ease',
          '&:after': {
            fontSize: '1.2rem',
          }
        },
        '& .swiper-pagination-bullet': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
        '& .swiper-pagination-bullet-active': {
          backgroundColor: '#555',
        }
      }}
    >
      {hasImages ? (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true,
            horizontalClass: 'swiper-pagination-horizontal',
            
          }}
          spaceBetween={10}
          slidesPerView={1}
          style={{
            width: '100%',
            height: '280px'
          }}
          onInit={(swiper) => {
            // Force pagination update on init to fix centering issue
            setTimeout(() => {
              swiper.pagination.render();
              swiper.pagination.update();
            }, 100);
          }}
        >
          {project.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <Box
                component="img"
                src={img}
                alt={`Project Image ${idx}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  filter: 'brightness(0.95)',
                  transition: 'filter 0.3s ease',
                  '&:hover': {
                    filter: 'brightness(1)',
                  }
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Box
          sx={{
            height: 200,
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(0, 0, 0, 0.4)',
            fontStyle: 'italic',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          No Image Available
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold" color="rgba(0, 0, 0, 0.87)">
            {project.name}
          </Typography>
          {project.date && (
            <Typography variant="caption" color="rgba(0, 0, 0, 0.6)">
              {project.date}
            </Typography>
          )}
        </Box>

        <Typography
          variant="body2"
          color="rgba(0, 0, 0, 0.7)"
          sx={{
            mt: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minHeight: '4.5em',
            lineHeight: '1.5em',
            whiteSpace: 'normal'
          }}
        >
          {project.description}
        </Typography>

        {/* Achievement Chip (Left Side) */}
        {project.Achievement ? (
            <Chip
              icon={<FaTrophy size={14} />}
              label={project.Achievement}
              size="medium"
              sx={{
                backgroundColor: '#d1a332',
                color: 'rgba(255, 255, 255, 0.9)', // Dark text
                fontWeight: 'bold',
                marginTop: '8px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                '& .MuiChip-icon': {
                  color: 'inherit',
                  marginLeft: '8px',
                  marginRight: '-4px'
                }
              }}
            />
          ) : (
          <Box /> // Empty Box to maintain space-between layout if no achievement
        )}
        <Box
          mt={1}
          display="flex"
          justifyContent="space-between" // Pushes chip left, buttons right
          alignItems="center" // Vertically aligns chip and buttons
          gap={1} // Adds space if they get close on small screens
        >
          {project.technologies && project.technologies.length > 0 && (
          <Box display="flex" gap={1} flexWrap="wrap">
            {project.technologies.map((tech, idx) => (
              <Tooltip key={idx} title={tech} arrow>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    color: 'rgba(0, 0, 0, 0.8)',
                    '& svg': {
                      width: '70%',
                      height: '70%',
                    }
                  }}
                >
                  {technologyIcons[tech] || tech[0]}
                </Avatar>
              </Tooltip>
            ))}
          </Box>
        )}

          {/* Buttons Container (Right Side) */}
          <Box display="flex" gap={1}>
            {project.video && (
              <Button
                variant="contained"
                color="primary"
                size="small" // Optional: make buttons smaller to match chip size
                startIcon={<MdPlayCircleOutline size={16} />}
                onClick={() => window.dispatchEvent(new CustomEvent('openLinkBrowser', { detail: project.video }))}
              >
                Watch
              </Button>
            )}
            {project.link && (
              <Button
                variant="contained"
                color="success"
                size="small" // Optional: make buttons smaller to match chip size
                startIcon={<MdOpenInNew size={14} />}
                onClick={() => window.dispatchEvent(new CustomEvent('openLinkBrowser', { detail: project.link }))}
              >
                Visit
              </Button>
            )}
          </Box>
        </Box>

      </CardContent>
    </Card>
  );
}

// Displays 3 cards horizontal of featured projects
export function FeaturedProjects() {
  const featuredProjects = projectsData.filter(p => p.featured);

  return (
    <Box sx={{ width: '100%', height: '70%', mt: 2, mx: 'auto' }}>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={3}
        style={{ padding: '20px' }}
      >
        {featuredProjects.map((project, idx) => (
          <SwiperSlide key={idx}>
            <ProjectCard project={project} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}