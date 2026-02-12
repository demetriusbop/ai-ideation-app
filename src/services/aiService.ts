import { Idea } from '../types';

interface GenerationParams {
  industry: string;
  audience: string;
  budget: string;
  complexity: string;
  timeframe: string;
  count: number;
  problemStatement?: string;
}

export const generateIdeasWithAI = async (params: GenerationParams): Promise<Idea[]> => {
  try {
    const response = await fetch(process.env.REACT_APP_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
        // Add any other headers your professor specifies
      },
      body: JSON.stringify({
        // Adjust this format based on what your professor's API expects
        prompt: generatePrompt(params),
        count: params.count,
        temperature: 0.8,
        // Add other parameters as needed
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform the API response into your Idea format
    // You'll need to adjust this based on what your professor's API returns
    return transformAPIResponse(data, params);
    
  } catch (error) {
    console.error('Error calling AI API:', error);
    throw error;
  }
};

const generatePrompt = (params: GenerationParams): string => {
  return `Generate ${params.count} detailed business idea${params.count > 1 ? 's' : ''} for:

Industry: ${params.industry}
Target Audience: ${params.audience}
Budget: ${params.budget}
Technical Complexity: ${params.complexity}
Timeline: ${params.timeframe}
${params.problemStatement ? `Problem to solve: ${params.problemStatement}` : ''}

For each idea, provide:
1. Name
2. Detailed description (3-4 sentences)
3. Key features (5-7 items)
4. Recommended tech stack
5. Team size needed
6. Development phases
7. Monetization strategy

Format the response as a JSON array.`;
};

const transformAPIResponse = (apiResponse: any, params: GenerationParams): Idea[] => {
  // This function will need to be customized based on your professor's API response format
  // Ask your professor what the response structure looks like
  
  // Example transformation (adjust based on actual response):
  return apiResponse.ideas.map((item: any, index: number) => ({
    id: `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
    name: item.name,
    description: item.description,
    industry: params.industry,
    targetAudience: params.audience,
    budget: params.budget,
    complexity: params.complexity,
    timeframe: params.timeframe,
    uniquenessScore: Math.floor(Math.random() * 30) + 70,
    marketData: {
      marketSize: item.marketSize || 'TBD',
      growthRate: item.growthRate || 'TBD',
      trend: item.trend || 'Emerging market',
      competition: item.competition || 'Medium',
      entryBarrier: item.entryBarrier || 'Moderate',
      keyPlayers: item.keyPlayers || ['TBD'],
      opportunities: item.opportunities || ['Market validation needed'],
      risks: item.risks || ['Competition', 'Technical challenges'],
      suggestedRevenueModels: item.revenueModels || ['Subscription', 'Freemium']
    },
    techStack: item.techStack || ['React', 'Node.js', 'MongoDB'],
    estimatedCost: getEstimatedCost(params.budget),
    teamSize: item.teamSize || getTeamSize(params.complexity, params.budget),
    developmentPhases: item.developmentPhases || [
      'MVP development (4-8 weeks)',
      'Beta testing (2-4 weeks)',
      'Launch & marketing (ongoing)'
    ],
    keyFeatures: item.keyFeatures || ['User authentication', 'Dashboard', 'API'],
    createdAt: new Date().toISOString(),
    problemStatement: params.problemStatement || ''
  }));
};

// Keep these helper functions
const getEstimatedCost = (budget: string): string => {
  const costs = {
    'Ultra Low': '$100 - $500',
    'Low': '$500 - $2,000',
    'Medium': '$2,000 - $10,000',
    'High': '$10,000 - $50,000'
  };
  return costs[budget as keyof typeof costs] || costs.Low;
};

const getTeamSize = (complexity: string, budget: string): string => {
  if (budget === 'Ultra Low') return '1 founder/developer (solo)';
  switch (complexity) {
    case 'Beginner': return '1-2 developers (part-time)';
    case 'Intermediate': return '2-3 developers + freelance designer';
    case 'Advanced': return '3-4 developers + part-time designer + QA';
    case 'Expert': return '4-6 developers + designer + DevOps';
    default: return '2 developers';
  }
};