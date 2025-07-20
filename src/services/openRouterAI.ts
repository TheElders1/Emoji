// OpenRouter AI Service for dynamic content generation
class OpenRouterAI {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || 'sk-or-v1-your-api-key-here';
    this.baseUrl = 'https://openrouter.ai/api/v1';
  }

  async generateQuizQuestions(category: string, count: number = 5): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Emoji Kombat'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-8b-instruct:free',
          messages: [
            {
              role: 'user',
              content: `Generate ${count} unique emoji quiz questions for category "${category}". Return as JSON array with format: [{"emojis": "🎬🦁👑", "answer": "The Lion King", "options": ["The Lion King", "Madagascar", "Jungle Book", "Tarzan"], "category": "movie", "difficulty": "Easy"}]. Make each question unique and engaging.`
            }
          ],
          max_tokens: 2000,
          temperature: 0.8
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      try {
        return JSON.parse(content);
      } catch {
        // Fallback to static questions if AI fails
        return this.getFallbackQuestions(category, count);
      }
    } catch (error) {
      console.error('OpenRouter AI Error:', error);
      return this.getFallbackQuestions(category, count);
    }
  }

  async generateStoryPrompts(count: number = 5): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Emoji Kombat'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-8b-instruct:free',
          messages: [
            {
              role: 'user',
              content: `Generate ${count} unique emoji story prompts. Return as JSON array with format: [{"emojis": "🌅🏃‍♂️💪🥵💦", "answer": "Morning jog workout", "options": ["Morning jog workout", "Running from danger", "Hot summer day", "Gym training"], "difficulty": "Easy"}]. Each should tell a clear story through emojis.`
            }
          ],
          max_tokens: 1500,
          temperature: 0.9
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate story prompts');
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      try {
        return JSON.parse(content);
      } catch {
        return this.getFallbackStories(count);
      }
    } catch (error) {
      console.error('OpenRouter AI Error:', error);
      return this.getFallbackStories(count);
    }
  }

  async generateRiddles(count: number = 5): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Emoji Kombat'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-8b-instruct:free',
          messages: [
            {
              role: 'user',
              content: `Generate ${count} unique emoji riddles. Return as JSON array with format: [{"emojis": "🌙💤😴", "question": "I come when the sun goes down, bringing rest to all around. What am I?", "answer": "Night", "options": ["Night", "Sleep", "Dream", "Bed"], "hint": "It's the opposite of day", "difficulty": "Easy"}]. Make them challenging but solvable.`
            }
          ],
          max_tokens: 2000,
          temperature: 0.8
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate riddles');
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      try {
        return JSON.parse(content);
      } catch {
        return this.getFallbackRiddles(count);
      }
    } catch (error) {
      console.error('OpenRouter AI Error:', error);
      return this.getFallbackRiddles(count);
    }
  }

  private getFallbackQuestions(category: string, count: number): any[] {
    const fallback = [
      {
        emojis: "🦁👑🌍",
        answer: "The Lion King",
        options: ["The Lion King", "Madagascar", "Jungle Book", "Tarzan"],
        category: "movie",
        difficulty: "Easy"
      },
      {
        emojis: "🕷️👨🏠",
        answer: "Spider-Man",
        options: ["Batman", "Spider-Man", "Superman", "Iron Man"],
        category: "movie",
        difficulty: "Easy"
      }
    ];
    return fallback.slice(0, count);
  }

  private getFallbackStories(count: number): any[] {
    const fallback = [
      {
        emojis: "🌅🏃‍♂️💪🥵💦",
        answer: "Morning jog workout",
        options: ["Morning jog workout", "Running from danger", "Hot summer day", "Gym training"],
        difficulty: "Easy"
      }
    ];
    return fallback.slice(0, count);
  }

  private getFallbackRiddles(count: number): any[] {
    const fallback = [
      {
        emojis: "🌙💤😴",
        question: "I come when the sun goes down, bringing rest to all around. What am I?",
        answer: "Night",
        options: ["Night", "Sleep", "Dream", "Bed"],
        hint: "It's the opposite of day",
        difficulty: "Easy"
      }
    ];
    return fallback.slice(0, count);
  }
}

export default new OpenRouterAI();