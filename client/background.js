let activeTabId = null;
let startTime = null;
const timeData = {};

// Track active tab changes
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const { tabId } = activeInfo;
  const tab = await chrome.tabs.get(tabId);
  
  if (startTime && activeTabId) {
    // Save time for previous tab
    const domain = new URL(tab.url).hostname;
    const duration = Date.now() - startTime;
    await updateTimeData(domain, duration);
  }
  
  activeTabId = tabId;
  startTime = Date.now();
});

// Track URL changes in active tab
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tabId === activeTabId && changeInfo.url) {
    if (startTime) {
      const domain = new URL(tab.url).hostname;
      const duration = Date.now() - startTime;
      await updateTimeData(domain, duration);
    }
    startTime = Date.now();
  }
});

async function updateTimeData(domain, duration) {
  const data = await chrome.storage.local.get('siteTime');
  const siteTime = data.siteTime || {};
  
  if (!siteTime[domain]) {
    siteTime[domain] = 0;
  }
  siteTime[domain] += duration;
  
  await chrome.storage.local.set({ siteTime });
}

// Reset daily stats at midnight
function scheduleDailyReset() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const timeToReset = tomorrow.getTime() - now.getTime();
  
  setTimeout(async () => {
    await chrome.storage.local.set({ siteTime: {} });
    scheduleDailyReset();
  }, timeToReset);
}

scheduleDailyReset();
