import { useState, useRef, useEffect } from 'react';
import { Box, Button, List, ListItem, ListItemText, Dialog } from '@mui/material';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import ModelManager from './ModelManager';

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
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [showModelManager, setShowModelManager] = useState(false);

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

  const addToConversation = (userPrompt, botResponse) => {
    const timestamp = new Date().toISOString();
    const messageId = Math.random().toString(36).substr(2, 9);
    
    const newMessage = {
      id: messageId,
      timestamp,
      userPrompt,
      botResponse,
    };

    setConversations(prev => {
      if (currentConversationId) {
        return prev.map(conv => 
          conv.id === currentConversationId 
            ? { ...conv, messages: [...conv.messages, newMessage] }
            : conv
        );
      } else {
        const newConversationId = Math.random().toString(36).substr(2, 9);
        setCurrentConversationId(newConversationId);
        return [...prev, {
          id: newConversationId,
          title: userPrompt.slice(0, 30) + '...',
          messages: [newMessage]
        }];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userPrompt = prompt;
    setPrompt('');
    setLoading(true);
    
    try {
      const modelToUse = selectedModel === 'custom' ? customModel : selectedModel;
      const apiHost = endpoint || 'localhost';
      const apiUrl = `http://${apiHost}:${port}/api/generate`  // Direct connection for GitHub Pages
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: modelToUse,
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

      addToConversation(userPrompt, fullResponse);
    } catch (error) {
      console.error('Error:', error);
      setResponse(`Error: ${error.message || 'Failed to connect to Ollama server'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRevision = async (messageId, revision) => {
    const conversation = conversations.find(conv => 
      conv.id === currentConversationId
    );
    const message = conversation.messages.find(msg => msg.id === messageId);
    
    setPrompt(`Revise this response: ${message.botResponse}\n\nRevision request: ${revision}`);
  };

  const handleQuestionRevision = async (messageId, newQuestion) => {
    setPrompt(newQuestion);
    handleSubmit(new Event('submit'));
    
    // Update the conversation history
    setConversations(prev => 
      prev.map(conv => {
        if (conv.id === currentConversationId) {
          const updatedMessages = conv.messages.map(msg => 
            msg.id === messageId 
              ? { ...msg, userPrompt: newQuestion }
              : msg
          );
          return { ...conv, messages: updatedMessages };
        }
        return conv;
      })
    );
  };

  return (
    <Box className="fixed inset-0 flex">
      <Box className="flex-1 flex flex-col">
        <Header />
        <Body 
          conversations={conversations}
          currentConversationId={currentConversationId}
          onRequestRevision={handleRevision}
          onQuestionRevision={handleQuestionRevision}
        />
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
    </Box>
  );
}

export default ChatInterface; 