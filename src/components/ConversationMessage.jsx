import { Box, Typography, IconButton, Paper, TextField, Button, Avatar } from '@mui/material';
import { Edit as EditIcon, Redo as RedoIcon } from '@mui/icons-material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function ConversationMessage({ message, onRequestRevision, onQuestionRevision }) {
  const [showRevisionInput, setShowRevisionInput] = useState(false);
  const [showQuestionRevisionInput, setShowQuestionRevisionInput] = useState(false);
  const [revisionRequest, setRevisionRequest] = useState('');
  const [questionRevision, setQuestionRevision] = useState(message.userPrompt);

  const handleRevisionSubmit = () => {
    onRequestRevision(message.id, revisionRequest);
    setShowRevisionInput(false);
    setRevisionRequest('');
  };

  const handleQuestionRevisionSubmit = () => {
    onQuestionRevision(message.id, questionRevision);
    setShowQuestionRevisionInput(false);
  };

  return (
    <Box sx={{ mb: 4 }}>
      {/* User Message */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
        <Avatar 
          sx={{ 
            bgcolor: 'rgba(99, 102, 241, 0.2)',
            color: '#818cf8',
          }}
        >
          <PersonIcon />
        </Avatar>
        <Box sx={{ width: '90%' }}>
          {showQuestionRevisionInput ? (
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={2}
                value={questionRevision}
                onChange={(e) => setQuestionRevision(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#e2e8f0',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderRadius: '12px',
                  }
                }}
              />
              <Button
                startIcon={<RedoIcon />}
                onClick={handleQuestionRevisionSubmit}
                sx={{ color: '#818cf8', mt: 1 }}
              >
                Update Question
              </Button>
            </Box>
          ) : (
            <Paper
              sx={{
                p: 2,
                width: '100%',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderRadius: '12px 12px 12px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Typography sx={{ color: '#e2e8f0', flex: 1 }}>
                {message.userPrompt}
              </Typography>
              <IconButton
                onClick={() => setShowQuestionRevisionInput(true)}
                sx={{ color: '#818cf8', ml: 1, padding: '4px' }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Paper>
          )}
        </Box>
      </Box>

      {/* Bot Response */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, justifyContent: 'flex-end' }}>
        <Paper
          sx={{
            p: 2,
            width: '90%',
            backgroundColor: 'rgba(30, 27, 75, 0.4)',
            borderRadius: '12px 12px 0 12px',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ width: '95%' }}>
              <ReactMarkdown className="prose prose-invert">
                {message.botResponse}
              </ReactMarkdown>
            </Box>
            <IconButton
              onClick={() => setShowRevisionInput(!showRevisionInput)}
              sx={{ color: '#818cf8', ml: 1, flexShrink: 0 }}
            >
              <EditIcon />
            </IconButton>
          </Box>

          {showRevisionInput && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={2}
                value={revisionRequest}
                onChange={(e) => setRevisionRequest(e.target.value)}
                placeholder="What would you like to revise?"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#e2e8f0',
                    backgroundColor: 'rgba(30, 27, 75, 0.6)',
                  }
                }}
              />
              <Button
                startIcon={<RedoIcon />}
                onClick={handleRevisionSubmit}
                sx={{ color: '#818cf8', mt: 1 }}
              >
                Request Revision
              </Button>
            </Box>
          )}
        </Paper>
        <Avatar 
          sx={{ 
            bgcolor: 'rgba(99, 102, 241, 0.2)',
            color: '#818cf8',
          }}
        >
          <SmartToyIcon />
        </Avatar>
      </Box>
    </Box>
  );
}

export default ConversationMessage; 