export interface Goal {
  id: string;
  title: string;
  targetHours: number;
  currentHours: number;
  category: string;
}

export interface SiteTimeData {
  [domain: string]: number;
}

export interface Settings {
  workingHours: {
    start: string;
    end: string;
  };
  productiveSites: string[];
  distractingSites: string[];
}
