/// <reference types="chrome"/>
import { Goal, Settings, SiteTimeData } from './types';

// Development mode storage fallback
const devStorage = new Map<string, any>();

// Helper to handle Chrome storage operations with development fallback
async function chromeStorageOperation<T>(
  operation: () => Promise<T>,
  errorMessage: string
): Promise<T> {
  try {
    // Check if we're in development environment
    if (typeof chrome === 'undefined' || !chrome.storage) {
      console.warn('Chrome APIs not available, using development storage');
      return await operation();
    }
    return await operation();
  } catch (error) {
    console.error(`Chrome Storage Error - ${errorMessage}:`, error);
    throw new Error(`Failed to ${errorMessage}`);
  }
}

// Mock storage for development
const mockChromeStorage = {
  get: async (key: string) => {
    return { [key]: devStorage.get(key) };
  },
  set: async (data: Record<string, any>) => {
    Object.entries(data).forEach(([key, value]) => {
      devStorage.set(key, value);
    });
  }
};

// Get the appropriate storage implementation
const storage = typeof chrome !== 'undefined' && chrome.storage 
  ? chrome.storage.local 
  : mockChromeStorage;

export async function getSiteTime(): Promise<SiteTimeData> {
  return chromeStorageOperation(
    async () => {
      const data = await storage.get('siteTime');
      return data.siteTime || {};
    },
    'fetch site time data'
  );
}

export async function getGoals(): Promise<Goal[]> {
  return chromeStorageOperation(
    async () => {
      const data = await storage.get('goals');
      return data.goals || [];
    },
    'fetch goals'
  );
}

export async function saveGoal(goal: Goal): Promise<void> {
  return chromeStorageOperation(
    async () => {
      const goals = await getGoals();
      const existingIndex = goals.findIndex(g => g.id === goal.id);

      if (existingIndex >= 0) {
        goals[existingIndex] = goal;
      } else {
        goals.push(goal);
      }

      await storage.set({ goals });
    },
    'save goal'
  );
}

export async function deleteGoal(id: string): Promise<void> {
  return chromeStorageOperation(
    async () => {
      const goals = await getGoals();
      await storage.set({
        goals: goals.filter(g => g.id !== id)
      });
    },
    'delete goal'
  );
}

export async function getSettings(): Promise<Settings> {
  return chromeStorageOperation(
    async () => {
      const data = await storage.get('settings');
      return data.settings || {
        workingHours: { start: '09:00', end: '17:00' },
        productiveSites: [],
        distractingSites: []
      };
    },
    'fetch settings'
  );
}

export async function saveSettings(settings: Settings): Promise<void> {
  return chromeStorageOperation(
    async () => {
      await storage.set({ settings });
    },
    'save settings'
  );
}