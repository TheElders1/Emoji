import React, { useState } from 'react';
import { CheckCircle, Users, MessageCircle, Twitter, Youtube, ExternalLink, Gift } from 'lucide-react';
import { Task } from '../types/game';
import youtubeService from '../services/youtubeService';

interface TasksPageProps {
  referrals: number;
  completedTasks: string[];
  onCompleteTask: (taskId: string, reward: number) => void;
}

const TasksPage: React.FC<TasksPageProps> = ({ referrals, completedTasks, onCompleteTask }) => {
  const [youtubeVideos, setYoutubeVideos] = useState<any>({ emojikombat: [], memers: [] });
  const [loadingVideos, setLoadingVideos] = useState(false);

  React.useEffect(() => {
    loadYouTubeVideos();
  }, []);

  const loadYouTubeVideos = async () => {
    setLoadingVideos(true);
    try {
      const videos = await youtubeService.getLatestVideos();
      setYoutubeVideos(videos);
    } catch (error) {
      console.error('Failed to load YouTube videos:', error);
    } finally {
      setLoadingVideos(false);
    }
  };

  const [tasks] = useState<Task[]>([
    // Referral Tasks
    {
      id: 'referral_1',
      title: 'Invite 1 Friend',
      description: 'Invite your first friend to join Emoji Kombat',
      reward: 1000,
      type: 'referral',
      requirement: 1,
      completed: referrals >= 1 || completedTasks.includes('referral_1')
    },
    {
      id: 'referral_5',
      title: 'Invite 5 Friends',
      description: 'Build your network with 5 referrals',
      reward: 5000,
      type: 'referral',
      requirement: 5,
      completed: referrals >= 5 || completedTasks.includes('referral_5')
    },
    {
      id: 'referral_10',
      title: 'Invite 10 Friends',
      description: 'Reach 10 referrals milestone',
      reward: 15000,
      type: 'referral',
      requirement: 10,
      completed: referrals >= 10 || completedTasks.includes('referral_10')
    },
    {
      id: 'referral_15',
      title: 'Invite 15 Friends',
      description: 'Expand your circle to 15 friends',
      reward: 25000,
      type: 'referral',
      requirement: 15,
      completed: referrals >= 15 || completedTasks.includes('referral_15')
    },
    {
      id: 'referral_25',
      title: 'Invite 25 Friends',
      description: 'Build a strong community of 25 referrals',
      reward: 50000,
      type: 'referral',
      requirement: 25,
      completed: referrals >= 25 || completedTasks.includes('referral_25')
    },
    {
      id: 'referral_35',
      title: 'Invite 35 Friends',
      description: 'Become a super influencer with 35 referrals',
      reward: 75000,
      type: 'referral',
      requirement: 35,
      completed: referrals >= 35 || completedTasks.includes('referral_35')
    },
    {
      id: 'referral_50',
      title: 'Invite 50 Friends',
      description: 'Ultimate referrer - 50 friends milestone',
      reward: 150000,
      type: 'referral',
      requirement: 50,
      completed: referrals >= 50 || completedTasks.includes('referral_50')
    },
    // Social Tasks
    {
      id: 'join_channel',
      title: 'Join Telegram Channel',
      description: 'Join our official Telegram channel for updates',
      reward: 2500,
      type: 'social',
      link: 'https://t.me/emoji_kombat_channel',
      completed: completedTasks.includes('join_channel')
    },
    {
      id: 'join_group',
      title: 'Join Telegram Group',
      description: 'Join our community group and chat with other players',
      reward: 2500,
      type: 'social',
      link: 'https://t.me/emoji_kombat_community',
      completed: completedTasks.includes('join_group')
    },
    {
      id: 'follow_twitter',
      title: 'Follow on Twitter',
      description: 'Follow us on Twitter for the latest news',
      reward: 3000,
      type: 'social',
      link: '#', // Will be provided later
      completed: completedTasks.includes('follow_twitter')
    },
    {
      id: 'subscribe_youtube',
      title: 'Subscribe to YouTube',
      description: 'Subscribe to our YouTube channel',
      reward: 3500,
      type: 'social',
      link: 'https://youtube.com/@emojikombat?si=EJ5HBP3n7fqmFzyS',
      completed: completedTasks.includes('subscribe_youtube')
    },
    {
      id: 'subscribe_memers',
      title: 'Subscribe to Memers Channel',
      description: 'Subscribe to our Memers emoji channel',
      reward: 3500,
      type: 'social',
      link: 'https://youtube.com/@memersemoji?si=PoSzhBW1zK61r6aw',
      completed: completedTasks.includes('subscribe_memers')
    }
  ]);

  const handleTaskClick = (task: Task) => {
    if (task.completed) return;

    if (task.type === 'social' && task.link && task.link !== '#') {
      window.open(task.link, '_blank');
      // Auto-complete social tasks after opening link
      setTimeout(() => {
        onCompleteTask(task.id, task.reward);
      }, 2000);
    } else if (task.type === 'referral' && referrals >= (task.requirement || 0)) {
      onCompleteTask(task.id, task.reward);
    }
  };

  const getTaskIcon = (task: Task) => {
    if (task.type === 'referral') return <Users className="w-6 h-6" />;
    if (task.id === 'join_channel' || task.id === 'join_group') return <MessageCircle className="w-6 h-6" />;
    if (task.id === 'follow_twitter') return <Twitter className="w-6 h-6" />;
    if (task.id === 'subscribe_youtube') return <Youtube className="w-6 h-6" />;
    return <Gift className="w-6 h-6" />;
  };

  const canCompleteTask = (task: Task) => {
    if (task.completed) return false;
    if (task.type === 'referral') return referrals >= (task.requirement || 0);
    return task.type === 'social';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const referralTasks = tasks.filter(task => task.type === 'referral');
  const socialTasks = tasks.filter(task => task.type === 'social');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <Gift className="w-8 h-8 text-yellow-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">Tasks & Rewards</h1>
            <p className="text-white/60">Complete tasks to earn bonus coins!</p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-white/60">Your Referrals:</span>
            <span className="text-2xl font-bold text-yellow-400">{referrals}</span>
          </div>
        </div>
      </div>

      {/* Referral Tasks */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-400" />
          Referral Tasks
        </h2>
        
        <div className="space-y-3">
          {referralTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleTaskClick(task)}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                task.completed
                  ? 'bg-green-500/20 border-green-500/30'
                  : canCompleteTask(task)
                  ? 'bg-white/10 border-white/20 hover:bg-white/20 cursor-pointer'
                  : 'bg-white/5 border-white/10 opacity-60'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  task.completed ? 'bg-green-500' : 'bg-blue-500'
                }`}>
                  {task.completed ? <CheckCircle className="w-6 h-6" /> : getTaskIcon(task)}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-white">{task.title}</h3>
                  <p className="text-sm text-white/60">{task.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-yellow-400 font-bold">+{formatNumber(task.reward)} coins</span>
                    {task.requirement && (
                      <span className="text-xs text-white/40">
                        Progress: {Math.min(referrals, task.requirement)}/{task.requirement}
                      </span>
                    )}
                  </div>
                </div>
                
                {task.completed && (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Tasks */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-purple-400" />
          Social Tasks
        </h2>
        
        <div className="space-y-3">
          {socialTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleTaskClick(task)}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                task.completed
                  ? 'bg-green-500/20 border-green-500/30'
                  : 'bg-white/10 border-white/20 hover:bg-white/20 cursor-pointer'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  task.completed ? 'bg-green-500' : 'bg-purple-500'
                }`}>
                  {task.completed ? <CheckCircle className="w-6 h-6" /> : getTaskIcon(task)}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-white">{task.title}</h3>
                  <p className="text-sm text-white/60">{task.description}</p>
                  <span className="text-yellow-400 font-bold">+{formatNumber(task.reward)} coins</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {task.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <ExternalLink className="w-5 h-5 text-white/60" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* YouTube Videos Section */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Youtube className="w-6 h-6 text-red-400" />
          Watch & Earn
        </h2>
        
        {loadingVideos ? (
          <div className="text-center text-white/60">Loading latest videos...</div>
        ) : (
          <div className="space-y-6">
            {/* Emoji Kombat Videos */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Emoji Kombat Channel</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {youtubeVideos.emojikombat.map((video: any) => (
                  <div
                    key={video.id}
                    onClick={() => {
                      window.open(video.url, '_blank');
                      onCompleteTask(`watch_${video.id}`, video.reward);
                    }}
                    className="bg-white/10 rounded-lg p-3 hover:bg-white/20 cursor-pointer transition-all duration-200"
                  >
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <h4 className="text-white font-bold text-sm mb-1">{video.title}</h4>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/60">{video.duration}</span>
                      <span className="text-yellow-400 font-bold">+{video.reward}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Memers Videos */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Memers Channel</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {youtubeVideos.memers.map((video: any) => (
                  <div
                    key={video.id}
                    onClick={() => {
                      window.open(video.url, '_blank');
                      onCompleteTask(`watch_${video.id}`, video.reward);
                    }}
                    className="bg-white/10 rounded-lg p-3 hover:bg-white/20 cursor-pointer transition-all duration-200"
                  >
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <h4 className="text-white font-bold text-sm mb-1">{video.title}</h4>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/60">{video.duration}</span>
                      <span className="text-yellow-400 font-bold">+{video.reward}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;