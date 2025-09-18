import { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

export default function FrontIntro({ onTransition }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const globeEl = useRef();

  // Auto-rotate globe
  useEffect(() => {
    if (globeEl.current) {
      // Auto-rotate
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  // Generate random points for the globe network effect
  const generateGlobePoints = () => {
    const points = [];
    for (let i = 0; i < 50; i++) {
      points.push({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        size: Math.random() * 0.8 + 0.2,
        color: ['#3b82f6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 3)]
      });
    }
    return points;
  };

  const [globePoints] = useState(generateGlobePoints);

  const handleGlobeClick = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Trigger transition immediately
    if (onTransition) {
      onTransition();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black"
      style={{ cursor: 'pointer' }}
      onClick={handleGlobeClick}
    >
      {/* Background Stars Effect */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
      </div>

      {/* Globe Container */}
      <div className="relative w-full h-full">
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pointsData={globePoints}
          pointAltitude={0.01}
          pointRadius={(d) => d.size}
          pointColor={(d) => d.color}
          pointLabel={() => ''}
          atmosphereColor="#3b82f6"
          atmosphereAltitude={0.15}
          enablePointerInteraction={false}
          width={typeof window !== 'undefined' ? window.innerWidth : 800}
          height={typeof window !== 'undefined' ? window.innerHeight : 600}
          showAtmosphere={true}
        />
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
          <div className="text-center mb-8 px-4">
            {/* Logo/Brand */}
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
                </svg>
              </div>
            </div>
            
            {/* Main Text with stronger contrast */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
              BlockVault
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              A decentralized storage network designed to secure your organization's most important information
            </p>
            
            {/* Navigation Pills with better visibility */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/20">
                Store Your Data
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/20">
                Provide Storage
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/20">
                Build on BlockVault
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/20">
                Explore Network
              </div>
            </div>
          </div>
          
          {/* Click Instruction with better visibility */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center">
            <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full mb-4">
              <div className="text-white text-lg font-medium animate-pulse">
                Click anywhere to explore your vault
              </div>
            </div>
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white/80 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  