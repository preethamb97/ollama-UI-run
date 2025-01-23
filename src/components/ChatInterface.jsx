import { useState, useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

function ChatInterface() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('deepseek-coder');
  const [endpoint, setEndpoint] = useState('localhost');
  const [port, setPort] = useState('11434');
  const [customModel, setCustomModel] = useState('');
  const responseEndRef = useRef(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Add available models
  const availableModels = [
    'deepseek-coder',
    'llama2',
    'mistral',
    'codellama',
    'neural-chat',
    'deepseek-r1:1.5b',
    'deepseek-r1:7b',
    'deepseek-r1:8b',
    'deepseek-r1:14b',
    'llama3.2',
    'llama3.2:1b',
    'phi4',
    'custom'
  ];


  const scrollToBottom = () => {
    responseEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [response]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const modelToUse = selectedModel === 'custom' ? customModel : selectedModel;
      // Use window.location.hostname to get the current host
      const apiHost = endpoint || 'localhost';
      
      const response = await fetch(`http://${apiHost}:${port}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        mode: 'cors',
        body: JSON.stringify({
          model: modelToUse, // Use the correct model name
          prompt: prompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.trim()) {
            const json = JSON.parse(line);
            fullResponse += json.response;
            setResponse(fullResponse);
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse(`Error: ${error.message || 'Failed to connect to Ollama server'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="fixed inset-0 flex flex-col">
      <Header />
      <Body response={response} responseEndRef={responseEndRef} />
      <Footer 
        prompt={prompt}
        setPrompt={setPrompt}
        loading={loading}
        handleSubmit={handleSubmit}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        availableModels={availableModels}
        endpoint={endpoint}
        setEndpoint={setEndpoint}
        port={port}
        setPort={setPort}
        customModel={customModel}
        setCustomModel={setCustomModel}
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
      />
    </Box>
  );
}

export default ChatInterface; 