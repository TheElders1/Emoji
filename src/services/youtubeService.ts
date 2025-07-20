// YouTube Service for fetching latest videos
class YouTubeService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_YOUTUBE_API_KEY || 'your-youtube-api-key';
    this.baseUrl = 'https://www.googleapis.com/youtube/v3';
  }

  async getChannelVideos(channelId: string, maxResults: number = 5): Promise<any[]> {
    try {
      // For demo purposes, return mock data since we don't have YouTube API key
      return this.getMockVideos(channelId, maxResults);
    } catch (error) {
      console.error('YouTube API Error:', error);
      return this.getMockVideos(channelId, maxResults);
    }
  }

  private getMockVideos(channelId: string, maxResults: number): any[] {
    const mockVideos = [
      {
        id: 'video1',
        title: '🎮 Top 10 Emoji Kombat Strategies',
        thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=300',
        duration: '5:30',
        reward: 500,
        url: 'https://youtube.com/@emojikombat'
      },
      {
        id: 'video2',
        title: '💎 How to Reach Diamond Rank Fast',
        thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=300',
        duration: '8:15',
        reward: 750,
        url: 'https://youtube.com/@emojikombat'
      },
      {
        id: 'video3',
        title: '🏆 Mini-Game Master Guide',
        thumbnail: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=300',
        duration: '12:45',
        reward: 1000,
        url: 'https://youtube.com/@emojikombat'
      }
    ];

    if (channelId.includes('memers')) {
      return [
        {
          id: 'memer1',
          title: '😂 Funniest Emoji Memes 2024',
          thumbnail: 'https://images.pexels.com/photos/1181319/pexels-photo-1181319.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '6:20',
          reward: 600,
          url: 'https://youtube.com/@memersemoji'
        },
        {
          id: 'memer2',
          title: '🤣 Emoji Reactions Compilation',
          thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '9:10',
          reward: 800,
          url: 'https://youtube.com/@memersemoji'
        }
      ];
    }

    return mockVideos.slice(0, maxResults);
  }

  async getLatestVideos(): Promise<{ emojikombat: any[], memers: any[] }> {
    const [emojikombatVideos, memersVideos] = await Promise.all([
      this.getChannelVideos('emojikombat', 3),
      this.getChannelVideos('memers', 3)
    ]);

    return {
      emojikombat: emojikombatVideos,
      memers: memersVideos
    };
  }
}

export default new YouTubeService();