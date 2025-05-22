import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Tooltip,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";

import { technologyIcons } from "../utils/technologyIcons";
import { MdPlayCircleOutline, MdOpenInNew } from "react-icons/md";
import { FaTrophy, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { GrFormNextLink } from "react-icons/gr";

import projectsData from "../data/projects.json";
import { Margin } from "@mui/icons-material";

export default function ProjectCard({ project }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const hasImages = Array.isArray(project.images) && project.images.length > 0;

  return (
    <Card
      sx={{
        backdropFilter: "blur(24px)",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "none",
        width: "100%",
        maxWidth: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(100, 100, 100, 0.1)",
        transition: "all 0.3s ease",
        position: "relative",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderColor: "rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {hasImages ? (
        <>
          <Box sx={{ position: "relative" }}>
            <Swiper
              modules={[Pagination]}
              pagination={false}
              slidesPerView={1}
              spaceBetween={10}
              allowTouchMove={false}
              style={{ width: "100%", height: "300px" }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              onClick={(swiper) => {
                swiper.slideTo(
                  (swiper.activeIndex + 1) % project.images.length
                );
              }}
            >
              {project.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <Box
                    component="img"
                    src={img}
                    alt={`Project Image ${idx}`}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      filter: "brightness(0.95)",
                      transition: "filter 0.3s ease",
                      cursor: "pointer",
                      "&:hover": {
                        filter: "brightness(1)",
                      },
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* ⬇️ Indicator placed within Swiper image */}
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                backdropFilter: "blur(15px)",
                backgroundColor: "rgba(40, 40, 40, 0.3)",
                color: "white",
                borderRadius: "12px",
                padding: "2px 8px",
                fontSize: "0.75rem",
                zIndex: 2,
              }}
            >
              {activeIndex + 1} / {project.images.length}
            </Box>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            height: 200,
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(0, 0, 0, 0.4)",
            fontStyle: "italic",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          No Image Available
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h6"
            fontWeight="bold"
            color="rgba(0, 0, 0, 0.87)"
          >
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
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: "4.5em",
            lineHeight: "1.5em",
            whiteSpace: "normal",
          }}
        >
          {project.description}
        </Typography>

        {project.Achievement ? (
          <Chip
            icon={<FaTrophy size={14} />}
            label={project.Achievement}
            size="medium"
            sx={{
              backgroundColor: "#d1a332",
              color: "rgba(255, 255, 255, 0.9)",
              fontWeight: "bold",
              mt: 1,
              border: "1px solid rgba(0, 0, 0, 0.1)",
              "& .MuiChip-icon": {
                color: "inherit",
                ml: 1,
                mr: -0.5,
              },
            }}
          />
        ) : (
          <Box />
        )}

        <Box
          mt={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={1}
        >
          {project.technologies?.length > 0 && (
            <Box display="flex" gap={1} flexWrap="wrap">
              {project.technologies.map((tech, idx) => (
                <Tooltip key={idx} title={tech} arrow>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: "rgba(0, 0, 0, 0.05)",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      color: "rgba(0, 0, 0, 0.8)",
                      "& svg": {
                        width: "70%",
                        height: "70%",
                      },
                    }}
                  >
                    {technologyIcons[tech] || tech[0]}
                  </Avatar>
                </Tooltip>
              ))}
            </Box>
          )}

          <Box display="flex" gap={1}>
            {project.video && (
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<MdPlayCircleOutline size={16} />}
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("openLinkBrowser", {
                      detail: project.video,
                    })
                  )
                }
              >
                Watch
              </Button>
            )}
            {project.link && (
              <Button
                variant="contained"
                color="success"
                size="small"
                startIcon={<MdOpenInNew size={14} />}
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("openLinkBrowser", { detail: project.link })
                  )
                }
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

// Card to display project in Featured panel
export function FeaturedCard({ project }) {
  const hasImages = Array.isArray(project.images) && project.images.length > 0;
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <Card
      sx={{
        mx: 2,
        my: 2,
        borderRadius: 4,
        overflow: "hidden",
        backdropFilter: "blur(24px)",
        backgroundColor: "rgba(255,255,255,0.6)",
        boxShadow: "none",
        border: "1px solid rgba(100, 100, 100, 0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        {/* Achievement Chip */}
        {project.Achievement && (
          <Chip
            icon={<FaTrophy size={14} color="white" />}
            label={project.Achievement}
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              backgroundColor: "#d1a332",
              color: "white",
              fontWeight: "bold",
              zIndex: 2,
            }}
          />
        )}

        {/* Image Swiper */}
        {hasImages ? (
          <Box
            sx={{ userSelect: "none" }}
            onDoubleClick={(e) => e.preventDefault()}
          >
            <Swiper
              modules={[Pagination]}
              pagination={false}
              slidesPerView={1}
              spaceBetween={10}
              allowTouchMove={false}
              style={{ width: "100%", height: "100%" }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              onClick={(swiper) => {
                swiper.slideTo(
                  (swiper.activeIndex + 1) % project.images.length
                );
              }}
            >
              {project.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <Box
                    component="img"
                    src={img}
                    alt={`Image ${idx}`}
                    sx={{
                      width: "100%",
                      height: "240px",
                      objectFit: "cover",
                      objectPosition: "center",
                      filter: "brightness(0.95)",
                      transition: "filter 0.3s ease",
                      cursor: "pointer",
                      "&:hover": { filter: "brightness(1)" },
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Image Index Indicator */}
            <Box
              sx={{
                position: "absolute",
                bottom: 12,
                right: 6,
                backdropFilter: 'blur(15px)',
                backgroundColor: 'rgba(40, 40, 40, 0.3)',
                color: "white",
                borderRadius: "12px",
                padding: "2px 8px",
                fontSize: "0.75rem",
                zIndex: 2,
              }}
            >
              {activeIndex + 1} / {project.images.length}
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              height: 240,
              backgroundColor: "rgba(0,0,0,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(0,0,0,0.4)",
              fontStyle: "italic",
            }}
          >
            No Image Available
          </Box>
        )}
      </Box>

      <CardContent sx={{ p: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={0.5}
        >
          <Typography variant="subtitle1" fontWeight="600" noWrap>
            {project.name}
          </Typography>

          {project.link && (
            <Tooltip title="Visit project" arrow>
              <Button
                size="small"
                sx={{ minWidth: 0, p: 1 }}
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("openLinkBrowser", { detail: project.link })
                  )
                }
              >
                <MdOpenInNew size={18} />
              </Button>
            </Tooltip>
          )}
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "clip",
            whiteSpace: "normal",
            fontSize: "0.7rem",
          }}
        >
          {project.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

// Displays 3 cards horizontal of featured projects
export function FeaturedProjects() {
  const swiperRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSlide = (direction) => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper || isAnimating) return;

    // Use Math.floor to ensure safe slide index progression
    const perView = Math.floor(swiper.params.slidesPerView);
    const total = swiper.slides.length;
    const maxIndex = total - perView;

    let nextIndex =
      direction === "next"
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
    swiper.on("transitionEnd", reset);
    return () => swiper.off("transitionEnd", reset);
  }, []);

  const featuredProjects = projectsData.filter((p) => p.featured);

  return (
    <Box sx={{ width: "100%", mt: 4, mb: -1, mx: "auto" }}>
      {/* View All Projects Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "flex-start", md: "flex-end" },
          alignItems: "center",
          mt: { xs: 0, md: -9 },
          mb: 2,
          px: 2,
        }}
      >
        <Tooltip title="View all projects" arrow>
          <Button
            component={Link}
            to="/projects"
            size="small"
            sx={{
              p: "6px 12px",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              gap: 1,
              textTransform: "none",
              "&:hover": {
                color: "#7ab2e9",
                backgroundColor: "rgb(255,255,255,0.3)",
              },
            }}
          >
            View All Projects
            <GrFormNextLink size={16} />
          </Button>
        </Tooltip>
      </Box>

      {/* Swiper Carousel with Overlaid Buttons */}
      <Box
        sx={{ position: "relative", mx: { xs: -2, sm: 0 }, }}
      >
        <Swiper
          ref={swiperRef}
          spaceBetween={-20}
          slidesPerView={3.1}
          allowTouchMove={true}
          breakpoints={{
            0: {
              slidesPerView: 1.05,
              allowTouchMove: true,
            },
            768: {
              slidesPerView: 3.1,
              allowTouchMove: false,
            },
          }}
        >
          {featuredProjects.map((project, idx) => (
            <SwiperSlide key={idx}>
                <FeaturedCard project={project} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev / Next Buttons - overlay only on md+ */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            mt: 2,
            position: { md: "absolute" },
            top: { md: "40%" },
            left: -90,
            right: -90,
            transform: { md: "translateY(-50%)" },
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <IconButton
            onClick={() => handleSlide("prev")}
            sx={{
              pointerEvents: isAnimating ? "none" : "auto",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(6px)",
              backgroundColor: "rgba(180, 220, 255, 0.12)",
              color: "#7ab2e9",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              width: 50,
              height: 50,
              ml: { md: 1 },
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(180, 220, 255, 0.2)",
                border: "1px solid rgba(122, 178, 233, 0.35)",
              },
            }}
          >
            <FaAngleLeft />
          </IconButton>

          <IconButton
            onClick={() => handleSlide("next")}
            sx={{
              pointerEvents: isAnimating ? "none" : "auto",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(6px)",
              backgroundColor: "rgba(180, 220, 255, 0.12)",
              color: "#7ab2e9",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              width: 50,
              height: 50,
              mr: { md: 1 },
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(180, 220, 255, 0.2)",
                border: "1px solid rgba(122, 178, 233, 0.35)",
              },
            }}
          >
            <FaAngleRight />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}