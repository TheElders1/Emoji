import React, { useState, useEffect } from 'react';
import { Send, Share, Bell, User } from 'lucide-react';
import telegramBot, { type TelegramUser, type GameStats } from '../services/telegramBot';

interface TelegramIntegrationProps {
  gameStats: GameStats;
}

const TelegramIntegration: React.FC<TelegramIntegrationProps> = ({ gameStats }) => {
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [lastSharedLevel, setLastSharedLevel] = useState(0);

  useEffect(() => {
    // Get Telegram user info on component mount
    const user = telegramBot.getTelegramUser();
    setTelegramUser(user);
  }, []);

  useEffect(() => {
    // Send level up notification
    if (telegramUser && gameStats.level > lastSharedLevel && lastSharedLevel > 0) {
      telegramBot.sendLevelUpNotification(telegramUser.id, gameStats.level);
      setLastSharedLevel(gameStats.level);
    }
  }, [gameStats.level, telegramUser, lastSharedLevel]);

  const handleShareStats = async () => {
    if (!telegramUser) {
      alert('Telegram integration not available. Please open this game through Telegram.');
      return;
    }

    setIsSharing(true);
    try {
      const success = await telegramBot.shareGameStats(
        telegramUser.id, 
        gameStats, 
        telegramUser.username || telegramUser.first_name
      );
      
      if (success) {
        alert('Stats shared successfully! 🚀');
      } else {
        alert('Failed to share stats. Please try again.');
      }
    } catch (error) {
      console.error('Error sharing stats:', error);
      alert('Failed to share stats. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  const handleShareToChannel = () => {
    const message = `🚀 Just hit Level ${gameStats.level} in Emoji Kombat! 💰 ${telegramBot['formatNumber'](gameStats.coins)} $MEME earned! 

Join me: [Play Emoji Kombat](${window.location.href})

#EmojiKombat #TapToEarn #Crypto`;

    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Send className="w-6 h-6 text-blue-400" />
        Telegram Integration
      </h2>

      {telegramUser ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-white">{telegramUser.first_name}</div>
              {telegramUser.username && (
                <div className="text-sm text-white/60">@{telegramUser.username}</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={handleShareStats}
              disabled={isSharing}
              className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-4 py-3 rounded-lg font-bold text-white transition-colors"
            >
              <Share className="w-5 h-5" />
              {isSharing ? 'Sharing...' : 'Share My Stats'}
            </button>

            <button
              onClick={handleShareToChannel}
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-3 rounded-lg font-bold text-white transition-colors"
            >
              <Send className="w-5 h-5" />
              Share to Channel
            </button>
          </div>

          <div className="text-xs text-white/60 text-center">
            <Bell className="w-4 h-4 inline mr-1" />
            You'll receive notifications for level ups and milestones
          </div>
        </div>
      ) : (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-white/60" />
          </div>
          <p className="text-white/60 mb-4">
            Open this game through Telegram to enable sharing and notifications!
          </p>
          <div className="text-xs text-white/40">
            Features: Share stats, level notifications, milestone alerts
          </div>
        </div>
      )}
    </div>
  );
};

export default TelegramIntegration;