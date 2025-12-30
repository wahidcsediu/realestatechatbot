
import React, { useState } from 'react';
import Layout from './components/Layout';
import Chat from './components/Chat';
import Trends from './components/Trends';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chat');

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <Chat />;
      case 'trends':
        return <Trends />;
      case 'calc':
        return <Calculator />;
      default:
        return <Chat />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="h-full overflow-hidden">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
