import { Box, Paper, Typography, Fade, alpha } from '@mui/material';

function Body({ response, responseEndRef }) {
  // Function to process the response text and add proper indentation
  const formatResponse = (text) => {
    if (!text) return text;
    
    return text
      .split('\n')
      .map(line => {
        const trimmedLine = line.trim();
        
        // Handle code blocks with proper indentation
        if (trimmedLine.startsWith('```')) {
          return '\n' + trimmedLine + '\n';
        }
        
        // Handle code content inside code blocks
        if (line.startsWith('  ') && !trimmedLine.startsWith('*') && !trimmedLine.match(/^\d+\./)) {
          return line; // Preserve original indentation for code
        }
        
        // Handle numbered lists
        if (trimmedLine.match(/^\d+\./)) {
          return '    ' + trimmedLine;
        }
        
        // Handle bullet points
        if (trimmedLine.startsWith('*')) {
          return '    ' + trimmedLine;
        }
        
        // Handle normal sentences - split into new lines if too long
        if (trimmedLine.length > 80) {
          const words = trimmedLine.split(' ');
          let currentLine = '';
          let formattedLines = [];
          let indentLevel = Math.max(0, line.search(/\S/)); // Ensure non-negative
          let indent = ' '.repeat(indentLevel);
          
          words.forEach(word => {
            if ((currentLine + ' ' + word).length > 80) {
              formattedLines.push(indent + currentLine.trim());
              currentLine = word;
            } else {
              currentLine += (currentLine ? ' ' : '') + word;
            }
          });
          
          if (currentLine) {
            formattedLines.push(indent + currentLine.trim());
          }
          
          return formattedLines.join('\n');
        }
        
        // Preserve original indentation for other lines
        const indentLevel = Math.max(0, line.search(/\S/)); // Ensure non-negative
        return ' '.repeat(indentLevel) + trimmedLine;
      })
      .join('\n');
  };

  return (
    <Box 
      className="flex-1 py-4 px-4 md:px-8"
      sx={{ 
        width: '100%',
        background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.08) 0%, rgba(0,0,0,0) 100%)',
        height: 'calc(100vh - 160px)', // Adjust for header and footer
        overflow: 'hidden'
      }}
    >
      <Box
        className="w-full h-full max-w-[1200px] mx-auto"
      >
        <Paper
          elevation={24}
          className="h-full overflow-y-auto rounded-2xl w-full"
          sx={{
            backgroundColor: alpha('#1e1b4b', 0.4),
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(99, 102, 241, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            padding: '24px',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: alpha('#818cf8', 0.2),
              borderRadius: '20px',
            },
          }}
        >
          <Box className="p-4 md:p-6">
            {response ? (
              <Fade in timeout={800}>
                <Typography 
                  className="whitespace-pre-wrap text-base md:text-lg"
                  sx={{ 
                    fontFamily: '"Inter", system-ui',
                    lineHeight: 2,
                    color: '#e2e8f0',
                    letterSpacing: '0.02em',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    '& p': {
                      marginBottom: '1.5em',
                      paddingLeft: '1em'
                    },
                    '& strong': {
                      color: '#818cf8',
                      fontWeight: 600
                    },
                    '& ul, & ol': {
                      paddingLeft: '2.5em',
                      marginBottom: '1.5em'
                    },
                    '& li': {
                      marginBottom: '0.75em',
                      paddingLeft: '0.5em'
                    },
                    '& code': {
                      backgroundColor: alpha('#1e1b4b', 0.6),
                      padding: '0.2em 0.4em',
                      borderRadius: '4px',
                      fontSize: '0.9em',
                      color: '#818cf8',
                      display: 'inline-block',
                      marginTop: '0.2em',
                      marginBottom: '0.2em'
                    },
                    '& pre': {
                      margin: '1.5em 0',
                      padding: '1em',
                      backgroundColor: alpha('#1e1b4b', 0.6),
                      borderRadius: '8px',
                      overflow: 'auto'
                    }
                  }}
                >
                  {formatResponse(response)}
                </Typography>
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