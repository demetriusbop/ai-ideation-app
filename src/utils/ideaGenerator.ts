import { Idea, MarketData } from '../types';

const industryKeywords = {
  Technology: ['AI', 'SaaS', 'Platform', 'Analytics', 'Automation', 'Cloud', 'IoT', 'Blockchain'],
  Healthcare: ['Telemedicine', 'Wellness', 'Monitoring', 'Records', 'Diagnostics', 'Preventive', 'Mental', 'Genomic'],
  Education: ['E-learning', 'Tutoring', 'Skills', 'Certification', 'Platform', 'Gamified', 'VR', 'Adaptive'],
  Finance: ['Fintech', 'Investing', 'Budgeting', 'Payment', 'Security', 'Crypto', 'Insurtech', 'Wealth'],
  'E-commerce': ['Marketplace', 'Delivery', 'Personalization', 'Reviews', 'Logistics', 'Social', 'Sustainable', 'AR'],
  Sustainability: ['Green', 'Renewable', 'Recycling', 'Carbon', 'Eco-friendly', 'Circular', 'Energy', 'Waste'],
  Entertainment: ['Streaming', 'Gaming', 'Content', 'Social', 'Interactive', 'Live', 'VR', 'Creator'],
  'Food & Beverage': ['Delivery', 'Recipe', 'Nutrition', 'Local', 'Subscription', 'Meal', 'Plant-based', 'Smart']
};

const generateMockMarketData = (industry: string): MarketData => {
  const growthRates = {
    Technology: { 
      growth: '15-25%', 
      size: '$5.2T', 
      trend: 'Rapid AI adoption and cloud migration',
      opportunities: ['Edge computing', 'AI democratization', 'Low-code platforms', 'Quantum computing'],
      risks: ['Talent shortage', 'Security threats', 'Regulatory pressure', 'Market consolidation']
    },
    Healthcare: { 
      growth: '8-12%', 
      size: '$10T', 
      trend: 'Digital health transformation and telemedicine',
      opportunities: ['Remote patient monitoring', 'AI diagnostics', 'Personalized medicine', 'Wearable tech'],
      risks: ['Regulatory compliance', 'Data privacy', 'Reimbursement challenges', 'Clinical validation']
    },
    Education: { 
      growth: '10-15%', 
      size: '$7T', 
      trend: 'Online learning expansion and skills-based education',
      opportunities: ['Micro-credentials', 'Corporate training', 'Language learning', 'STEM focus'],
      risks: ['Quality assurance', 'Student retention', 'Platform fatigue', 'Accreditation issues']
    },
    Finance: { 
      growth: '12-18%', 
      size: '$8.5T', 
      trend: 'DeFi and mobile banking revolution',
      opportunities: ['Digital wallets', 'Embedded finance', 'Green investing', 'Financial inclusion'],
      risks: ['Cybersecurity threats', 'Regulatory uncertainty', 'Market volatility', 'Trust issues']
    },
    'E-commerce': { 
      growth: '20-30%', 
      size: '$6.3T', 
      trend: 'Social commerce and direct-to-consumer growth',
      opportunities: ['Cross-border expansion', 'Sustainable products', 'AR shopping', 'Voice commerce'],
      risks: ['Supply chain issues', 'Customer acquisition costs', 'Platform dependency', 'Return fraud']
    },
    Sustainability: { 
      growth: '25-35%', 
      size: '$1.5T', 
      trend: 'Green tech investment and circular economy',
      opportunities: ['Carbon tracking', 'Sustainable materials', 'Energy efficiency', 'Water conservation'],
      risks: ['Policy changes', 'Technology costs', 'Greenwashing scrutiny', 'Market education']
    },
    Entertainment: { 
      growth: '7-10%', 
      size: '$2.3T', 
      trend: 'Interactive content and creator economy',
      opportunities: ['Metaverse experiences', 'Interactive streaming', 'NFT integration', 'Esports'],
      risks: ['Content saturation', 'Platform changes', 'Copyright issues', 'Audience fragmentation']
    },
    'Food & Beverage': { 
      growth: '5-8%', 
      size: '$8.7T', 
      trend: 'Health-conscious products and smart kitchens',
      opportunities: ['Functional foods', 'Home cooking tech', 'Food waste reduction', 'Personalized nutrition'],
      risks: ['Supply chain volatility', 'Regulatory compliance', 'Consumer trends', 'Ingredient costs']
    }
  };

  const data = growthRates[industry as keyof typeof growthRates] || growthRates.Technology;

  return {
    marketSize: data.size,
    growthRate: data.growth,
    trend: data.trend,
    competition: 'Medium to High',
    entryBarrier: 'Moderate',
    keyPlayers: ['Established industry leaders', 'Innovative startups', 'Tech giants entering the space'],
    opportunities: data.opportunities || [
      'Untapped niche markets',
      'Emerging technology integration',
      'Changing consumer behaviors',
      'Regulatory tailwinds'
    ],
    risks: data.risks || [
      'Regulatory changes',
      'Technology disruption',
      'Market saturation',
      'Economic uncertainty'
    ],
    suggestedRevenueModels: [
      'Subscription SaaS',
      'Transaction fees',
      'Freemium with premium features',
      'Enterprise licensing',
      'Marketplace commissions',
      'Advertising revenue',
      'Data analytics services'
    ]
  };
};

export const searchIdeas = (ideas: Idea[], query: string): Idea[] => {
  if (!query.trim()) return ideas;
  
  const searchTerm = query.toLowerCase();
  
  return ideas.filter(idea => 
    idea.name.toLowerCase().includes(searchTerm) ||
    idea.description.toLowerCase().includes(searchTerm) ||
    idea.industry.toLowerCase().includes(searchTerm) ||
    idea.targetAudience.toLowerCase().includes(searchTerm) ||
    idea.techStack.some(tech => tech.toLowerCase().includes(searchTerm)) ||
    idea.keyFeatures.some(feature => feature.toLowerCase().includes(searchTerm))
  );
};

// UPDATED: Generate ideas with proper unique IDs and budget ranges
export const generateIdeas = (params: {
  industry: string;
  audience: string;
  budget: string;
  complexity: string;
  timeframe: string;
  count: number;
  problemStatement?: string;
}): Idea[] => {
  const ideas: Idea[] = [];
  const keywords = industryKeywords[params.industry as keyof typeof industryKeywords] || industryKeywords.Technology;

  for (let i = 0; i < params.count; i++) {
    // Create truly unique ID
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${i}`;
    const keyword = keywords[i % keywords.length];
    
    const name = params.problemStatement 
      ? `${params.industry}: ${params.problemStatement.split(' ').slice(0, 3).join(' ')} Solution`
      : `${params.industry} ${keyword} Platform`;
    
    const idea: Idea = {
      id,
      name,
      description: params.problemStatement
        ? `A solution addressing: "${params.problemStatement}". A comprehensive ${params.complexity.toLowerCase()} platform targeting ${params.audience.toLowerCase()} in the ${params.industry.toLowerCase()} sector.`
        : `A comprehensive ${params.complexity.toLowerCase()} platform targeting ${params.audience.toLowerCase()} in the ${params.industry.toLowerCase()} sector. Leverages modern technology to solve key industry challenges.`,
      industry: params.industry,
      targetAudience: params.audience,
      budget: params.budget,
      complexity: params.complexity,
      timeframe: params.timeframe,
      uniquenessScore: Math.floor(Math.random() * 40) + 60,
      marketData: generateMockMarketData(params.industry),
      techStack: getTechStack(params.complexity, params.budget),
      estimatedCost: getEstimatedCost(params.budget),
      teamSize: getTeamSize(params.complexity, params.budget),
      developmentPhases: [
        'Market research & user interviews (1-2 weeks)',
        'Prototype design & feedback (1-2 weeks)',
        'MVP development with core features (2-4 weeks)',
        'Alpha testing with early users (1-2 weeks)',
        'Beta launch & feature refinement (2-3 weeks)',
        'Full production release & marketing (ongoing)'
      ],
      keyFeatures: [
        'User-friendly interface',
        'Basic analytics',
        'Mobile responsive design',
        'Secure authentication',
        'Cloud hosting'
      ],
      createdAt: new Date().toISOString(),
      problemStatement: params.problemStatement || ''
    };
    ideas.push(idea);
  }

  return ideas;
};

// UPDATED: Budget-aware tech stack
const getTechStack = (complexity: string, budget: string): string[] => {
  if (budget === 'Ultra Low') {
    return ['React (Vite)', 'Firebase/Firestore', 'Tailwind CSS', 'Vercel (free tier)'];
  }
  
  switch (complexity) {
    case 'Beginner':
      return ['React', 'Node.js', 'MongoDB Atlas (free tier)', 'Tailwind CSS', 'Express'];
    case 'Intermediate':
      return ['Next.js', 'TypeScript', 'Firebase', 'GraphQL', 'PostgreSQL'];
    case 'Advanced':
      return ['Microservices', 'Docker', 'AWS (free tier)', 'React Native', 'Redis'];
    case 'Expert':
      return ['Kubernetes', 'AI/ML integration', 'AWS/GCP', 'WebAssembly'];
    default:
      return ['React', 'Node.js', 'MongoDB', 'TypeScript'];
  }
};

// UPDATED: Lower budget ranges
const getEstimatedCost = (budget: string): string => {
  const costs = {
    'Ultra Low': '$100 - $500',
    'Low': '$500 - $2,000',
    'Medium': '$2,000 - $10,000',
    'High': '$10,000 - $50,000'
  };
  return costs[budget as keyof typeof costs] || costs.Low;
};

// UPDATED: Budget-aware team sizes
const getTeamSize = (complexity: string, budget: string): string => {
  if (budget === 'Ultra Low') {
    return '1 founder/developer (solo)';
  }
  
  switch (complexity) {
    case 'Beginner': return '1-2 developers (part-time)';
    case 'Intermediate': return '2-3 developers + freelance designer';
    case 'Advanced': return '3-4 developers + part-time designer + QA';
    case 'Expert': return '4-6 developers + designer + DevOps';
    default: return '2 developers';
  }
};