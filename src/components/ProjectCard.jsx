import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Tooltip,
  Button
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

// React Icons
import { FaUnity } from "react-icons/fa6";
import { SiUnrealengine } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { BsBadgeVrFill } from "react-icons/bs";
import { SiSocketdotio } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { SiNextdotjs } from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { SiHtml5 } from "react-icons/si";
import { SiCss3 } from "react-icons/si";
import { SiFlutter } from "react-icons/si";
import { SiSwift } from "react-icons/si";
import { SiGooglecloud } from "react-icons/si";
import { SiGooglemaps } from "react-icons/si";
import { SiAdobeaftereffects } from "react-icons/si";
import { SiDocker } from "react-icons/si";
import { SiBlender } from "react-icons/si";
import { MdPlayCircleOutline, MdOpenInNew } from 'react-icons/md';

const technologyIcons = {
  'Unity': <FaUnity />,
  'Unreal': <SiUnrealengine />,
  'Blender': <SiBlender />,
  'After Effects': <SiAdobeaftereffects />,
  'React': <FaReact />,
  'Node.js': <FaNodeJs />,
  'Next.js': <SiNextdotjs />,
  'JavaScript': <SiJavascript />,
  'HTML': <SiHtml5 />,
  'CSS': <SiCss3 />,
  'Socket.IO': <SiSocketdotio />,
  'C#': <TbBrandCSharp />,
  'Java': <FaJava />,
  'Swift': <SiSwift />,
  'Flutter': <SiFlutter />,
  'VR': <BsBadgeVrFill />,
  'MongoDB': <SiMongodb />,
  'Google Cloud': <SiGooglecloud />,
  'Google Maps': <SiGooglemaps />,
  'Docker': <SiDocker />,
};

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
        border: '1px solid rgba(0, 0, 0, 0.1)',
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

        {project.technologies && project.technologies.length > 0 && (
          <Box display="flex" gap={1} mt={2} flexWrap="wrap">
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

        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          {project.video && (
            <Button
              variant="contained"
              color="primary"
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
              startIcon={<MdOpenInNew size={14} />}
              onClick={() => window.dispatchEvent(new CustomEvent('openLinkBrowser', { detail: project.link }))}
            >
              Visit
            </Button>
          )}
        </Box>

      </CardContent>
    </Card>
  );
}