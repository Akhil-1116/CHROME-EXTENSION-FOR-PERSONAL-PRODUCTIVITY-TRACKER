import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { saveGoal, deleteGoal } from '@/lib/storage';
import { Goal } from '@/lib/types';

export default function Goals() {
  const [title, setTitle] = useState('');
  const [targetHours, setTargetHours] = useState('');
  const [category, setCategory] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !targetHours || !category) {
      toast({
        title: 'Error',
        description: 'Please fill all fields',
        variant: 'destructive'
      });
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      title,
      targetHours: parseFloat(targetHours),
      currentHours: 0,
      category
    };

    await saveGoal(goal);
    
    setTitle('');
    setTargetHours('');
    setCategory('');
    
    toast({
      title: 'Success',
      description: 'Goal saved successfully'
    });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Goal Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Target Hours"
                min="0"
                step="0.5"
                value={targetHours}
                onChange={e => setTargetHours(e.target.value)}
              />
            </div>
            <div>
              <Input
                placeholder="Category"
                value={category}
                onChange={e => setCategory(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
