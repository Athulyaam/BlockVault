import { useState, useEffect } from "react";
import { Dashboard } from "@/components/Dashboard";
import FrontIntro from "@/components/FrontIntro";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleTransition = () => {
    setIsTransitioning(true);
    
    // Start dashboard fade-in after intro starts fading out
    setTimeout(() => {
      setShowDashboard(true);
    }, 400);
    
    // Complete transition
    setTimeout(() => {
      setShowIntro(false);
      setIsTransitioning(false);
    }, 1200);
  };

  return (
    <div className="relative w-full h-full">
      {/* Intro Layer */}
      {showIntro && (
        <div className={`relative z-50 ${
          isTransitioning ? 'transition-opacity duration-1000 opacity-0' : 'opacity-100'
        }`}>
          <FrontIntro onTransition={handleTransition} />
        </div>
      )}
      
      {/* Dashboard Layer */}
      <div 
        data-main-content 
        className={`${
          showDashboard 
            ? 'opacity-100 transition-opacity duration-1000 delay-200' 
            : 'opacity-0'
        } ${
          showIntro && !isTransitioning ? 'absolute inset-0 -z-10' : 'relative z-10'
        }`}
      >
        <Dashboard />
      </div>
    </div>
  );
};

export default Index;
