interface TelegramUser {
  id: number;
  first_name: string;
  username?: string;
}

interface GameStats {
  coins: number;
  level: number;
  totalTaps: number;
  totalEarned: number;
}

class TelegramBotService {
  private botToken: string;
  private baseUrl: string;

  constructor() {
    this.botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '8015335327:AAER_k1-PLGHKldW-9YkTehKUTHztA_T8iY';
    this.baseUrl = `https://api.telegram.org/bot${this.botToken}`;
  }

  async sendMessage(chatId: number, text: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'HTML'
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Failed to send Telegram message:', error);
      return false;
    }
  }

  async shareGameStats(chatId: number, stats: GameStats, username?: string): Promise<boolean> {
    const message = `
🚀 <b>MemeKombat Stats</b> 🚀

👤 Player: ${username || 'Anonymous'}
💰 Coins: ${this.formatNumber(stats.coins)} $MEME
🏆 Level: ${stats.level}
👆 Total Taps: ${this.formatNumber(stats.totalTaps)}
💎 Total Earned: ${this.formatNumber(stats.totalEarned)} $MEME

Keep tapping to reach the moon! 🌙
    `;

    return this.sendMessage(chatId, message);
  }

  async sendLevelUpNotification(chatId: number, newLevel: number): Promise<boolean> {
    const message = `
🎉 <b>LEVEL UP!</b> 🎉

You've reached Level ${newLevel}!
Keep grinding to unlock more upgrades! 💪

🚀 Emoji Kombat - To the Moon! 🌙
    `;

    return this.sendMessage(chatId, message);
  }

  async sendMilestoneNotification(chatId: number, milestone: string, value: number): Promise<boolean> {
    const message = `
🏆 <b>MILESTONE ACHIEVED!</b> 🏆

${milestone}: ${this.formatNumber(value)}

You're becoming a true meme lord! 👑

🚀 Emoji Kombat - Diamond Hands Forever! 💎
    `;

    return this.sendMessage(chatId, message);
  }

  private formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  // Get Telegram user info from URL parameters (for Telegram Web Apps)
  getTelegramUser(): TelegramUser | null {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const tgWebAppData = urlParams.get('tgWebAppData');
      
      if (tgWebAppData) {
        const decodedData = decodeURIComponent(tgWebAppData);
        const userData = JSON.parse(decodedData);
        return userData.user;
      }

      // Alternative: check for Telegram WebApp
      if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
        return window.Telegram.WebApp.initDataUnsafe.user;
      }

      return null;
    } catch (error) {
      console.error('Failed to get Telegram user info:', error);
      return null;
    }
  }
}

export default new TelegramBotService();
export type { TelegramUser, GameStats };