import { GlassCard } from './components/GlassCard';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
      {/* Soft colored blobs in background */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-[120px] animate-pulse" 
           style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-violet-500/30 rounded-full blur-[120px] animate-pulse" 
           style={{ animationDuration: '10s', animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse" 
           style={{ animationDuration: '12s', animationDelay: '2s' }} />
      
      {/* Glass Card Component */}
      <GlassCard />
    </div>
  );
}
