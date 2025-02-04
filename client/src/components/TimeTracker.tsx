import { Clock } from 'lucide-react';

interface TimeTrackerProps {
  totalTimeHours: number;
}

export default function TimeTracker({ totalTimeHours }: TimeTrackerProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Clock className="w-8 h-8 text-primary" />
        <div>
          <h3 className="text-2xl font-bold">{totalTimeHours}h</h3>
          <p className="text-sm text-muted-foreground">Total Time Today</p>
        </div>
      </div>
    </div>
  );
}
