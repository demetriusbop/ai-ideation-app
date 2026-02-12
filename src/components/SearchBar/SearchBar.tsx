import React, { useState } from 'react';
import { Idea } from '../../types';
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchBarProps {
  allIdeas: Idea[];
  onSearchResults: (results: Idea[]) => void;
  onClearSearch: () => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  allIdeas, 
  onSearchResults,
  onClearSearch,
  searchQuery,
  onSearchQueryChange
}) => {
  const [isSearching, setIsSearching] = useState(false);

  const searchIdeas = (ideas: Idea[], query: string): Idea[] => {
    if (!query.trim()) return ideas;
    
    const searchTerm = query.toLowerCase();
    
    return ideas.filter(idea => 
      idea.name.toLowerCase().includes(searchTerm) ||
      idea.description.toLowerCase().includes(searchTerm) ||
      idea.industry.toLowerCase().includes(searchTerm) ||
      idea.targetAudience.toLowerCase().includes(searchTerm) ||
      idea.techStack.some(tech => tech.toLowerCase().includes(searchTerm)) ||
      idea.keyFeatures.some(feature => feature.toLowerCase().includes(searchTerm)) ||
      idea.marketData.trend.toLowerCase().includes(searchTerm)
    );
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      onClearSearch();
      return;
    }
    
    setIsSearching(true);
    setTimeout(() => {
      const results = searchIdeas(allIdeas, searchQuery);
      onSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  const handleClear = () => {
    onSearchQueryChange('');
    onClearSearch();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleQuickSearch = (term: string) => {
    onSearchQueryChange(term);
    setIsSearching(true);
    setTimeout(() => {
      const results = searchIdeas(allIdeas, term);
      onSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search ideas by name, industry, tech, features..."
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
        />
        
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-10 pr-3 flex items-center hover:text-gray-700"
            title="Clear search"
          >
            <FiX className="text-gray-400 hover:text-gray-600" />
          </button>
        )}
        
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="absolute inset-y-0 right-0 px-4 flex items-center bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSearching ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Search'
          )}
        </button>
      </div>
      
      {/* Quick filter chips */}
      <div className="mt-3 flex flex-wrap gap-2">
        {['AI', 'Healthcare', 'React', 'Beginner', 'SaaS', 'Mobile'].map((term) => (
          <button
            key={term}
            onClick={() => handleQuickSearch(term)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              searchQuery === term
                ? 'bg-blue-100 text-blue-700 border border-blue-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;