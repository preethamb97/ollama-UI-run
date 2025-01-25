import { useState, useEffect } from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Typography,
  CircularProgress,
  Button,
  Dialog,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function ModelManager() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [installDialog, setInstallDialog] = useState(false);
  const [modelName, setModelName] = useState('');
  const [installProgress, setInstallProgress] = useState(null);

  const fetchModels = async () => {
    try {
      const response = await fetch('/api/tags');
      const data = await response.json();
      setModels(data.models);
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  const installModel = async () => {
    setInstallProgress(0);
    try {
      const response = await fetch('/api/pull', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: modelName })
      });

      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.trim()) {
            const json = JSON.parse(line);
            if (json.status === 'downloading') {
              setInstallProgress(json.completed);
            }
          }
        }
      }
      await fetchModels();
      setInstallDialog(false);
    } catch (error) {
      console.error('Error installing model:', error);
    }
  };

  const deleteModel = async (name) => {
    try {
      await fetch('/api/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      await fetchModels();
    } catch (error) {
      console.error('Error deleting model:', error);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#e2e8f0' }}>Installed Models</Typography>
        <Button 
          startIcon={<AddIcon />}
          onClick={() => setInstallDialog(true)}
          sx={{ color: '#818cf8' }}
        >
          Install Model
        </Button>
      </Box>

      <List>
        {models.map((model) => (
          <ListItem
            key={model.name}
            secondaryAction={
              <IconButton edge="end" onClick={() => deleteModel(model.name)}>
                <DeleteIcon sx={{ color: '#ef4444' }} />
              </IconButton>
            }
            sx={{
              backgroundColor: 'rgba(30, 27, 75, 0.4)',
              backdropFilter: 'blur(16px)',
              borderRadius: '8px',
              mb: 1
            }}
          >
            <ListItemText
              primary={model.name}
              secondary={`Size: ${model.size} | Status: ${model.status}`}
              sx={{ 
                '& .MuiListItemText-primary': { color: '#e2e8f0' },
                '& .MuiListItemText-secondary': { color: '#818cf8' }
              }}
            />
          </ListItem>
        ))}
      </List>

      <Dialog 
        open={installDialog} 
        onClose={() => setInstallDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(30, 27, 75, 0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(99, 102, 241, 0.1)',
            borderRadius: '16px',
            color: '#e2e8f0',
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#818cf8' }}>Install New Model</Typography>
          <TextField
            fullWidth
            label="Model Name"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            sx={{ mb: 2 }}
          />
          {installProgress !== null && (
            <Box sx={{ width: '100%', mb: 2 }}>
              <CircularProgress variant="determinate" value={installProgress} />
            </Box>
          )}
          <Button 
            onClick={installModel}
            disabled={!modelName}
            sx={{ color: '#818cf8' }}
          >
            Install
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}

export default ModelManager; 