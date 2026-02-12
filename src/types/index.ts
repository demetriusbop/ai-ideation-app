export interface MarketData {
  marketSize: string;
  growthRate: string;
  trend: string;
  competition: string;
  entryBarrier: string;
  keyPlayers: string[];
  opportunities: string[];
  risks: string[];
  suggestedRevenueModels: string[];
}

export interface Idea {
  id: string;
  name: string;
  description: string;
  industry: string;
  targetAudience: string;
  budget: string;
  complexity: string;
  timeframe: string;
  uniquenessScore: number;
  marketData: MarketData;
  techStack: string[];
  estimatedCost: string;
  teamSize: string;
  developmentPhases: string[];
  keyFeatures: string[];
  createdAt: string;
  problemStatement?: string;
}