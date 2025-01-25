import { Box, Paper, Typography, Fade, alpha } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function Body({ response, responseEndRef }) {
  return (
    <Box 
      className="flex-1 py-4 px-4 md:px-8 overflow-hidden"
      sx={{ 
        width: '100%',
        background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.08) 0%, rgba(0,0,0,0) 100%)',
        height: 'calc(100vh - 160px)',
      }}
    >
      <Box className="w-full h-full max-w-[1200px] mx-auto">
        <Paper
          elevation={24}
          className="h-full overflow-y-auto rounded-2xl w-full"
          sx={{
            backgroundColor: alpha('#1e1b4b', 0.4),
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(99, 102, 241, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            padding: '24px',
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 200px)',
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
              border: `3px solid ${alpha('#1e1b4b', 0.4)}`,
              '&:hover': {
                background: alpha('#818cf8', 0.4),
              },
            },
          }}
        >
          <Box className="p-4 md:p-6">
            {response ? (
              <Fade in timeout={800}>
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                            customStyle={{
                              margin: '1.5em 0',
                              borderRadius: '8px',
                              background: alpha('#1e1b4b', 0.6),
                            }}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code
                            className={className}
                            style={{
                              backgroundColor: alpha('#1e1b4b', 0.6),
                              padding: '0.2em 0.4em',
                              borderRadius: '4px',
                              color: '#818cf8',
                            }}
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                    }}
                    className="text-base md:text-lg leading-relaxed"
                    remarkPlugins={[]}
                  >
                    {response}
                  </ReactMarkdown>
                </div>
              </Fade>
            ) : (
              <Box className="h-full flex items-center justify-center min-h-[400px]">
                <Typography 
                  className="text-center"
                  sx={{ 
                    color: alpha('#818cf8', 0.6),
                    fontSize: '1.25rem',
                    fontWeight: 300,
                    letterSpacing: '0.02em',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  Ask me anything...
                </Typography>
              </Box>
            )}
            <div ref={responseEndRef} />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Body; 