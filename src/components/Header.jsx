import { Box, Typography } from '@mui/material';

function Header() {
  return (
    <Box 
      className="w-full py-8"
      sx={{
        borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
        background: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Typography 
        variant="h3" 
        className="text-center font-bold"
        sx={{ 
          fontFamily: '"Inter", system-ui',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #c7d2fe 0%, #6366f1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 20px rgba(99, 102, 241, 0.5)',
        }}
      >
        Ollama UI
      </Typography>
    </Box>
  );
}

export default Header; 