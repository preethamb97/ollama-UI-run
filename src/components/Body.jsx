import { Box, Paper, Typography, Fade, alpha } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ConversationMessage from './ConversationMessage';

function Body({ conversations, currentConversationId, onRequestRevision, onQuestionRevision }) {
  return (
    <Box 
      className="flex-1 py-4 px-4 md:px-8"
      sx={{ 
        width: '100%',
        background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.08) 0%, rgba(0,0,0,0) 100%)',
        height: 'calc(100vh - 160px)',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '12px',
          background: 'transparent',
        },
        '&::-webkit-scrollbar-track': {
          background: alpha('#1e1b4b', 0.2),
          borderRadius: '10px',
          margin: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: alpha('#818cf8', 0.3),
          borderRadius: '10px',
          border: `3px solid transparent`,
          backgroundClip: 'padding-box',
          '&:hover': {
            background: alpha('#818cf8', 0.4),
            backgroundClip: 'padding-box',
          },
        },
      }}
    >
      <Box className="w-full max-w-[1200px] mx-auto">
        {currentConversationId ? (
          conversations
            .find(conv => conv.id === currentConversationId)
            ?.messages.map(message => (
              <ConversationMessage
                key={message.id}
                message={message}
                onRequestRevision={onRequestRevision}
                onQuestionRevision={onQuestionRevision}
              />
            ))
        ) : (
          <Box className="h-full flex items-center justify-center min-h-[400px]">
            <Typography sx={{ color: alpha('#818cf8', 0.6) }}>
              Start a new conversation...
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Body; 