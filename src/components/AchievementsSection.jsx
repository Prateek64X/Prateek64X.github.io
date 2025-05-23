import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, IconButton, useTheme, useMediaQuery, Container, } from '@mui/material';
import experienceData from '../data/experience.json';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const AchievementCard = ({ award }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Trophy Image with place */}
      <Box sx={{ position: 'relative', width: 200, height: 200 }}>
        <Box
          component="img"
          src="/icons/trophy_512.webp"
          alt="Trophy"
          sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Constantia, Georgia, serif',
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'rgba(255, 234, 148, 0.8)',
            fontWeight: 'bold',
            textShadow: '1px 1px 6px rgba(0,0,0,0.2)',
            fontSize: '2.5rem',
          }}
        >
          {award.place}
        </Typography>
      </Box>

      <Typography
        variant="body2"
        sx={{
          mt: 0,
          fontSize: '1rem',
          color: 'rgba(255, 225, 143, 0.9)',
          fontWeight: 700,
          textAlign: 'center',
          letterSpacing: 0.3,
        }}
      >
        {award.organization}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          fontSize: '0.9rem',
          color: 'rgba(255, 225, 143, 0.8)',
          fontWeight: 600,
          mt: -0.5,
          textAlign: 'center',
        }}
      >
        {award.competition}
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          mt: 1.4,
          fontSize: '0.75rem',
          lineHeight: '0.8rem',
          fontStyle: 'italic',
          color: 'rgba(255, 240, 211, 0.7)',
          fontWeight: 700,
          textAlign: 'center',
          maxWidth: '100%',
          minHeight: '1.7rem',
        }}
      >
        {award.title}
      </Typography>

      <Typography
        variant="caption"
        sx={{
          mt: -1.8,
          fontSize: '0.7rem',
          color: 'rgba(255, 252, 244, 0.7)',
          fontWeight: 500,
          textAlign: 'center',
        }}
      >
        {award.date}
      </Typography>
    </Box>
  );
};

const AchievementsSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const swiperRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleSlide = (direction) => {
      const swiper = swiperRef.current?.swiper;
      if (!swiper || isAnimating) return;

      const perView = Math.floor(swiper.params.slidesPerView);
      const total = swiper.slides.length;
      const maxIndex = total - perView;

      let nextIndex =
        direction === 'next'
          ? swiper.activeIndex + perView
          : swiper.activeIndex - perView;

      nextIndex = Math.max(0, Math.min(nextIndex, maxIndex));
      if (nextIndex === swiper.activeIndex) return;

      setIsAnimating(true);
      swiper.slideTo(nextIndex);
    };

    useEffect(() => {
      const swiper = swiperRef.current?.swiper;
      if (!swiper) return;
      const reset = () => setIsAnimating(false);
      swiper.on('transitionEnd', reset);
      return () => swiper.off('transitionEnd', reset);
    }, []);

  return (
    <Box
      sx={{
        width: '100wh',
        position: 'relative',
        overflow: 'hidden',
        pb: 6,
        pt: 4,
        background: 'transparent', 
        marginLeft: -2,
        marginRight: -2
      }}
    >
      {/* Trophy Cards Area */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          px: { xs: 0, sm: 4 },
        }}
      >
        {isMobile ? (
          <Box sx={{ position: 'relative' }}>
            {/* Swiper Mobile */}
            <Swiper
              ref={swiperRef}
              spaceBetween={4}
              slidesPerView={1.1}
              style={{
                paddingBottom: '32px',
                paddingLeft: '16px',
                paddingRight: '16px',
              }}
            >
              {experienceData.awards.map((award, index) => (
                <SwiperSlide key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      pt: 2,
                    }}
                  >
                    <AchievementCard award={award} />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Prev / Next Buttons */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 2,
                position: 'absolute',
                top: '30%',
                left: 0,
                right: 0,
                zIndex: 3,
                pointerEvents: 'none',
              }}
            >
              <IconButton
                onClick={() => handleSlide('prev')}
                sx={{
                  pointerEvents: isAnimating ? 'none' : 'auto',
                  backgroundColor: 'rgba(247, 218, 146, 0.3)',
                  color: 'rgb(235, 201, 116)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  width: 50,
                  height: 50,
                  transition: '0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(247, 218, 146, 0.5)',
                    border: "1px solid rgba(235, 190, 78, 0.45)",
                  },
                }}
              >
                <FaAngleLeft />
              </IconButton>

              <IconButton
                onClick={() => handleSlide('next')}
                sx={{
                  pointerEvents: isAnimating ? 'none' : 'auto',
                  backgroundColor: 'rgba(247, 218, 146, 0.3)',
                  color: 'rgb(235, 201, 116)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  width: 50,
                  height: 50,
                  transition: '0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(247, 218, 146, 0.5)',
                    border: "1px solid rgba(235, 190, 78, 0.45)",
                  },
                }}
              >
                <FaAngleRight />
              </IconButton>
            </Box>
          </Box>
        ) : (
          // Desktop view (unchanged)
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                flexWrap: 'nowrap',
                gap: 6,
                overflowX: 'auto',
                px: 2,
              }}
            >
              {experienceData.awards.map((award, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <AchievementCard award={award} />
                </Box>
              ))}
            </Box>
          </Container>
        )}
      </Box>

      {/* Wooden Base */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 52, sm: 22 },
          zIndex: 1,
          height: '145px',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src="/icons/wooden_base.webp"
          alt="Wooden Base"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            boxShadow: '0px -50px 0px rgba(0, 0, 0, 1)', 
            borderRadius: '4px'
          }}
        />
      </Box>
    </Box>
  );
};

export default AchievementsSection;
