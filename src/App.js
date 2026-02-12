import React, { useState } from 'react';
import IdeaGenerator from './components/IdeaGenerator/IdeaGenerator';
import MarketInsights from './components/MarketInsights/MarketInsights';
import IdeaComparison from './components/IdeaComparison/IdeaComparison';
import ExportPanel from './components/ExportPanel/ExportPanel';

function App() {
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const handleIdeasGenerated = (newIdeas) => {
    setIdeas([...ideas, ...newIdeas]);
    if (!selectedIdea && newIdeas.length > 0) {
      setSelectedIdea(newIdeas[0]);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  // Simple inline styles since Tailwind might not work
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      backgroundColor: '#1e40af',
      color: 'white',
      padding: '20px 40px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    main: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '30px 20px'
    },
    content: {
      display: 'flex',
      gap: '30px',
      flexWrap: 'wrap'
    },
    leftColumn: {
      flex: '2',
      minWidth: '300px'
    },
    rightColumn: {
      flex: '1',
      minWidth: '300px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '25px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      marginBottom: '25px'
    },
    getStarted: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '25px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
    },
    statsCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
    },
    statItem: {
      textAlign: 'center',
      padding: '15px',
      borderRadius: '10px',
      marginBottom: '10px'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '28px', margin: 0 }}>
            AI Ideation & Market Intelligence Platform
          </h1>
          <p style={{ margin: '10px 0 0 0', opacity: 0.9 }}>
            Generate innovative project ideas with comprehensive market analysis
          </p>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.content}>
          {/* Left Column - Generator & Comparison */}
          <div style={styles.leftColumn}>
            {/* Idea Generator Card */}
            <div style={styles.card}>
              <h2 style={{ marginTop: 0, color: '#1e40af' }}>🚀 Idea Generator</h2>
              <IdeaGenerator onIdeasGenerated={handleIdeasGenerated} />
            </div>
            
            {/* Idea Comparison */}
            {ideas.length > 0 && (
              <div style={styles.card}>
                <h2 style={{ marginTop: 0, color: '#1e40af' }}>📋 Idea Comparison</h2>
                <IdeaComparison 
                  ideas={ideas}
                  favorites={favorites}
                  onSelectIdea={setSelectedIdea}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            )}
            
            {/* Export Panel */}
            {selectedIdea && (
              <div style={styles.card}>
                <ExportPanel idea={selectedIdea} />
              </div>
            )}
          </div>

          {/* Right Column - Insights */}
          <div style={styles.rightColumn}>
            {selectedIdea ? (
              <div style={styles.card}>
                <MarketInsights idea={selectedIdea} />
              </div>
            ) : (
              <div style={styles.getStarted}>
                <h2 style={{ marginTop: 0, color: '#1e40af' }}>💡 Get Started</h2>
                <p>Fill out the idea generation form to create innovative project concepts with detailed market analysis.</p>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>Generate 3-5 ideas at once</li>
                  <li>Get competitor analysis</li>
                  <li>View market growth potential</li>
                  <li>Export to CSV</li>
                  <li>Save favorite ideas</li>
                </ul>
              </div>
            )}
            
            {/* Stats Panel */}
            <div style={styles.statsCard}>
              <h3 style={{ marginTop: 0 }}>Your Ideation Stats</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ ...styles.statItem, backgroundColor: '#dbeafe' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e40af' }}>
                    {ideas.length}
                  </div>
                  <div style={{ fontSize: '14px', color: '#4b5563' }}>Ideas Generated</div>
                </div>
                <div style={{ ...styles.statItem, backgroundColor: '#d1fae5' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#065f46' }}>
                    {favorites.length}
                  </div>
                  <div style={{ fontSize: '14px', color: '#4b5563' }}>Favorites</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;