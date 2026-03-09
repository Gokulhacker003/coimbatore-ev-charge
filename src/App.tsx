import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StationProvider } from "@/context/StationContext";
import { BookingProvider } from "@/context/BookingContext";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Chatbot from "@/components/Chatbot";
import Home from "@/pages/Home";
import MapPage from "@/pages/MapPage";
import Bookings from "@/pages/Bookings";
import Admin from "@/pages/Admin";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <StationProvider>
        <BookingProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNav />
            <Chatbot />
          </BrowserRouter>
        </BookingProvider>
      </StationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
