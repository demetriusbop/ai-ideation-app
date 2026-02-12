import React from 'react';
import { Idea } from '../../types';
import { FiHeart, FiStar } from 'react-icons/fi';

interface IdeaComparisonProps {
  ideas: Idea[];
  favorites: string[];
  onSelectIdea: (idea: Idea) => void;
  onToggleFavorite: (id: string) => void;
  selectedIdeaId?: string;
}

const IdeaComparison: React.FC<IdeaComparisonProps> = ({
  ideas,
  favorites,
  onSelectIdea,
  onToggleFavorite,
  selectedIdeaId
}) => {
  if (ideas.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">💡 Generated Ideas</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiStar className="text-yellow-500" />
            <span>{favorites.length} favorites</span>
          </div>
        </div>
        <p className="text-gray-600 mt-2">
          Click on any idea to view detailed market insights
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {ideas.map((idea) => {
          const isSelected = idea.id === selectedIdeaId;
          const isFavorite = favorites.includes(idea.id);

          return (
            <div
              key={idea.id}
              className={`p-6 hover:bg-gray-50 cursor-pointer transition-all ${
                isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              }`}
              onClick={() => onSelectIdea(idea)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{idea.name}</h3>
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                      {idea.industry}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                      {idea.uniquenessScore}/100
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{idea.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Audience</div>
                      <div className="font-medium">{idea.targetAudience}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Complexity</div>
                      <div className={`font-medium px-2 py-1 rounded inline-block ${
                        idea.complexity === 'Beginner' ? 'bg-green-100 text-green-800' :
                        idea.complexity === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        idea.complexity === 'Advanced' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {idea.complexity}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Budget</div>
                      <div className="font-medium">{idea.budget}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Timeframe</div>
                      <div className="font-medium">{idea.timeframe}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-2">Tech Stack</div>
                    <div className="flex flex-wrap gap-2">
                      {idea.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(idea.id);
                  }}
                  className="ml-4 p-2 text-2xl hover:scale-110 transition-transform"
                  title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  {isFavorite ? (
                    <FiHeart className="text-red-500 fill-red-500" />
                  ) : (
                    <FiHeart className="text-gray-400" />
                  )}
                </button>
              </div>

              {isSelected && (
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="text-sm text-blue-600 font-medium flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                    Currently selected • Click another idea to switch
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IdeaComparison;