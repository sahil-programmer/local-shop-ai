import React, { useState, useEffect, useRef } from "react";
import robotIcon from "../assets/inspiration_5371028.png";
import robiImage from "../assets/3d_Project-removebg-preview.png";

// ============================================
// 📊 STAT COUNTER COMPONENT WITH MEDIUM SPEED
// ============================================
interface StatCounterProps {
  end: number;
  duration?: number;
  label: string;
  color: string;
  isVisible: boolean;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const StatCounter: React.FC<StatCounterProps> = ({
  end,
  duration = 3000, // Changed to 3 seconds (medium speed)
  label,
  color,
  isVisible,
  prefix = "",
  suffix = "",
  decimals = 0,
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    setHasAnimated(true);
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Smooth easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (end - startValue) * easeOutQuart;

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration, hasAnimated]);

  const formatNumber = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return Math.floor(num).toLocaleString("en-IN");
  };

  return (
    <div>
      <div className={`text-3xl font-bold ${color}`}>
        {prefix}
        {formatNumber(count)}
        {suffix}
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
};

const Landing: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );

  const observerRef = useRef<IntersectionObserver | null>(null);

  const isSectionVisible = (id: string) => visibleSections.has(id);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -100px 0px" }
    );

    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const icons = {
    logoIcon: robotIcon,
    smartInventory: "",
    salesAnalytics: "",
    customerIntelligence: "",
    rpaAutomation: "",
    demandPrediction: "",
    digitalPayments: "",
  };

  const features = [
    {
      icon: icons.smartInventory,
      title: "Smart Inventory",
      description: "AI-powered stock tracking with auto-reorder predictions",
      gradient: "from-purple-500 to-blue-500",
    },
    {
      icon: icons.salesAnalytics,
      title: "Sales Analytics",
      description: "Real-time revenue tracking with trend forecasting",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: icons.customerIntelligence,
      title: "Customer Intelligence",
      description: "Behavior analysis and personalized recommendations",
      gradient: "from-cyan-500 to-teal-500",
    },
    {
      icon: icons.rpaAutomation,
      title: "RPA Automation",
      description: "Automate repetitive tasks and streamline workflows",
      gradient: "from-teal-500 to-green-500",
    },
    {
      icon: icons.demandPrediction,
      title: "Demand Prediction",
      description: "ML-driven forecasts for optimal stock planning",
      gradient: "from-green-500 to-yellow-500",
    },
    {
      icon: icons.digitalPayments,
      title: "Digital Payments",
      description: "Integrated UPI, cards, and wallet solutions",
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      business: "Kumar General Store, Mumbai",
      text: "Increased my sales by 40% in just 3 months. The AI predictions are spot-on!",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      business: "Sharma Electronics, Delhi",
      text: "Never run out of stock anymore. The automation saved me hours every day.",
      rating: 5,
    },
    {
      name: "Mohammed Ali",
      business: "Ali Supermart, Bangalore",
      text: "Best investment for my shop. Customer insights help me serve better.",
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "₹999",
      period: "/month",
      features: [
        "Up to 500 products",
        "Basic analytics",
        "Email support",
        "Mobile app access",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "₹2,499",
      period: "/month",
      features: [
        "Unlimited products",
        "Advanced AI insights",
        "RPA automation",
        "Priority support",
        "Custom integrations",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: [
        "Multi-location support",
        "Dedicated account manager",
        "Custom AI models",
        "API access",
        "White-label option",
      ],
      popular: false,
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`,
          }}
        ></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${
                5 + Math.random() * 10
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Navigation with AI-style hover */}
      <nav className="relative z-50 px-6 py-6 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50 overflow-hidden">
              {icons.logoIcon ? (
                <img
                  src={icons.logoIcon}
                  alt="AI"
                  className="w-7 h-7 object-contain"
                />
              ) : (
                <span className="text-white text-2xl">🤖</span>
              )}
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Local Shop AI
            </span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a
              href="#features"
              className="relative text-gray-300 hover:text-white transition-all duration-300 group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#demo"
              className="relative text-gray-300 hover:text-white transition-all duration-300 group"
            >
              Demo
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#pricing"
              className="relative text-gray-300 hover:text-white transition-all duration-300 group"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <button className="relative px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all hover:scale-105 overflow-hidden group">
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative z-10 px-6 py-20 md:py-32"
        id="hero"
        data-animate
      >
        <div
          className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-8">
            <div
              className={`inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-sm text-purple-300 backdrop-blur-sm transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              ✨ AI-Powered Business Automation
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              <span className="inline-block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {"AI-Powered Assistant".split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block"
                    style={{
                      animation: isVisible
                        ? `letterAppear 0.05s ease-out ${i * 0.03}s both`
                        : "none",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
              <br />
              <span className="text-white">
                {"for Local Shops".split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block"
                    style={{
                      animation: isVisible
                        ? `letterAppear 0.05s ease-out ${(i + 20) * 0.03}s both`
                        : "none",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </h1>
            <p
              className={`text-xl text-gray-300 leading-relaxed transition-all duration-1000 delay-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              Automate inventory, analyze sales, manage customers, predict
              demand, and streamline tasks using AI + RPA. Transform your local
              shop into a smart, data-driven business.
            </p>
            <div
              className={`flex flex-wrap gap-4 transition-all duration-1000 delay-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold text-lg shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all hover:scale-105 relative overflow-hidden">
                <span className="relative z-10">Get Started Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <button className="relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transition-all hover:scale-105 group">
                <span className="relative z-10">Watch Demo →</span>
              </button>
            </div>
            <div
              className={`flex gap-8 pt-4 transition-all duration-1000 delay-[1200ms] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <StatCounter
                end={10000}
                suffix="+"
                label="Active Shops"
                color="text-purple-400"
                isVisible={isVisible}
                duration={6000}
              />
              <StatCounter
                end={50}
                suffix="Cr+"
                prefix="₹"
                label="Revenue Managed"
                color="text-blue-400"
                isVisible={isVisible}
                duration={7000}
              />
              <StatCounter
                end={99.9}
                suffix="%"
                label="Uptime"
                color="text-cyan-400"
                isVisible={isVisible}
                decimals={1}
                duration={8000}
              />
            </div>
          </div>

          {/* NEW: Enhanced 3D Robot with robiImage */}
          <div
            className={`relative transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-75 rotate-12"
            }`}
          >
            <div className="relative w-full aspect-square flex items-center justify-center">
              {/* Energy Rings - Multiple layers */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 border-2 border-purple-500/20 rounded-full animate-ping-slow"></div>
                <div className="absolute inset-8 border-2 border-blue-500/30 rounded-full animate-spin-slow"></div>
                <div
                  className="absolute inset-16 border-2 border-cyan-500/20 rounded-full"
                  style={{ animation: "spin 15s linear infinite reverse" }}
                ></div>
                <div className="absolute inset-24 border border-purple-400/10 rounded-full animate-pulse"></div>
              </div>

              {/* Orbiting Data Particles */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    animation: `orbit ${8 + i * 2}s linear infinite`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                >
                  <div
                    className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg shadow-purple-500/50"
                    style={{
                      transform: `translate(-50%, -50%) translateX(${
                        120 + i * 20
                      }px)`,
                    }}
                  ></div>
                </div>
              ))}

              {/* Central Robot Image */}
              <div className="relative z-10 w-80 h-80 flex items-center justify-center">
                <div className="relative">
                  {/* Glow effect behind robot */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-full blur-3xl animate-pulse"></div>

                  {/* Main Robot Image - YOUR robiImage */}
                  <img
                    src={robiImage}
                    alt="AI Robot Assistant"
                    className="relative z-10 w-72 h-72 object-contain drop-shadow-2xl animate-float-slow"
                    style={{
                      filter: "drop-shadow(0 0 30px rgba(139, 92, 246, 0.5))",
                      mixBlendMode: "screen", // Blends white background away
                      backgroundColor: "transparent",
                    }}
                  />

                  {/* Scanning Line Effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan"></div>
                  </div>
                </div>
              </div>

              {/* Floating Data Icons */}
              {[
                {
                  emoji: "📊",
                  label: "Analytics",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  emoji: "💰",
                  label: "Revenue",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  emoji: "📦",
                  label: "Inventory",
                  color: "from-cyan-500 to-teal-500",
                },
                {
                  emoji: "🛒",
                  label: "Orders",
                  color: "from-teal-500 to-green-500",
                },
                {
                  emoji: "₹",
                  label: "Payments",
                  color: "from-green-500 to-yellow-500",
                },
                {
                  emoji: "📈",
                  label: "Growth",
                  color: "from-yellow-500 to-orange-500",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`absolute w-16 h-16 bg-gradient-to-br ${item.color} backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl border border-white/20 shadow-2xl cursor-pointer hover:scale-125 transition-all duration-300`}
                  style={{
                    left: `${50 + 48 * Math.cos((i * Math.PI * 2) / 6)}%`,
                    top: `${50 + 48 * Math.sin((i * Math.PI * 2) / 6)}%`,
                    transform: "translate(-50%, -50%)",
                    animation: `floatOrbit ${
                      4 + i * 0.5
                    }s ease-in-out infinite, fadeInScale 0.8s ease-out ${
                      i * 0.3
                    }s both`,
                  }}
                  title={item.label}
                >
                  {item.emoji}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 hover:opacity-50 rounded-2xl transition-opacity blur-xl`}
                  ></div>
                </div>
              ))}

              {/* Connecting Neural Lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
                {[...Array(6)].map((_, i) => {
                  const angle = (i * Math.PI * 2) / 6;
                  const x = 50 + 48 * Math.cos(angle);
                  const y = 50 + 48 * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1="50%"
                      y1="50%"
                      x2={`${x}%`}
                      y2={`${y}%`}
                      stroke="url(#neuralGradient)"
                      strokeWidth="1"
                      className="animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  );
                })}
                <defs>
                  <linearGradient
                    id="neuralGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Outer Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 blur-3xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        id="features"
        className="relative z-10 px-6 py-20 bg-gradient-to-b from-transparent via-purple-950/30 to-transparent"
        data-animate
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isSectionVisible("features")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {"Powerful Features".split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block"
                    style={{
                      animation: isSectionVisible("features")
                        ? `letterAppear 0.05s ease-out ${i * 0.02}s both`
                        : "none",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to run a smart retail business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer ${
                  isSectionVisible("features")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                ></div>
                <div className="relative z-10">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon ? (
                      <img
                        src={feature.icon}
                        alt={feature.title}
                        className="w-16 h-16 object-contain"
                      />
                    ) : (
                      <div className="w-16 h-16 flex items-center justify-center text-5xl">
                        {["📊", "💰", "👥", "🤖", "📈", "💳"][index]}
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl group-hover:opacity-100 opacity-0 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo, Testimonials, Pricing - Keep existing code */}
      <section id="demo" className="relative z-10 px-6 py-20" data-animate>
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isSectionVisible("demo")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {"See It In Action".split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block"
                    style={{
                      animation: isSectionVisible("demo")
                        ? `letterAppear 0.05s ease-out ${i * 0.03}s both`
                        : "none",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Watch how Local Shop AI transforms businesses
            </p>
          </div>

          <div
            className={`relative group cursor-pointer transition-all duration-1000 ${
              isSectionVisible("demo")
                ? "opacity-100 scale-100"
                : "opacity-0 scale-90"
            }`}
          >
            <div className="relative aspect-video bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden shadow-2xl shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50 group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-2"></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
                </div>
              </div>

              <div className="absolute inset-0 p-8 opacity-30">
                <div className="grid grid-cols-4 gap-4 mb-4">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-20 bg-white/10 rounded-lg backdrop-blur-sm"
                    ></div>
                  ))}
                </div>
                <div className="h-40 bg-white/10 rounded-lg backdrop-blur-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="relative z-10 px-6 py-20 bg-gradient-to-b from-transparent via-blue-950/30 to-transparent"
        id="testimonials"
        data-animate
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isSectionVisible("testimonials")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {"Trusted by Shop Owners".split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block"
                    style={{
                      animation: isSectionVisible("testimonials")
                        ? `letterAppear 0.05s ease-out ${i * 0.02}s both`
                        : "none",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Join thousands of successful businesses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 ${
                  isSectionVisible("testimonials")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">
                    {testimonial.business}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 px-6 py-20" data-animate>
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isSectionVisible("pricing")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {"Simple, Transparent Pricing".split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block"
                    style={{
                      animation: isSectionVisible("pricing")
                        ? `letterAppear 0.05s ease-out ${i * 0.02}s both`
                        : "none",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Choose the perfect plan for your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-3xl border transition-all duration-500 hover:scale-105 ${
                  plan.popular
                    ? "bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-purple-500 shadow-2xl shadow-purple-500/30"
                    : "bg-white/5 border-white/10 hover:border-purple-500/50"
                } backdrop-blur-md ${
                  isSectionVisible("pricing")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-gray-400 ml-2">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-green-400 text-xl">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-4 rounded-full font-bold transition-all relative overflow-hidden group ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105"
                      : "bg-white/10 hover:bg-white/20 border border-white/20"
                  }`}
                >
                  <span className="relative z-10">Get Started</span>
                  {plan.popular && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="relative z-10 px-6 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            <div className="text-center hover:opacity-100 transition-opacity cursor-pointer">
              <div className="text-3xl mb-2">🔒</div>
              <div className="text-sm text-gray-400">Bank-Grade Security</div>
            </div>
            <div className="text-center hover:opacity-100 transition-opacity cursor-pointer">
              <div className="text-3xl mb-2">☁️</div>
              <div className="text-sm text-gray-400">99.9% Uptime SLA</div>
            </div>
            <div className="text-center hover:opacity-100 transition-opacity cursor-pointer">
              <div className="text-3xl mb-2">🇮🇳</div>
              <div className="text-sm text-gray-400">Made in India</div>
            </div>
            <div className="text-center hover:opacity-100 transition-opacity cursor-pointer">
              <div className="text-3xl mb-2">📱</div>
              <div className="text-sm text-gray-400">Mobile First</div>
            </div>
            <div className="text-center hover:opacity-100 transition-opacity cursor-pointer">
              <div className="text-3xl mb-2">💳</div>
              <div className="text-sm text-gray-400">UPI Integrated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
                {icons.logoIcon ? (
                  <img
                    src={icons.logoIcon}
                    alt="AI"
                    className="w-7 h-7 object-contain"
                  />
                ) : (
                  <span className="text-white text-2xl">🤖</span>
                )}
              </div>
              <span className="text-xl font-bold">Local Shop AI</span>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering local businesses with artificial intelligence and
              automation.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a
                  href="#"
                  className="relative hover:text-white transition-colors group"
                >
                  Features
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative hover:text-white transition-colors group"
                >
                  Pricing
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative hover:text-white transition-colors group"
                >
                  Demo
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative hover:text-white transition-colors group"
                >
                  API
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a
                  href="#"
                  className="relative hover:text-white transition-colors group"
                >
                  About Us
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative hover:text-white transition-colors group"
                >
                  Careers
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative hover:text-white transition-colors group"
                >
                  Blog
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative hover:text-white transition-colors group"
                >
                  Contact
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a
                  href="#"
                  className="relative hover:text-white transition-colors group"
                >
                  Help Center
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative hover:text-white transition-colors group"
                >
                  Documentation
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative hover:text-white transition-colors group"
                >
                  WhatsApp Support
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative hover:text-white transition-colors group"
                >
                  Status
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 Local Shop AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-400 text-sm">
            <a
              href="#"
              className="relative hover:text-white transition-colors group"
            >
              Privacy Policy
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#"
              className="relative hover:text-white transition-colors group"
            >
              Terms of Service
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#"
              className="relative hover:text-white transition-colors group"
            >
              Cookie Policy
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
        </div>
      </footer>

      {/* Enhanced Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.02); }
        }
        @keyframes floatOrbit {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ping-slow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.1; }
        }
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes letterAppear {
          0% {
            opacity: 0;
            transform: translateY(20px) rotateX(-90deg);
            filter: blur(4px);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-5px) rotateX(20deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
            filter: blur(0);
          }
        }
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 3s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Landing;
