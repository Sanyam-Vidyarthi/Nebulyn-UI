import { Sparkles } from 'lucide-react';

export function GlassCard() {
  return (
    <div className="relative group">
      {/* Main glass card */}
      <div 
        className="relative w-[400px] h-[240px] rounded-3xl p-8 
                   bg-white/[0.08] backdrop-blur-xl
                   border border-white/[0.15]
                   shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
                   transition-all duration-500
                   hover:bg-white/[0.12] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.4)]
                   hover:scale-[1.02]"
      >
        {/* Inner subtle glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.1] to-transparent opacity-50" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          {/* Bottom accent line */}
          <div className="flex items-center gap-2">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>
      </div>
      
      {/* Outer glow effect (very subtle) */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 to-violet-500/5 blur-xl -z-10 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}