import { Switch, Route, useLocation } from "wouter";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/pages/Dashboard";
import Goals from "@/pages/Goals";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function Navigation() {
  const [location, setLocation] = useLocation();

  return (
    <Tabs value={location} className="w-full" onValueChange={setLocation}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="/">Dashboard</TabsTrigger>
        <TabsTrigger value="/goals">Goals</TabsTrigger>
        <TabsTrigger value="/settings">Settings</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

function Router() {
  return (
    <div className="w-[400px] h-[600px] overflow-auto">
      <Navigation />
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/goals" component={Goals} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;