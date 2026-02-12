import React, { useState, useRef } from 'react';
import IdeaGenerator from './components/IdeaGenerator/IdeaGenerator';
import MarketInsights from './components/MarketInsights/MarketInsights';
import IdeaComparison from './components/IdeaComparison/IdeaComparison';
import ExportPanel from './components/ExportPanel/ExportPanel';
import SearchBar from './components/SearchBar/SearchBar';
import { Idea } from './types';

function App() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [displayedIdeas, setDisplayedIdeas] = useState<Idea[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use a ref to track if we're already processing a generation
  const isGenerating = useRef(false);

  const handleIdeasGenerated = (newIdeas: Idea[]) => {
    // Prevent double calls
    if (isGenerating.current) {
      console.log('⚠️ Preventing duplicate generation call');
      return;
    }
    
    isGenerating.current = true;
    
    console.log('========== GENERATION CALLED ==========');
    console.log('New ideas count:', newIdeas.length);
    console.log('New ideas IDs:', newIdeas.map(idea => idea.id));
    console.log('Stack trace:', new Error().stack);
    
    // COMPLETELY REPLACE the ideas array
    setIdeas(newIdeas);
    setDisplayedIdeas(newIdeas);
    setSearchQuery('');
    
    // Select the first idea
    if (newIdeas.length > 0) {
      setSelectedIdea(newIdeas[0]);
    }
    
    // Reset the flag after a short delay
    setTimeout(() => {
      isGenerating.current = false;
    }, 100);
  };

  const handleSearchResults = (results: Idea[]) => {
    setDisplayedIdeas(results);
  };

  const handleClearSearch = () => {
    setDisplayedIdeas(ideas);
    setSearchQuery('');
  };

  const handleSelectIdea = (idea: Idea) => {
    setSelectedIdea(idea);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                AI Ideation & Market Intelligence Platform
              </h1>
              <p className="text-gray-600 mt-2">
                Generate innovative project ideas with comprehensive market analysis
              </p>
            </div>
            
            {ideas.length > 0 && (
              <div className="w-full md:w-96">
                <SearchBar 
                  allIdeas={ideas}
                  onSearchResults={handleSearchResults}
                  onClearSearch={handleClearSearch}
                  searchQuery={searchQuery}
                  onSearchQueryChange={setSearchQuery}
                />
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <IdeaGenerator onIdeasGenerated={handleIdeasGenerated} />
            
            {displayedIdeas.length > 0 ? (
              <>
                <IdeaComparison 
                  ideas={displayedIdeas}
                  favorites={favorites}
                  onSelectIdea={handleSelectIdea}
                  onToggleFavorite={toggleFavorite}
                  selectedIdeaId={selectedIdea?.id}
                />
                
                {selectedIdea && (
                  <ExportPanel idea={selectedIdea} />
                )}
              </>
            ) : ideas.length > 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <p className="text-gray-600">No ideas match your search</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">💡 Get Started</h2>
                <p className="text-gray-600">Fill out the form to generate ideas.</p>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <MarketInsights idea={selectedIdea} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;