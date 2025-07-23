import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-context";
import Home from "@/pages/home";
import WhatsNew from "@/pages/whats-new";
import About from "@/pages/about";
import Resources from "@/pages/resources";
import Updates from "@/pages/updates";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/whats-new" component={WhatsNew} />
      <Route path="/activities" component={WhatsNew} />
      <Route path="/about" component={About} />
      <Route path="/about/:section" component={About} />
      <Route path="/resources" component={Resources} />
      <Route path="/resources/:section" component={Resources} />
      <Route path="/updates" component={Updates} />
      <Route path="/updates/:section" component={Updates} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="sjnhs-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
