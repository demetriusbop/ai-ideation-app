import React from 'react';
import { Idea } from '../../types';
import { FiDownload, FiFileText, FiCopy } from 'react-icons/fi';

interface ExportPanelProps {
  idea: Idea;
}

const ExportPanel: React.FC<ExportPanelProps> = ({ idea }) => {
  const exportToPDF = async () => {
    // Simplified version - just alert for now
    alert(`PDF export for "${idea.name}" would be generated here.`);
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Field', 'Value'],
      ['Idea Name', idea.name],
      ['Description', idea.description],
      ['Industry', idea.industry],
      ['Target Audience', idea.targetAudience],
      ['Budget', idea.budget],
      ['Complexity', idea.complexity],
      ['Timeframe', idea.timeframe],
      ['Uniqueness Score', idea.uniquenessScore.toString()],
      ['Market Size', idea.marketData.marketSize],
      ['Growth Rate', idea.marketData.growthRate],
      ['Estimated Cost', idea.estimatedCost],
      ['Team Size', idea.teamSize],
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${idea.name.replace(/\s+/g, '_')}_data.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    const text = `
${idea.name}
${'='.repeat(idea.name.length)}

Description: ${idea.description}

📊 Market Analysis:
• Market Size: ${idea.marketData.marketSize}
• Growth Rate: ${idea.marketData.growthRate}
• Competition Level: ${idea.marketData.competition}

💰 Financials:
• Estimated Cost: ${idea.estimatedCost}
• Team Size: ${idea.teamSize}
• Timeframe: ${idea.timeframe}
    `;

    navigator.clipboard.writeText(text);
    alert('Idea details copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          📤 Export Options
        </h2>
        <div className="flex space-x-3">
          <button
            onClick={exportToPDF}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <FiFileText className="mr-2" />
            PDF Report
          </button>
          <button
            onClick={exportToCSV}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FiDownload className="mr-2" />
            CSV Data
          </button>
          <button
            onClick={copyToClipboard}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiCopy className="mr-2" />
            Copy Text
          </button>
        </div>
      </div>

      {/* Quick summary */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-700 mb-3">Quick Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-blue-50 rounded">
            <div className="text-sm text-gray-600">Market Opportunity</div>
            <div className="font-semibold">{idea.marketData.marketSize}</div>
          </div>
          <div className="p-3 bg-green-50 rounded">
            <div className="text-sm text-gray-600">Development Cost</div>
            <div className="font-semibold">{idea.estimatedCost}</div>
          </div>
          <div className="p-3 bg-purple-50 rounded">
            <div className="text-sm text-gray-600">Time to Market</div>
            <div className="font-semibold">{idea.timeframe}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;