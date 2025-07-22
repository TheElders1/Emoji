// OpenRouter AI Service for dynamic content generation
class OpenRouterAI {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = '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';
    this.baseUrl = 'https://openrouter.ai/api/v1';
  }

  async generateCipherPuzzle(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://emoji-kombat.netlify.app/',
          'X-Title': 'Emoji Kombat'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-8b-instruct:free',
          messages: [
            {
              role: 'user',
              content: `Generate a unique emoji cipher puzzle. Return as JSON with format: {"cipher": "🦁🍎🌙🐘", "answer": "LOVE", "hint": "🦁=L, 🍎=O, 🌙=V, 🐘=E", "difficulty": "Easy"}. Make it challenging but solvable.`
            }
          ],
          max_tokens: 500,
          temperature: 0.8
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate cipher puzzle');
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      try {
        return JSON.parse(content);
      } catch {
        return this.getFallbackCipher();
      }
    } catch (error) {
      console.error('OpenRouter AI Error:', error);
      return this.getFallbackCipher();
    }
  }

  async generateEquationPuzzle(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://emoji-kombat.netlify.app/',
          'X-Title': 'Emoji Kombat'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-8b-instruct:free',
          messages: [
            {
              role: 'user',
              content: `Generate a unique emoji equation puzzle. Return as JSON with format: {"equations": ["🍌 + 🍌 = 8", "🍎 + 🍎 = 6", "🍌 - 🍎 = ?"], "answer": "1", "solution": "🍌 = 4, 🍎 = 3, so 4 - 3 = 1", "difficulty": "Easy"}. Create new emojis and values each time.`
            }
          ],
          max_tokens: 500,
          temperature: 0.9
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate equation puzzle');
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      try {
        return JSON.parse(content);
      } catch {
        return this.getFallbackEquation();
      }
    } catch (error) {
      console.error('OpenRouter AI Error:', error);
      return this.getFallbackEquation();
    }
  }

  async generateLogicPuzzle(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://emoji-kombat.netlify.app/',
          'X-Title': 'Emoji Kombat'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-8b-instruct:free',
          messages: [
            {
              role: 'user',
              content: `Generate a unique emoji logic grid puzzle. Return as JSON with format: {"clues": ["The 🧑‍🚀 eats 🍕 in the 🚀", "The 👨‍⚕️ drinks ☕ in the 🏥"], "questions": [{"question": "Who eats pizza?", "answer": "🧑‍🚀", "options": ["🧑‍🚀", "👨‍⚕️", "👨‍🍳"]}], "difficulty": "Easy"}. Create unique scenarios each time.`
            }
          ],
          max_tokens: 800,
          temperature: 0.8
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate logic puzzle');
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      try {
        return JSON.parse(content);
      } catch {
        return this.getFallbackLogic();
      }
    } catch (error) {
      console.error('OpenRouter AI Error:', error);
      return this.getFallbackLogic();
    }
  }

  async generateReferralLink(username: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://emoji-kombat.netlify.app/',
          'X-Title': 'Emoji Kombat'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-8b-instruct:free',
          messages: [
            {
              role: 'user',
              content: `Generate a unique referral message for user "${username}" for Emoji Kombat game. Include emojis and make it engaging. Keep it under 200 characters. Include the link https://emoji-kombat.netlify.app/?ref=${username}`
            }
          ],
          max_tokens: 300,
          temperature: 0.9
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate referral link');
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      return content || this.getFallbackReferral(username);
    } catch (error) {
      console.error('OpenRouter AI Error:', error);
      return this.getFallbackReferral(username);
    }
  }

  private getFallbackCipher(): any {
    const fallbacks = [
      {
        cipher: '🦁🍎🌙🐘',
        answer: 'LOVE',
        hint: '🦁=L, 🍎=O, 🌙=V, 🐘=E',
        difficulty: 'Easy'
      },
      {
        cipher: '🌟🍎🌙🐘 🥚🌙🦁🐘🌙',
        answer: 'SAVE WORLD',
        hint: 'Each emoji represents a letter',
        difficulty: 'Medium'
      }
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  private getFallbackEquation(): any {
    const fallbacks = [
      {
        equations: ['🍌 + 🍌 = 8', '🍎 + 🍎 = 6', '🍌 - 🍎 = ?'],
        answer: '1',
        solution: '🍌 = 4, 🍎 = 3, so 4 - 3 = 1',
        difficulty: 'Easy'
      },
      {
        equations: ['🐶 + 🐱 = 12', '🐶 - 🐱 = 4', '🐶 × 🐱 = ?'],
        answer: '32',
        solution: '🐶 = 8, 🐱 = 4, so 8 × 4 = 32',
        difficulty: 'Medium'
      }
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  private getFallbackLogic(): any {
    const fallbacks = [
      {
        clues: [
          'The 🧑‍🚀 eats 🍕 in the 🚀',
          'The 👨‍⚕️ drinks ☕ in the 🏥',
          'The 👨‍🍳 eats 🍝 in the 🍴'
        ],
        questions: [
          { question: 'Who eats pizza?', answer: '🧑‍🚀', options: ['🧑‍🚀', '👨‍⚕️', '👨‍🍳'] },
          { question: 'Where does the chef work?', answer: '🍴', options: ['🚀', '🏥', '🍴'] }
        ],
        difficulty: 'Easy'
      }
    ];
    return fallbacks[0];
  }

  private getFallbackReferral(username: string): string {
    const messages = [
      `🚀 Join me in Emoji Kombat! Tap your way to crypto riches! 💎 https://emoji-kombat.netlify.app/?ref=${username}`,
      `🎮 Challenge your brain with hard emoji puzzles! Join ${username} in Emoji Kombat! 🧠 https://emoji-kombat.netlify.app/?ref=${username}`,
      `💰 Earn $EMOJI coins by solving puzzles! ${username} invited you! 🎯 https://emoji-kombat.netlify.app/?ref=${username}`
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }
}

export default new OpenRouterAI();