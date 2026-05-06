import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import { optimizeRoute } from './services/api';
import { Settings, Play, RefreshCw, Trash2, Info, Map as MapIcon, Clock, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const App = () => {
  const [school, setSchool] = useState({ name: 'Central High', lat: 12.9716, lng: 77.5946 });
  const [houses, setHouses] = useState([]);
  const [optimizedPath, setOptimizedPath] = useState([]);
  const [stats, setStats] = useState(null);
  const [algorithm, setAlgorithm] = useState('GREEDY');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMapClick = (latlng) => {
    if (isAnimating) return;
    const newHouse = {
      name: `Student House ${houses.length + 1}`,
      lat: latlng.lat,
      lng: latlng.lng
    };
    setHouses([...houses, newHouse]);
    setOptimizedPath([]);
  };

  const handleOptimize = async () => {
    if (houses.length === 0) return;
    setIsLoading(true);
    try {
      const data = await optimizeRoute(school, houses, algorithm);
      setOptimizedPath(data.path);
      setStats(data);
      setIsAnimating(true);
    } catch (err) {
      alert("Backend error. Make sure Spring Boot is running!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setHouses([]);
    setOptimizedPath([]);
    setStats(null);
    setIsAnimating(false);
  };

  const onAnimationComplete = () => {
    setIsAnimating(false);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#10b981', '#f59e0b']
    });
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -300 }} 
        animate={{ x: 0 }}
        className="w-80 h-full bg-slate-900 border-r border-slate-800 p-6 flex flex-col shadow-2xl z-20"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-900/20">
            <Navigation className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">SmartBus <span className="text-blue-500">TSP</span></h1>
        </div>

        <div className="space-y-6 flex-1">
          <section>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">Algorithm</label>
            <div className="grid grid-cols-1 gap-2">
              {['GREEDY', 'DP', 'BRUTE'].map(algo => (
                <button
                  key={algo}
                  onClick={() => setAlgorithm(algo)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                    algorithm === algo 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {algo === 'GREEDY' ? 'Nearest Neighbor' : algo === 'DP' ? 'Held-Karp (Exact)' : 'Brute Force'}
                  {algorithm === algo && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-2 italic px-1">
              {algorithm === 'GREEDY' ? 'Fast & Efficient. Good for many stops.' : 
               algorithm === 'DP' ? 'Optimal result. Slower for 15+ stops.' : 
               'Checks all paths. Very slow for 10+ stops.'}
            </p>
          </section>

          <section>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">Route Control</label>
            <div className="space-y-3">
              <button 
                onClick={handleOptimize}
                disabled={houses.length === 0 || isLoading || isAnimating}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 group"
              >
                {isLoading ? <RefreshCw className="animate-spin" size={20} /> : <Play size={20} className="group-hover:translate-x-1 transition-transform" />}
                {isAnimating ? 'Bus In Motion...' : 'Optimize Route'}
              </button>

              <button 
                onClick={() => {
                  const randomHouses = Array.from({ length: 10 }, (_, i) => ({
                    name: `Student House ${i + 1}`,
                    lat: school.lat + (Math.random() - 0.5) * 0.02,
                    lng: school.lng + (Math.random() - 0.5) * 0.02
                  }));
                  setHouses(randomHouses);
                  setOptimizedPath([]);
                  setStats(null);
                }}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 border border-slate-700"
              >
                <RefreshCw size={18} />
                Generate Random Stops
              </button>
              
              <button 
                onClick={handleClear}
                className="w-full bg-slate-800 hover:bg-red-900/30 hover:text-red-400 text-slate-400 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={18} />
                Clear All Stops
              </button>
            </div>
          </section>

          {stats && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 space-y-4"
            >
              <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2">
                <Info size={16} /> Route Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-xs text-slate-500 flex items-center gap-1"><MapIcon size={12} /> Distance</div>
                  <div className="text-lg font-bold">{stats.totalDistance} km</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-500 flex items-center gap-1"><Clock size={12} /> Est. Time</div>
                  <div className="text-lg font-bold">{stats.estimatedTime} min</div>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-700/50">
                <div className="text-xs text-slate-500">Stops Covered</div>
                <div className="text-sm font-medium mt-1">{houses.length} Houses + 1 School</div>
              </div>
            </motion.section>
          )}
        </div>

        <div className="mt-auto pt-6 text-[10px] text-slate-600 text-center border-t border-slate-800/50">
          Built for Future Mobility • TSP Routing Engine v1.0
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="flex-1 relative p-4 bg-slate-950">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 flex gap-4 pointer-events-none">
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-full border border-slate-800 shadow-2xl flex items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
              <span className="text-xs font-bold text-slate-300">SCHOOL</span>
            </div>
            <div className="w-px h-4 bg-slate-700" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-violet-500 shadow-[0_0_8px_#8b5cf6]" />
              <span className="text-xs font-bold text-slate-300">STUDENTS: {houses.length}</span>
            </div>
          </motion.div>
        </div>

        <div className="w-full h-full rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-800/50">
          <MapComponent 
            school={school} 
            houses={houses} 
            optimizedPath={optimizedPath} 
            isAnimating={isAnimating}
            onMapClick={handleMapClick}
            onAnimationComplete={onAnimationComplete}
          />
        </div>

        {/* Floating Help/Prompt */}
        <AnimatePresence>
          {houses.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-2xl z-10 font-bold pointer-events-none"
            >
              Click on the map to add student houses 📍
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
