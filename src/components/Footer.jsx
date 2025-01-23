import { Box, TextField, Button, CircularProgress, alpha, Select, MenuItem, FormControl, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';

function Footer({ 
  prompt, 
  setPrompt, 
  loading, 
  handleSubmit, 
  selectedModel, 
  setSelectedModel, 
  availableModels,
  endpoint,
  setEndpoint,
  port,
  setPort,
  customModel,
  setCustomModel,
  settingsOpen,
  setSettingsOpen
}) {
  return (
    <Box 
      className="fixed bottom-0 left-0 right-0 flex items-center justify-center py-4 px-4 md:px-8"
      sx={{
        background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0) 100%)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(99, 102, 241, 0.1)',
        zIndex: 1000,
      }}
    >
      <Box sx={{ width: '60%', minWidth: '300px', maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%', position: 'relative' }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            variant="outlined"
            placeholder="Type your message here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: alpha('#1e1b4b', 0.4),
                borderRadius: '20px',
                pr: { xs: '100px', sm: '120px' },
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(99, 102, 241, 0.1)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
                '&:hover': {
                  backgroundColor: alpha('#1e1b4b', 0.5),
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                },
                '&.Mui-focused': {
                  backgroundColor: alpha('#1e1b4b', 0.6),
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  boxShadow: '0 4px 30px rgba(99, 102, 241, 0.2)',
                },
                '& fieldset': {
                  borderColor: 'transparent',
                },
              },
              '& .MuiOutlinedInput-input': {
                padding: '16px 24px',
                fontSize: '1rem',
                color: '#e2e8f0',
                textAlign: 'left',
                '&::placeholder': {
                  color: alpha('#818cf8', 0.5),
                  opacity: 1,
                },
              },
            }}
          />
          <Box sx={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => setSettingsOpen(true)}
              disabled={loading}
              sx={{
                color: '#818cf8',
                '&:hover': {
                  backgroundColor: alpha('#1e1b4b', 0.6),
                }
              }}
            >
              <SettingsIcon />
            </IconButton>
            <Button
              type="submit"
              disabled={loading}
              sx={{
                minWidth: '40px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: alpha('#818cf8', 0.2),
                color: '#818cf8',
                '&:hover': {
                  backgroundColor: alpha('#818cf8', 0.3),
                },
              }}
            >
              {loading ? <CircularProgress size={24} /> : <SendIcon />}
            </Button>
          </Box>
        </form>
      </Box>

      <Dialog 
        open={settingsOpen} 
        onClose={() => setSettingsOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: alpha('#1e1b4b', 0.95),
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(99, 102, 241, 0.1)',
            borderRadius: '16px',
            color: '#e2e8f0',
          }
        }}
      >
        <DialogTitle sx={{ color: '#818cf8' }}>Settings</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Endpoint"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              fullWidth
              sx={{ 
                input: { color: '#e2e8f0' },
                label: { color: alpha('#818cf8', 0.7) },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: alpha('#818cf8', 0.2) },
                  '&:hover fieldset': { borderColor: alpha('#818cf8', 0.3) },
                  '&.Mui-focused fieldset': { borderColor: '#818cf8' },
                }
              }}
            />
            <TextField
              label="Port"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              fullWidth
              sx={{ 
                input: { color: '#e2e8f0' },
                label: { color: alpha('#818cf8', 0.7) },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: alpha('#818cf8', 0.2) },
                  '&:hover fieldset': { borderColor: alpha('#818cf8', 0.3) },
                  '&.Mui-focused fieldset': { borderColor: '#818cf8' },
                }
              }}
            />
            <FormControl fullWidth>
              <Select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                sx={{ 
                  color: '#e2e8f0',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: alpha('#818cf8', 0.2) },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: alpha('#818cf8', 0.3) },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#818cf8' },
                  '& .MuiSelect-icon': { color: '#818cf8' }
                }}
              >
                {availableModels.map((model) => (
                  <MenuItem key={model} value={model}>
                    {model}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedModel === 'custom' && (
              <TextField
                label="Custom Model"
                value={customModel}
                onChange={(e) => setCustomModel(e.target.value)}
                fullWidth
                sx={{ 
                  input: { color: '#e2e8f0' },
                  label: { color: alpha('#818cf8', 0.7) },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: alpha('#818cf8', 0.2) },
                    '&:hover fieldset': { borderColor: alpha('#818cf8', 0.3) },
                    '&.Mui-focused fieldset': { borderColor: '#818cf8' },
                  }
                }}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSettingsOpen(false)} sx={{ color: '#818cf8' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Footer; 