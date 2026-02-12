const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// API endpoint for generating ideas
app.post('/api/generate-ideas', async (req, res) => {
  try {
    const { industry, audience, budget, complexity, timeframe } = req.body;

    const prompt = `Generate 3 innovative project ideas for a ${industry} business targeting ${audience}. 
    Budget: ${budget}. Technical complexity: ${complexity}. Timeframe: ${timeframe}.
    
    For each idea, provide:
    1. Name
    2. Brief description (2-3 sentences)
    3. Market size estimate
    4. Competition level (Low/Medium/High)
    5. Potential revenue streams
    6. Key challenges
    7. Tech stack recommendations
    
    Format as JSON array.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const ideas = JSON.parse(completion.choices[0].message.content);
    res.json({ success: true, ideas });
    
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate ideas',
      fallback: true 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});