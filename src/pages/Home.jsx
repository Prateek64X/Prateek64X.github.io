// src/pages/Home.jsx
import { Box } from "@mui/material";
import { FaHome } from "react-icons/fa";

export default function Home() {
  return (
    <Box
      sx={{
        backdropFilter: 'blur(8px)',
        height: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: 'rgb(220,220,220,0.7)',
        mx: 2,
        my: 2,
      }}
    >
      <FaHome color="#7ab2e9" size={64} />
    </Box>
  );
}
