import ChatInterface from './components/ChatInterface'

function App() {
  return (
    <div 
      className="min-h-screen w-screen overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #312e81 100%)',
      }}
    >
      <ChatInterface />
    </div>
  );
}

export default App;