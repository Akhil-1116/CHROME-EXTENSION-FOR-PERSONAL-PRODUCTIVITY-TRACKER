import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getSettings, saveSettings } from '@/lib/storage';
import { Settings as SettingsType } from '@/lib/types';

export default function Settings() {
  const [settings, setSettings] = useState<SettingsType>({
    workingHours: { start: '09:00', end: '17:00' },
    productiveSites: [],
    distractingSites: []
  });
  
  const { toast } = useToast();

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveSettings(settings);
    toast({
      title: 'Success',
      description: 'Settings saved successfully'
    });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Working Hours</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="time"
                  value={settings.workingHours.start}
                  onChange={e => setSettings({
                    ...settings,
                    workingHours: { ...settings.workingHours, start: e.target.value }
                  })}
                />
                <Input
                  type="time"
                  value={settings.workingHours.end}
                  onChange={e => setSettings({
                    ...settings,
                    workingHours: { ...settings.workingHours, end: e.target.value }
                  })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Productive Sites</h3>
              <Input
                placeholder="Add comma-separated domains"
                value={settings.productiveSites.join(', ')}
                onChange={e => setSettings({
                  ...settings,
                  productiveSites: e.target.value.split(',').map(s => s.trim())
                })}
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Distracting Sites</h3>
              <Input
                placeholder="Add comma-separated domains"
                value={settings.distractingSites.join(', ')}
                onChange={e => setSettings({
                  ...settings,
                  distractingSites: e.target.value.split(',').map(s => s.trim())
                })}
              />
            </div>

            <Button type="submit" className="w-full">
              Save Settings
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
