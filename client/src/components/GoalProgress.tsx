import { Progress } from '@/components/ui/progress';
import { Goal } from '@/lib/types';

interface GoalProgressProps {
  goals: Goal[];
}

export default function GoalProgress({ goals }: GoalProgressProps) {
  return (
    <div className="space-y-4">
      {goals.map(goal => {
        const progress = (goal.currentHours / goal.targetHours) * 100;
        
        return (
          <div key={goal.id} className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">{goal.title}</span>
              <span className="text-sm text-muted-foreground">
                {goal.currentHours}h / {goal.targetHours}h
              </span>
            </div>
            <Progress value={progress} />
          </div>
        );
      })}
      
      {goals.length === 0 && (
        <p className="text-center text-muted-foreground">
          No goals set. Add some goals to track your progress!
        </p>
      )}
    </div>
  );
}
