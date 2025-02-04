import { SiteTimeData } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SiteStatsProps {
  siteTime: SiteTimeData;
}

export default function SiteStats({ siteTime }: SiteStatsProps) {
  const sortedSites = Object.entries(siteTime)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {sortedSites.map(([domain, time]) => {
          const hours = Math.round(time / 3600000 * 10) / 10;
          
          return (
            <div key={domain} className="flex justify-between items-center">
              <span className="font-medium truncate">{domain}</span>
              <span className="text-sm text-muted-foreground ml-2">
                {hours}h
              </span>
            </div>
          );
        })}
        
        {sortedSites.length === 0 && (
          <p className="text-center text-muted-foreground">
            No activity tracked yet
          </p>
        )}
      </div>
    </ScrollArea>
  );
}
