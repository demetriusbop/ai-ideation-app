import React, { useState, useRef } from 'react';
import { Idea, MarketData } from '../../types';

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

// ============ FALLBACK MOCK DATA GENERATOR (USED IF API FAILS) ============
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

// ============ FALLBACK MOCK IDEA GENERATOR ============
const generateMockIdeas = (params: {
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
  
  const ideaTemplates = [
    {
      type: 'Platform',
      features: ['User profiles', 'Basic matching', 'Review system', 'Messaging']
    },
    {
      type: 'Tool',
      features: ['Basic analytics', 'Simple automation', 'Custom reporting', 'Export capabilities']
    },
    {
      type: 'Service',
      features: ['Personal dashboard', 'Resource library', 'Community forum', 'Progress tracking']
    },
    {
      type: 'Marketplace',
      features: ['Vendor listings', 'Quality ratings', 'Secure transactions', 'Search filters']
    }
  ];

  for (let i = 0; i < params.count; i++) {
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${i}`;
    const keyword = keywords[i % keywords.length];
    const template = ideaTemplates[i % ideaTemplates.length];
    
    const name = params.problemStatement 
      ? `${params.industry}: ${params.problemStatement.split(' ').slice(0, 3).join(' ')} ${template.type}`
      : `${params.industry} ${keyword} ${template.type}`;
    
    const description = params.problemStatement
      ? `A solution addressing: "${params.problemStatement}". A comprehensive ${params.complexity.toLowerCase()} platform targeting ${params.audience.toLowerCase()} in the ${params.industry.toLowerCase()} sector.`
      : `A comprehensive ${params.complexity.toLowerCase()} ${keyword.toLowerCase()} ${template.type.toLowerCase()} targeting ${params.audience.toLowerCase()} in the ${params.industry.toLowerCase()} sector.`;

    const idea: Idea = {
      id: uniqueId,
      name,
      description,
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
      keyFeatures: template.features,
      createdAt: new Date().toISOString(),
      problemStatement: params.problemStatement || ''
    };
    ideas.push(idea);
  }

  return ideas;
};

// ============ OPENAI API INTEGRATION ============
interface GenerationParams {
  industry: string;
  audience: string;
  budget: string;
  complexity: string;
  timeframe: string;
  count: number;
  problemStatement?: string;
}

const generateIdeasWithOpenAI = async (params: GenerationParams): Promise<Idea[]> => {
  try {
    console.log('🤖 Calling OpenAI API...');
    
    // Get API key from environment variables - NEVER hardcode!
    const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
    
    if (!API_KEY) {
      throw new Error('OpenAI API key is missing. Please add REACT_APP_OPENAI_API_KEY to your .env file');
    }
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert business consultant and innovation strategist. Generate detailed, specific, and innovative business ideas with comprehensive market analysis.'
          },
          {
            role: 'user',
            content: generatePrompt(params)
          }
        ],
        temperature: 0.8,
        max_tokens: 2500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ OpenAI response received');
    
    // Parse the JSON response from the AI
    const content = data.choices[0].message.content;
    let ideasArray;
    
    try {
      // Try to parse as JSON
      ideasArray = JSON.parse(content);
    } catch (e) {
      // If not valid JSON, try to extract JSON from the text
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        ideasArray = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not parse AI response as JSON');
      }
    }
    
    // Transform to your Idea format
    return transformOpenAIResponse(ideasArray, params);
    
  } catch (error) {
    console.error('❌ OpenAI API error:', error);
    console.log('⚠️ Falling back to mock data...');
    return generateMockIdeas(params);
  }
};

const generatePrompt = (params: GenerationParams): string => {
  const budgetRange = getEstimatedCost(params.budget);
  
  return `You are an AI business consultant. Generate ${params.count} detailed, innovative business ideas with the following constraints:

INDUSTRY: ${params.industry}
TARGET AUDIENCE: ${params.audience}
BUDGET: ${params.budget} (${budgetRange})
TECHNICAL COMPLEXITY: ${params.complexity}
TIMEFRAME: ${params.timeframe}
${params.problemStatement ? `SPECIFIC PROBLEM TO SOLVE: "${params.problemStatement}"` : ''}

For EACH idea, provide a JSON object with these EXACT fields:
- "name": A compelling, memorable business name (string)
- "description": Detailed 3-4 sentence description of what it does and the problem it solves (string)
- "keyFeatures": Array of 5-7 specific features
- "techStack": Array of 4-6 specific technologies appropriate for ${params.complexity} complexity
- "teamSize": Specific team composition recommendation (string)
- "developmentPhases": Array of 4-5 development phases with time estimates
- "marketSize": Specific TAM/SAM/SOM estimate (string, e.g., "$500M")
- "growthRate": Expected annual growth rate (string, e.g., "25%")
- "trend": Current market trend this idea capitalizes on (string)
- "competition": Assessment of competitive landscape (string)
- "entryBarrier": Assessment of barriers to entry (string)
- "keyPlayers": Array of 3-4 key competitors
- "opportunities": Array of 3-4 specific market opportunities
- "risks": Array of 3-4 specific risks
- "revenueModels": Array of 2-3 monetization strategies

Make each idea UNIQUE, SPECIFIC to ${params.industry}, and REALISTIC for a ${params.budget} budget.
Format your response as a valid JSON array of objects.

Example format:
[
  {
    "name": "HealthCompanion AI",
    "description": "An AI-powered personal health assistant that helps users track symptoms, manage medications, and connect with healthcare providers. The app uses natural language processing to understand patient concerns and provides personalized recommendations based on medical history and current symptoms.",
    "keyFeatures": ["AI symptom checker", "Medication reminders", "Telehealth appointments", "Health records", "Insurance verification", "Lab results integration"],
    "techStack": ["React Native", "Node.js", "MongoDB", "TensorFlow", "Twilio", "Stripe"],
    "teamSize": "3 developers + 1 ML engineer + 1 UI/UX designer",
    "developmentPhases": ["MVP (8 weeks)", "Beta testing (4 weeks)", "Full launch (2 weeks)", "Post-launch optimization (ongoing)"],
    "marketSize": "$3.2B",
    "growthRate": "28%",
    "trend": "Telemedicine adoption post-pandemic",
    "competition": "Moderate with several regional players",
    "entryBarrier": "Medium - requires HIPAA compliance",
    "keyPlayers": ["Teladoc", "Amwell", "Doctor on Demand"],
    "opportunities": ["Integration with wearables", "Partnerships with insurance companies", "Rural healthcare access"],
    "risks": ["Regulatory changes", "Data privacy concerns", "Competition from big tech"],
    "revenueModels": ["Subscription ($9.99/month)", "Enterprise licensing for clinics", "Insurance partnerships"]
  }
]`;
};

const transformOpenAIResponse = (ideasArray: any[], params: GenerationParams): Idea[] => {
  return ideasArray.map((item, index) => {
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}-${index}`;
    
    return {
      id: uniqueId,
      name: item.name || `${params.industry} Innovation ${index + 1}`,
      description: item.description || `A ${params.complexity} solution for ${params.audience}.`,
      industry: params.industry,
      targetAudience: params.audience,
      budget: params.budget,
      complexity: params.complexity,
      timeframe: params.timeframe,
      uniquenessScore: Math.floor(Math.random() * 30) + 70,
      marketData: {
        marketSize: item.marketSize || generateMockMarketData(params.industry).marketSize,
        growthRate: item.growthRate || generateMockMarketData(params.industry).growthRate,
        trend: item.trend || generateMockMarketData(params.industry).trend,
        competition: item.competition || 'Medium',
        entryBarrier: item.entryBarrier || 'Moderate',
        keyPlayers: item.keyPlayers || ['Market leaders', 'Innovative startups'],
        opportunities: item.opportunities || ['First-mover advantage', 'Niche focus'],
        risks: item.risks || ['Competition', 'Market adoption'],
        suggestedRevenueModels: item.revenueModels || ['Subscription', 'Freemium']
      },
      techStack: item.techStack || getTechStack(params.complexity, params.budget),
      estimatedCost: getEstimatedCost(params.budget),
      teamSize: item.teamSize || getTeamSize(params.complexity, params.budget),
      developmentPhases: item.developmentPhases || [
        'MVP development (4-8 weeks)',
        'Beta testing (2-4 weeks)',
        'Launch (2 weeks)',
        'Iteration (ongoing)'
      ],
      keyFeatures: item.keyFeatures || ['User authentication', 'Dashboard', 'API', 'Analytics'],
      createdAt: new Date().toISOString(),
      problemStatement: params.problemStatement || ''
    };
  });
};

// ============ REACT COMPONENT ============
interface IdeaGeneratorProps {
  onIdeasGenerated: (ideas: Idea[]) => void;
}

const IdeaGenerator: React.FC<IdeaGeneratorProps> = ({ onIdeasGenerated }) => {
  const [formData, setFormData] = useState({
    industry: 'Technology',
    audience: 'Small Businesses',
    budget: 'Ultra Low',
    complexity: 'Beginner',
    timeframe: '1-3 months',
    count: 3,
    problemStatement: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const isGenerating = useRef(false);

  // Check if API key exists on component mount
  React.useEffect(() => {
    if (!process.env.REACT_APP_OPENAI_API_KEY) {
      console.warn('⚠️ REACT_APP_OPENAI_API_KEY is missing in .env file');
      setApiKeyMissing(true);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'count' ? Math.min(Math.max(parseInt(value) || 1, 1), 10) : value
    }));
  };

  const handleGenerate = async () => {
    if (isLoading || isGenerating.current) {
      console.log('⚠️ Generation already in progress');
      return;
    }
    
    console.log('🚀 Starting AI-powered idea generation...');
    isGenerating.current = true;
    setIsLoading(true);
    
    try {
      let newIdeas: Idea[];
      
      if (!process.env.REACT_APP_OPENAI_API_KEY) {
        console.log('⚠️ No API key found, using mock data');
        newIdeas = generateMockIdeas(formData);
      } else {
        // Try OpenAI first
        newIdeas = await generateIdeasWithOpenAI(formData);
      }
      
      console.log(`✅ Generated ${newIdeas.length} new ideas`);
      onIdeasGenerated(newIdeas);
    } catch (error) {
      console.error('❌ Error:', error);
      const fallbackIdeas = generateMockIdeas(formData);
      onIdeasGenerated(fallbackIdeas);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        isGenerating.current = false;
      }, 100);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Generate Business Ideas</h2>
      
      {apiKeyMissing && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ OpenAI API key not found. Add REACT_APP_OPENAI_API_KEY to your .env file to use real AI generation. 
            Currently using mock data for demonstration.
          </p>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.keys(industryKeywords).map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
          <input
            type="text"
            name="audience"
            value={formData.audience}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Small Businesses, Students, Freelancers, etc."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Ultra Low">Ultra Low ($100-500) - Solo founder</option>
              <option value="Low">Low ($500-2,000) - Small team</option>
              <option value="Medium">Medium ($2,000-10,000) - Part-time team</option>
              <option value="High">High ($10,000-50,000) - Full team</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Complexity</label>
            <select
              name="complexity"
              value={formData.complexity}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Beginner">Beginner - Simple MVP</option>
              <option value="Intermediate">Intermediate - Full features</option>
              <option value="Advanced">Advanced - Complex system</option>
              <option value="Expert">Expert - Cutting edge</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timeframe</label>
            <select
              name="timeframe"
              value={formData.timeframe}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1-3 months">1-3 months</option>
              <option value="3-6 months">3-6 months</option>
              <option value="6-12 months">6-12 months</option>
              <option value="12+ months">12+ months</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Ideas</label>
            <input
              type="number"
              name="count"
              value={formData.count}
              onChange={handleInputChange}
              min="1"
              max="10"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Problem Statement (Optional)</label>
          <textarea
            name="problemStatement"
            value={formData.problemStatement}
            onChange={handleInputChange}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe a specific problem you want to solve..."
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {process.env.REACT_APP_OPENAI_API_KEY ? 'Generating Ideas with OpenAI...' : 'Generating Mock Ideas...'}
            </span>
          ) : (
            process.env.REACT_APP_OPENAI_API_KEY ? 'Generate Ideas with AI' : 'Generate Ideas (Mock Mode)'
          )}
        </button>
      </div>
    </div>
  );
};

export default IdeaGenerator;