// src/pages/Projects.jsx
import { useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from '@mui/material';
import projects from '../data/projects.json';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const filteredProjects =
    filter === 'All' ? projects : projects.filter((p) => p.tags.includes(filter));

  const uniqueTags = Array.from(new Set(projects.flatMap((p) => p.tags || [])));

  return (
    <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" ml={4} mr={4} mb={4} flexWrap="wrap" gap={2}>
        <Typography variant="h4" fontWeight="bold">
          My Projects
        </Typography>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={filter}
            label="Category"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            {uniqueTags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2} sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {filteredProjects.map((project) => (
          <Grid item xs={12} sm={6} md={6} key={project.name} sx={{
            display: 'flex',
            minWidth: { sm: 'calc(50% - 32px)', md: 'calc(50% - 32px)' }, // Accounts for spacing
            maxWidth: { sm: 'calc(50% - 32px)', md: 'calc(50% - 32px)' },
          }}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
