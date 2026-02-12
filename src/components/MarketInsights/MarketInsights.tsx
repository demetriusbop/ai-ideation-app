import React from 'react';
import { Idea } from '../../types';

interface MarketInsightsProps {
  idea: Idea | null;
}

const MarketInsights: React.FC<MarketInsightsProps> = ({ idea }) => {
  if (!idea) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 h-full">
        <div className="text-center py-8">
          <div className="text-6xl mb-4 text-gray-300">📊</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No Idea Selected
          </h2>
          <p className="text-gray-600 mb-6">
            Select an idea from the list to view detailed market insights, 
            growth potential, and competitive analysis.
          </p>
          <div className="inline-block p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 Tip: Click on any idea card to see its market insights here
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          📊 Market Insights
        </h2>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
          {idea.industry}
        </span>
      </div>

      <div className="space-y-6">
        {/* Market Overview */}
        <div>
          <h3 className="font-medium text-gray-700 mb-3 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Market Overview
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{idea.marketData.marketSize}</div>
              <div className="text-sm text-gray-600">Market Size</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{idea.marketData.growthRate}</div>
              <div className="text-sm text-gray-600">Growth Rate</div>
            </div>
          </div>
        </div>

        {/* Trend & Competition */}
        <div>
          <h3 className="font-medium text-gray-700 mb-3 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Current Trend
          </h3>
          <p className="text-gray-700 bg-green-50 p-4 rounded-lg">
            {idea.marketData.trend}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Competition Level</h3>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-lg font-semibold text-yellow-700">{idea.marketData.competition}</div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Entry Barrier</h3>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-lg font-semibold text-purple-700">{idea.marketData.entryBarrier}</div>
            </div>
          </div>
        </div>

        {/* Key Players */}
        <div>
          <h3 className="font-medium text-gray-700 mb-3">Key Players</h3>
          <div className="space-y-2">
            {idea.marketData.keyPlayers.map((player, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                <span className="text-gray-700">{player}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunities */}
        <div>
          <h3 className="font-medium text-gray-700 mb-3 text-green-600">Opportunities</h3>
          <div className="space-y-2">
            {idea.marketData.opportunities.map((opportunity, index) => (
              <div key={index} className="flex items-start p-3 bg-green-50 rounded-lg">
                <div className="text-green-500 mr-3">✓</div>
                <span className="text-gray-700">{opportunity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risks */}
        <div>
          <h3 className="font-medium text-gray-700 mb-3 text-red-600">Potential Risks</h3>
          <div className="space-y-2">
            {idea.marketData.risks.map((risk, index) => (
              <div key={index} className="flex items-start p-3 bg-red-50 rounded-lg">
                <div className="text-red-500 mr-3">⚠️</div>
                <span className="text-gray-700">{risk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;