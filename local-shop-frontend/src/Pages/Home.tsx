import React, { useState, useEffect } from "react";
import robotIcon from "../assets/inspiration_5371028.png";
import {
  Package,
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
  Clock,
  Sun,
  Moon,
  Brain,
  ShoppingCart,
  ShoppingBag,
  Zap,
  CreditCard,
  Wallet,
  Globe,
  Shield,
  PieChart,
  MessageCircle,
  Scan,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// TypeScript Interfaces
interface MetricCard {
  id: string;
  label: string;
  value: string;
  change: string;
  changeValue: number;
  icon: React.ReactNode;
  color: "purple" | "pink" | "rose" | "blue" | "green";
  trend: "up" | "down";
}

interface FeatureCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color:
    | "purple"
    | "pink"
    | "rose"
    | "blue"
    | "green"
    | "indigo"
    | "teal"
    | "amber";
  features: string[];
  onClick: () => void;
}

const Home: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<FeatureCategory | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sales trend data
  const salesData = [
    { day: "Mon", sales: 4200, orders: 42 },
    { day: "Tue", sales: 5100, orders: 51 },
    { day: "Wed", sales: 4800, orders: 48 },
    { day: "Thu", sales: 6200, orders: 62 },
    { day: "Fri", sales: 7500, orders: 75 },
    { day: "Sat", sales: 8900, orders: 89 },
    { day: "Sun", sales: 6800, orders: 68 },
  ];

  // Revenue data
  const revenueData = [
    { month: "Jan", revenue: 32000 },
    { month: "Feb", revenue: 38000 },
    { month: "Mar", revenue: 35000 },
    { month: "Apr", revenue: 42000 },
    { month: "May", revenue: 45000 },
    { month: "Jun", revenue: 48574 },
  ];

  // Key Metrics
  const metrics: MetricCard[] = [
    {
      id: "1",
      label: "Total Revenue",
      value: "$48,574",
      change: "+12.5%",
      changeValue: 12.5,
      icon: <DollarSign className="w-6 h-6" />,
      color: "purple",
      trend: "up",
    },
    {
      id: "2",
      label: "Active Customers",
      value: "3,482",
      change: "+8.3%",
      changeValue: 8.3,
      icon: <Users className="w-6 h-6" />,
      color: "pink",
      trend: "up",
    },
    {
      id: "3",
      label: "Total Products",
      value: "1,247",
      change: "+5.2%",
      changeValue: 5.2,
      icon: <Package className="w-6 h-6" />,
      color: "rose",
      trend: "up",
    },
    {
      id: "4",
      label: "Orders Today",
      value: "142",
      change: "+15.8%",
      changeValue: 15.8,
      icon: <ShoppingCart className="w-6 h-6" />,
      color: "blue",
      trend: "up",
    },
  ];

  // Feature Categories
  const featureCategories: FeatureCategory[] = [
    {
      id: "1",
      name: "CORE SHOP MANAGEMENT",
      icon: <ShoppingBag className="w-5 h-5" />,
      color: "purple",
      features: [
        "Product Inventory Management",
        "Billing & Invoicing",
        "Customer Management",
        "Supplier Management",
        "Purchase Order Management",
        "Sales Tracking",
        "Expense Tracking",
        "GST/Tax Calculation",
        "Stock Alerts",
        "Barcode Scanner Integration",
      ],
      onClick: () => {},
    },
    {
      id: "2",
      name: "AI FEATURES",
      icon: <Brain className="w-5 h-5" />,
      color: "pink",
      features: [
        "AI Product Demand Prediction",
        "AI Sales Forecasting",
        "AI Dynamic Pricing Suggestions",
        "AI Customer Behavior Insights",
        "AI Low Stock Prediction",
        "AI Fraud/Irregularity Detection",
        "AI Recommended Restock Schedule",
        "AI Expense Optimization",
        "AI Smart Notification System",
      ],
      onClick: () => {},
    },
    {
      id: "3",
      name: "RPA AUTOMATION",
      icon: <Zap className="w-5 h-5" />,
      color: "rose",
      features: [
        "Automated Invoice Generation",
        "Automated Stock Update",
        "Automated Supplier Order Placement",
        "Automated Daily Sales Report",
        "Automated Customer SMS/WhatsApp",
        "Automated Tax Filing Draft",
        "Automated Product Label Printing",
        "Automated Expense Categorization",
        "Automated Attendance/Shift Management",
        "Automated Cash Flow Report",
      ],
      onClick: () => {},
    },
    {
      id: "4",
      name: "POS & PAYMENT",
      icon: <CreditCard className="w-5 h-5" />,
      color: "blue",
      features: [
        "POS Billing",
        "UPI Payment Integration",
        "QR Code Payments",
        "Digital Receipt Generation",
      ],
      onClick: () => {},
    },
    {
      id: "5",
      name: "ACCOUNTING & FINANCE",
      icon: <Wallet className="w-5 h-5" />,
      color: "green",
      features: [
        "Ledger Management",
        "Cash Flow Tracking",
        "Profit & Loss Analyzer",
        "Credit/Debt Tracking",
      ],
      onClick: () => {},
    },
    {
      id: "6",
      name: "E-COMMERCE INTEGRATION",
      icon: <Globe className="w-5 h-5" />,
      color: "indigo",
      features: [
        "Online Order Sync",
        "Delivery Partner Integration",
        "Product Catalog Sync",
      ],
      onClick: () => {},
    },
    {
      id: "7",
      name: "SECURITY & ADMIN",
      icon: <Shield className="w-5 h-5" />,
      color: "teal",
      features: [
        "Role-based Access",
        "Cloud Backup",
        "Activity Logs",
        "Multi-Device Access",
        "Offline Mode",
      ],
      onClick: () => {},
    },
    {
      id: "8",
      name: "ANALYTICS & DASHBOARD",
      icon: <PieChart className="w-5 h-5" />,
      color: "purple",
      features: [
        "Sales Analytics",
        "Inventory Analytics",
        "Customer Analytics",
        "Supplier Analytics",
        "Profit Analytics",
      ],
      onClick: () => {},
    },
    {
      id: "9",
      name: "COMMUNICATION & CUSTOMER",
      icon: <MessageCircle className="w-5 h-5" />,
      color: "pink",
      features: [
        "Loyalty Program",
        "Customer Feedback",
        "Coupon/Offers System",
        "Festival/Seasonal Campaigns",
      ],
      onClick: () => {},
    },
    {
      id: "10",
      name: "INVENTORY HARDWARE INTEGRATION",
      icon: <Scan className="w-5 h-5" />,
      color: "amber",
      features: [
        "Barcode Scanner",
        "Thermal Printer",
        "RFID Tagging",
        "Weight Machine Integration",
      ],
      onClick: () => {},
    },
  ];

  // Theme classes
  const theme = {
    bg: darkMode ? "bg-slate-950" : "bg-gray-50",
    cardBg: darkMode ? "bg-slate-900/50" : "bg-white",
    text: darkMode ? "text-white" : "text-gray-900",
    textSecondary: darkMode ? "text-gray-300" : "text-gray-600",
    textMuted: darkMode ? "text-gray-400" : "text-gray-500",
    border: darkMode ? "border-purple-500/20" : "border-gray-200",
    hover: darkMode ? "hover:bg-slate-800/50" : "hover:bg-gray-50",
    glass: darkMode ? "backdrop-blur-xl bg-slate-900/70" : "bg-white",
  };

  const getColorClasses = (color: string) => {
    const colors = {
      purple: {
        bg: darkMode ? "bg-purple-500/10" : "bg-purple-50",
        text: darkMode ? "text-purple-400" : "text-purple-600",
        border: darkMode ? "border-purple-500/30" : "border-purple-200",
        gradient: "from-purple-500 to-pink-500",
      },
      pink: {
        bg: darkMode ? "bg-pink-500/10" : "bg-pink-50",
        text: darkMode ? "text-pink-400" : "text-pink-600",
        border: darkMode ? "border-pink-500/30" : "border-pink-200",
        gradient: "from-pink-500 to-rose-500",
      },
      rose: {
        bg: darkMode ? "bg-rose-500/10" : "bg-rose-50",
        text: darkMode ? "text-rose-400" : "text-rose-600",
        border: darkMode ? "border-rose-500/30" : "border-rose-200",
        gradient: "from-rose-500 to-purple-500",
      },
      blue: {
        bg: darkMode ? "bg-blue-500/10" : "bg-blue-50",
        text: darkMode ? "text-blue-400" : "text-blue-600",
        border: darkMode ? "border-blue-500/30" : "border-blue-200",
        gradient: "from-blue-500 to-indigo-500",
      },
      green: {
        bg: darkMode ? "bg-green-500/10" : "bg-green-50",
        text: darkMode ? "text-green-400" : "text-green-600",
        border: darkMode ? "border-green-500/30" : "border-green-200",
        gradient: "from-green-500 to-emerald-500",
      },
      indigo: {
        bg: darkMode ? "bg-indigo-500/10" : "bg-indigo-50",
        text: darkMode ? "text-indigo-400" : "text-indigo-600",
        border: darkMode ? "border-indigo-500/30" : "border-indigo-200",
        gradient: "from-indigo-500 to-purple-500",
      },
      teal: {
        bg: darkMode ? "bg-teal-500/10" : "bg-teal-50",
        text: darkMode ? "text-teal-400" : "text-teal-600",
        border: darkMode ? "border-teal-500/30" : "border-teal-200",
        gradient: "from-teal-500 to-cyan-500",
      },
      amber: {
        bg: darkMode ? "bg-amber-500/10" : "bg-amber-50",
        text: darkMode ? "text-amber-400" : "text-amber-600",
        border: darkMode ? "border-amber-500/30" : "border-amber-200",
        gradient: "from-amber-500 to-orange-500",
      },
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-300`}>
      {/* Subtle Background Gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {darkMode && (
          <>
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-purple-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-pink-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 bg-rose-600/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          </>
        )}
      </div>

      {/* Header */}
      <header
        className={`${theme.glass} border-b ${theme.border} sticky top-0 z-50 transition-colors duration-300 shadow-sm`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50 overflow-hidden">
                {robotIcon ? (
                  <img
                    src={robotIcon}
                    alt="AI"
                    className="w-7 h-7 object-contain"
                  />
                ) : (
                  <span className="text-white text-2xl">🤖</span>
                )}
              </div>
              <div>
                <h1 className={`text-xl font-bold ${theme.text}`}>
                  ShopAI Pro
                </h1>
                <p className={`text-xs ${theme.textMuted}`}>
                  AI + Business Dashboard
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Time Display */}
              <div
                className={`hidden md:flex items-center gap-2 px-4 py-2 ${theme.cardBg} rounded-lg border ${theme.border} shadow-sm`}
              >
                <Clock className={`w-4 h-4 ${theme.textMuted}`} />
                <span className={`text-sm font-medium ${theme.textSecondary}`}>
                  {currentTime}
                </span>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-lg ${theme.hover} border ${theme.border} transition-all shadow-sm hover:shadow-md`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-amber-500" />
                ) : (
                  <Moon className="w-5 h-5 text-purple-600" />
                )}
              </button>

              {/* User Avatar */}
              <div
                className={`w-10 h-10 bg-gradient-to-br ${
                  getColorClasses("pink").gradient
                } rounded-full flex items-center justify-center font-semibold text-white text-sm shadow-lg`}
              >
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className={`text-3xl font-bold ${theme.text} mb-2`}>
            Welcome back, Sahil 👋
          </h2>
          <p className={theme.textSecondary}>
            Complete shop management with AI-powered insights
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => {
            const colorClasses = getColorClasses(metric.color);
            return (
              <div
                key={metric.id}
                className={`${theme.cardBg} border ${
                  theme.border
                } rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                  darkMode ? "hover:border-purple-500/40" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 ${colorClasses.bg} rounded-lg border ${colorClasses.border} shadow-sm`}
                  >
                    <div className={colorClasses.text}>{metric.icon}</div>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-medium ${
                      metric.trend === "up"
                        ? "text-emerald-500"
                        : "text-red-500"
                    }`}
                  >
                    {metric.trend === "up" ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{metric.change}</span>
                  </div>
                </div>

                <div className={`text-sm font-medium ${theme.textMuted} mb-1`}>
                  {metric.label}
                </div>
                <div className={`text-3xl font-bold ${theme.text}`}>
                  {metric.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Performance Chart */}
          <div
            className={`${theme.cardBg} border ${theme.border} rounded-xl p-6 shadow-sm transition-all hover:shadow-lg`}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`text-lg font-semibold ${theme.text}`}>
                  Sales Performance
                </h3>
                <p className={`text-sm ${theme.textMuted}`}>Weekly trend</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span className={`text-sm ${theme.textMuted}`}>Live</span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient
                    id="salesGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={darkMode ? "#374151" : "#e5e7eb"}
                />
                <XAxis
                  dataKey="day"
                  stroke={darkMode ? "#9ca3af" : "#6b7280"}
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  stroke={darkMode ? "#9ca3af" : "#6b7280"}
                  style={{ fontSize: "12px" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#1e293b" : "#ffffff",
                    border: `1px solid ${darkMode ? "#334155" : "#e5e7eb"}`,
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#a855f7"
                  strokeWidth={3}
                  fill="url(#salesGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Growth Chart */}
          <div
            className={`${theme.cardBg} border ${theme.border} rounded-xl p-6 shadow-sm transition-all hover:shadow-lg`}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`text-lg font-semibold ${theme.text}`}>
                  Revenue Growth
                </h3>
                <p className={`text-sm ${theme.textMuted}`}>
                  6 months overview
                </p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={darkMode ? "#374151" : "#e5e7eb"}
                />
                <XAxis
                  dataKey="month"
                  stroke={darkMode ? "#9ca3af" : "#6b7280"}
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  stroke={darkMode ? "#9ca3af" : "#6b7280"}
                  style={{ fontSize: "12px" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#1e293b" : "#ffffff",
                    border: `1px solid ${darkMode ? "#334155" : "#e5e7eb"}`,
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="revenue" fill="#ec4899" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-8">
          <h3 className={`text-2xl font-bold ${theme.text} mb-6`}>
            Features & Modules
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {featureCategories.map((category) => {
              const colorClasses = getColorClasses(category.color);
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}
                  className={`${theme.cardBg} border ${
                    theme.border
                  } rounded-xl p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    theme.hover
                  } ${darkMode ? "hover:border-purple-500/40" : ""} group`}
                >
                  <div
                    className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center mb-4 border ${colorClasses.border} shadow-sm group-hover:scale-110 transition-transform`}
                  >
                    <div className={colorClasses.text}>{category.icon}</div>
                  </div>

                  <h4 className={`text-sm font-bold ${theme.text} mb-2`}>
                    {category.name}
                  </h4>

                  <div className={`text-xs ${theme.textMuted} space-y-1`}>
                    {category.features.slice(0, 3).map((feature, index) => (
                      <div key={index}>• {feature}</div>
                    ))}
                    {category.features.length > 3 && (
                      <div className={`font-semibold ${colorClasses.text}`}>
                        +{category.features.length - 3} more
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* System Status Footer */}
        <div
          className={`${theme.cardBg} border ${theme.border} rounded-xl p-4 shadow-sm`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-sm" />
              <span className={`text-sm font-medium ${theme.textSecondary}`}>
                All systems operational
              </span>
            </div>
            <div
              className={`flex items-center gap-4 text-xs ${theme.textMuted}`}
            >
              <span>10 modules active</span>
              <span>•</span>
              <span>AI analyzing in real-time</span>
            </div>
          </div>
        </div>
      </main>

      {/* Feature Detail Modal */}
      {selectedCategory && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCategory(null)}
        >
          <div
            className={`${theme.cardBg} rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border ${theme.border}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className={`p-6 border-b ${theme.border} bg-gradient-to-r ${
                getColorClasses(selectedCategory.color).gradient
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <div className="text-white">{selectedCategory.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {selectedCategory.name}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {selectedCategory.features.length} features available
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCategory.features.map((feature, index) => {
                  const colorClasses = getColorClasses(selectedCategory.color);
                  return (
                    <a
                      key={index}
                      href="#"
                      className={`${theme.cardBg} border ${theme.border} rounded-lg p-4 transition-all hover:shadow-md ${theme.hover} group flex items-start gap-3`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${colorClasses.bg} mt-2 flex-shrink-0 group-hover:scale-125 transition-transform`}
                      />
                      <div className="flex-1">
                        <span
                          className={`${theme.text} text-sm font-medium group-hover:${colorClasses.text} transition-colors`}
                        >
                          {feature}
                        </span>
                      </div>
                      <svg
                        className={`w-4 h-4 ${theme.textMuted} opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
