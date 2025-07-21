import React from 'react';
import CoinTapper from '../components/CoinTapper';
import UpgradeCard from '../components/UpgradeCard';
import StatsPanel from '../components/StatsPanel';
import { Trophy } from 'lucide-react';

interface TapPageProps {
  coins: number;
  totalEarned: number;
  onTap: () => void;
}

const TapPage: React.FC<TapPageProps> = ({
  coins,
  totalEarned,
  onTap
}) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <CoinTapper 
        coins={coins} 
        totalEarned={totalEarned}
        onTap={onTap} 
      />
    </div>
  );
};

export default TapPage;