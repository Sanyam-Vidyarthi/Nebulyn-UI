import { motion, AnimatePresence } from "motion/react";
import { Home, User, Heart, Video, Settings } from "lucide-react";
import { useState } from "react";

export default function ComponentPreview({ component }) {
    const [activeItem, setActiveItem] = useState("home");
    const [hoveredItem, setHoveredItem] = useState(null);

    if (!component) return null;

    switch (component.title) {
        case "Liquid Glass Card":
            return (
                <div className="min-h-[300px] w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 rounded-lg">
                    <div className="relative group perspective-1000">
                        {/* Main glass card */}
                        <div
                            className="relative w-[340px] h-[220px] rounded-3xl p-8 
                                       bg-white/[0.08] backdrop-blur-xl
                                       border border-white/[0.15]
                                       shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
                                       transition-all duration-500
                                       group-hover:bg-white/[0.12] group-hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.4)]
                                       group-hover:scale-[1.02]"
                        >
                            {/* Inner subtle glow */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.1] to-transparent opacity-50" />

                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <h3 className="text-white text-xl font-semibold mb-2">Liquid Glass</h3>
                                    <p className="text-gray-300 text-sm">Premium frosted glass effect with depth and interactivity.</p>
                                </div>

                                {/* Bottom accent line */}
                                <div className="flex items-center gap-2">
                                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                    <span className="text-xs text-white/50 font-mono">01</span>
                                </div>
                            </div>
                        </div>

                        {/* Outer glow effect (very subtle) */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 to-violet-500/5 blur-xl -z-10 
                                        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                </div>
            );

        case "Neon Button":
            return (
                <div className="min-h-[300px] w-full bg-slate-900 flex items-center justify-center p-8 rounded-lg">
                    <button className="group relative px-12 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white transition-all duration-300 hover:scale-105 overflow-visible">
                        {/* Neon glow effect */}
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

                        {/* Button content */}
                        <span className="relative z-10 flex items-center gap-2 tracking-wide">
                            GET STARTED
                            <span className="text-xl">&gt;</span>
                        </span>
                    </button>
                </div>
            );

        case "Animated Navbar": {
            const navItems = [
                { id: "home", icon: Home, label: "Home" },
                { id: "profile", icon: User, label: "Profile" },
                { id: "favorites", icon: Heart, label: "Favorites" },
                { id: "videos", icon: Video, label: "Videos" },
                { id: "settings", icon: Settings, label: "Settings" },
            ];

            return (
                <div className="p-8 flex items-center justify-center bg-gray-100 min-h-[200px] w-full rounded-lg overflow-hidden">
                    <motion.nav
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="bg-gradient-to-r from-violet-100 via-purple-100 to-violet-100 rounded-full shadow-lg px-6 py-4"
                    >
                        <div className="flex items-center gap-6">
                            {navItems.map((item, index) => {
                                const Icon = item.icon;
                                const isActive = activeItem === item.id;
                                const isHovered = hoveredItem === item.id;

                                return (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.08, duration: 0.3 }}
                                        onClick={() => setActiveItem(item.id)}
                                        onMouseEnter={() => setHoveredItem(item.id)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        className="relative"
                                    >
                                        <motion.div
                                            whileHover={{ y: -4 }}
                                            whileTap={{ scale: 0.9 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        >
                                            <Icon
                                                className={`w-7 h-7 transition-colors duration-300 ${isActive
                                                    ? "text-violet-600"
                                                    : isHovered
                                                        ? "text-violet-500"
                                                        : "text-violet-400"
                                                    }`}
                                                strokeWidth={isActive ? 2.5 : 2}
                                            />
                                        </motion.div>

                                        {/* Active Indicator Dot */}
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeDot"
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0 }}
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-violet-600 rounded-full"
                                                />
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.nav>
                </div>
            );
        }

        default:
            return (
                <div className="p-8 flex items-center justify-center bg-gray-900 min-h-[200px] w-full rounded-lg border border-white/10">
                    <div className="text-center text-gray-400">
                        <div className="text-4xl mb-2">✨</div>
                        <p>Preview coming soon</p>
                    </div>
                </div>
            );
    }
}
