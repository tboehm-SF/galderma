// Premium Panel Components for ASPIRE Rewards
// High-end medical aesthetic with animated counters and morphing effects

const PremiumCounter = ({ value, suffix = "", duration = 1500 }: { value: number; suffix?: string; duration?: number }) => {
  const count = useCounter(value, duration);
  return (
    <span className="font-display">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const HowToEarnPanel = () => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(true);
  }, []);

  return (
    <div className="space-y-8">
      {/* Premium Hero with Sophisticated Typography */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 shadow-2xl">
        {/* Ambient Glow Effects */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative z-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-xl">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium tracking-wider text-white/90">REWARDS PROGRAM</span>
          </div>

          <h1 className="mb-4 font-display text-5xl font-light tracking-tight text-white">
            How to <span className="font-semibold">Earn Points</span>
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-white/70">
            Every qualifying treatment automatically earns valuable points toward exclusive rewards.
            Our premium loyalty program recognizes your commitment to aesthetic excellence.
          </p>
        </div>
      </div>

      {/* Premium Treatment Cards with Glass Morphism */}
      <div className="space-y-4">
        {[
          { icon: "💉", name: "Dysport®", desc: "Injectable neurotoxin", points: 50, color: "from-blue-500/20 to-cyan-500/20" },
          { icon: "💎", name: "Restylane® Family", desc: "Hyaluronic acid fillers", points: 75, color: "from-purple-500/20 to-pink-500/20" },
          { icon: "✨", name: "Sculptra® Aesthetic", desc: "Collagen stimulator", points: 100, color: "from-amber-500/20 to-orange-500/20" }
        ].map((treatment, i) => (
          <div
            key={treatment.name}
            className={`group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-2xl border border-white/20 p-6 shadow-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
              revealed ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            {/* Gradient Overlay on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${treatment.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

            <div className="relative z-10 flex items-start gap-5">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <span className="text-3xl">{treatment.icon}</span>
              </div>

              <div className="flex-1">
                <h3 className="mb-1 font-display text-2xl font-semibold text-slate-900">
                  {treatment.name}
                </h3>
                <p className="mb-4 text-sm text-slate-600">{treatment.desc}</p>

                <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-4 py-2 backdrop-blur-sm transition-colors duration-300 group-hover:bg-slate-900/10">
                  <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-display text-sm font-semibold text-slate-700">
                    <PremiumCounter value={treatment.points} /> points
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Premium Feature Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-white p-8 shadow-xl border border-slate-200/50">
        <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-500/5 blur-2xl" />

        <div className="relative flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-slate-900 shadow-lg">
            <span className="text-2xl">🎯</span>
          </div>

          <div>
            <h4 className="mb-2 font-display text-xl font-semibold text-slate-900">
              Automatic Credit System
            </h4>
            <p className="text-sm leading-relaxed text-slate-600">
              Points are automatically credited within 24-48 hours post-treatment.
              Our secure platform ensures seamless tracking with no manual entry required.
            </p>
          </div>
        </div>
      </div>

      {/* Animated Progress Bar */}
      <div className="relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-xl p-6 shadow-lg border border-white/20">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-medium tracking-wider text-slate-500">CURRENT PROGRESS</p>
            <p className="font-display text-3xl font-semibold text-slate-900">
              <PremiumCounter value={250} /> / 500
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Next tier</p>
            <p className="font-display text-lg font-semibold text-emerald-600">
              <PremiumCounter value={250} /> points away
            </p>
          </div>
        </div>

        <div className="relative h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg transition-all duration-1000 ease-out"
            style={{ width: revealed ? '50%' : '0%' }}
          >
            <div className="absolute inset-0 animate-pulse bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
};
