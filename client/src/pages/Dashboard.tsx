import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import TimeTracker from '@/components/TimeTracker';
import GoalProgress from '@/components/GoalProgress';
import SiteStats from '@/components/SiteStats';
import { getGoals, getSiteTime } from '@/lib/storage';
import { Goal, SiteTimeData } from '@/lib/types';

export default function Dashboard() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [siteTime, setSiteTime] = useState<SiteTimeData>({});
  
  useEffect(() => {
    const loadData = async () => {
      const [goalsData, timeData] = await Promise.all([
        getGoals(),
        getSiteTime()
      ]);
      setGoals(goalsData);
      setSiteTime(timeData);
    };
    
    loadData();
    const interval = setInterval(loadData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const totalTime = Object.values(siteTime).reduce((a, b) => a + b, 0);
  const totalTimeHours = Math.round(totalTime / 3600000 * 10) / 10;

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Daily Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <TimeTracker totalTimeHours={totalTimeHours} />
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Goals Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <GoalProgress goals={goals} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Site Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <SiteStats siteTime={siteTime} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
