import React, { useState, useEffect } from "react";
import {
  Package,
  Plus,
  Search,
  Download,
  Upload,
  Edit,
  Trash2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  AlertTriangle,
  Calendar,
  Grid3x3,
  List,
  RefreshCw,
  ImagePlus,
  Save,
  Filter,
  Tag,
  Box,
  TrendingUp,
  TrendingDown,
  FileText,
  CheckCircle2,
  Clock,
  Settings,
  BarChart3,
  DollarSign,
  Boxes,
  ShoppingCart,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  brand: string;
  sku: string;
  stockQuantity: number;
  unitOfMeasure: string;
  costPrice: number;
  sellingPrice: number;
  expiryDate: string;
  description: string;
  imageUrl: string;
  status: "In Stock" | "Low Stock" | "Out of Stock" | "Discontinued";
  lastUpdated: string;
}

interface StockLog {
  id: string;
  productId: string;
  productName: string;
  type: "increase" | "decrease" | "adjustment";
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  date: string;
  user: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  count: number;
}

const ProductInventory: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [stockLogs, setStockLogs] = useState<StockLog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState<"name" | "quantity" | "price">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [notifications, setNotifications] = useState<
    Array<{ id: string; message: string; type: "warning" | "info" | "success" }>
  >([]);
  const [visibleColumns, setVisibleColumns] = useState({
    product: true,
    category: true,
    sku: true,
    stock: true,
    price: true,
    status: true,
    actions: true,
  });

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subCategory: "",
    brand: "",
    sku: "",
    stockQuantity: 0,
    unitOfMeasure: "piece",
    costPrice: 0,
    sellingPrice: 0,
    expiryDate: "",
    description: "",
    imageUrl: "",
    status: "In Stock" as const,
  });

  const [stockAdjustment, setStockAdjustment] = useState({
    type: "increase" as "increase" | "decrease" | "adjustment",
    quantity: 0,
    reason: "",
  });

  const [bulkUpdate, setBulkUpdate] = useState({
    field: "category" as "category" | "price" | "status",
    value: "",
  });

  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  useEffect(() => {
    const sampleProducts: Product[] = [
      {
        id: "1",
        name: "Wireless Keyboard Pro",
        category: "Electronics",
        subCategory: "Computer Accessories",
        brand: "TechPro",
        sku: "WKB-001",
        stockQuantity: 45,
        unitOfMeasure: "piece",
        costPrice: 25.0,
        sellingPrice: 49.99,
        expiryDate: "",
        description: "Premium wireless keyboard with RGB backlight",
        imageUrl: "",
        status: "In Stock",
        lastUpdated: "2024-12-20",
      },
      {
        id: "2",
        name: "Organic Green Tea",
        category: "Food & Beverage",
        subCategory: "Beverages",
        brand: "NaturePure",
        sku: "OGT-100",
        stockQuantity: 8,
        unitOfMeasure: "box",
        costPrice: 5.5,
        sellingPrice: 12.99,
        expiryDate: "2025-03-15",
        description: "100% organic green tea leaves",
        imageUrl: "",
        status: "Low Stock",
        lastUpdated: "2024-12-19",
      },
      {
        id: "3",
        name: "Premium Office Chair",
        category: "Furniture",
        subCategory: "Office Furniture",
        brand: "ErgoMax",
        sku: "POC-250",
        stockQuantity: 0,
        unitOfMeasure: "piece",
        costPrice: 120.0,
        sellingPrice: 249.99,
        expiryDate: "",
        description: "Ergonomic office chair with lumbar support",
        imageUrl: "",
        status: "Out of Stock",
        lastUpdated: "2024-12-18",
      },
      {
        id: "4",
        name: "LED Desk Lamp",
        category: "Electronics",
        subCategory: "Lighting",
        brand: "BrightLife",
        sku: "LDL-075",
        stockQuantity: 120,
        unitOfMeasure: "piece",
        costPrice: 15.0,
        sellingPrice: 34.99,
        expiryDate: "",
        description: "Adjustable LED desk lamp with touch controls",
        imageUrl: "",
        status: "In Stock",
        lastUpdated: "2024-12-21",
      },
      {
        id: "5",
        name: "Protein Powder Chocolate",
        category: "Health & Wellness",
        subCategory: "Supplements",
        brand: "FitMax",
        sku: "PPC-500",
        stockQuantity: 3,
        unitOfMeasure: "container",
        costPrice: 22.0,
        sellingPrice: 45.99,
        expiryDate: "2025-01-10",
        description: "Premium whey protein powder",
        imageUrl: "",
        status: "Low Stock",
        lastUpdated: "2024-12-20",
      },
      {
        id: "6",
        name: "Yoga Mat Premium",
        category: "Health & Wellness",
        subCategory: "Fitness",
        brand: "ZenFit",
        sku: "YMP-200",
        stockQuantity: 65,
        unitOfMeasure: "piece",
        costPrice: 18.0,
        sellingPrice: 39.99,
        expiryDate: "",
        description: "Non-slip yoga mat with carrying strap",
        imageUrl: "",
        status: "In Stock",
        lastUpdated: "2024-12-21",
      },
      {
        id: "7",
        name: "Smart Watch Series X",
        category: "Electronics",
        subCategory: "Wearables",
        brand: "TechPro",
        sku: "SWX-500",
        stockQuantity: 25,
        unitOfMeasure: "piece",
        costPrice: 180.0,
        sellingPrice: 349.99,
        expiryDate: "",
        description: "Advanced smartwatch with health tracking",
        imageUrl: "",
        status: "In Stock",
        lastUpdated: "2024-12-20",
      },
      {
        id: "8",
        name: "Coffee Beans Premium Blend",
        category: "Food & Beverage",
        subCategory: "Coffee",
        brand: "BeanMasters",
        sku: "CBP-150",
        stockQuantity: 5,
        unitOfMeasure: "kg",
        costPrice: 12.0,
        sellingPrice: 28.99,
        expiryDate: "2025-06-30",
        description: "Premium arabica coffee beans",
        imageUrl: "",
        status: "Low Stock",
        lastUpdated: "2024-12-19",
      },
    ];
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);

    const initialCategories: Category[] = [
      {
        id: "1",
        name: "Electronics",
        description: "Electronic devices and accessories",
        count: 3,
      },
      {
        id: "2",
        name: "Food & Beverage",
        description: "Food and beverage products",
        count: 2,
      },
      {
        id: "3",
        name: "Furniture",
        description: "Office and home furniture",
        count: 1,
      },
      {
        id: "4",
        name: "Health & Wellness",
        description: "Health and fitness products",
        count: 2,
      },
    ];
    setCategories(initialCategories);

    const alerts: Array<{
      id: string;
      message: string;
      type: "warning" | "info" | "success";
    }> = [];
    sampleProducts.forEach((product) => {
      if (product.stockQuantity <= 10 && product.status !== "Out of Stock") {
        alerts.push({
          id: `alert-${product.id}`,
          message: `Low stock alert: ${product.name} has only ${product.stockQuantity} units left`,
          type: "warning",
        });
      }
      if (product.expiryDate) {
        const daysToExpiry = Math.ceil(
          (new Date(product.expiryDate).getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24)
        );
        if (daysToExpiry <= 30 && daysToExpiry > 0) {
          alerts.push({
            id: `expiry-${product.id}`,
            message: `${product.name} expires in ${daysToExpiry} days`,
            type: "info",
          });
        }
      }
    });
    setNotifications(alerts);

    const sampleLogs: StockLog[] = [
      {
        id: "1",
        productId: "1",
        productName: "Wireless Keyboard Pro",
        type: "increase",
        quantity: 20,
        previousStock: 25,
        newStock: 45,
        reason: "New stock received from supplier",
        date: "2024-12-20",
        user: "Admin",
      },
      {
        id: "2",
        productId: "2",
        productName: "Organic Green Tea",
        type: "decrease",
        quantity: 5,
        previousStock: 13,
        newStock: 8,
        reason: "Stock damaged during transport",
        date: "2024-12-19",
        user: "Manager",
      },
      {
        id: "3",
        productId: "4",
        productName: "LED Desk Lamp",
        type: "increase",
        quantity: 50,
        previousStock: 70,
        newStock: 120,
        reason: "Restocking after high demand",
        date: "2024-12-21",
        user: "Admin",
      },
    ];
    setStockLogs(sampleLogs);
  }, []);

  useEffect(() => {
    let filtered = [...products];
    if (searchQuery)
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    if (selectedCategory !== "all")
      filtered = filtered.filter((p) => p.category === selectedCategory);
    if (selectedStatus !== "all")
      filtered = filtered.filter((p) => p.status === selectedStatus);
    if (priceRange.min)
      filtered = filtered.filter(
        (p) => p.sellingPrice >= parseFloat(priceRange.min)
      );
    if (priceRange.max)
      filtered = filtered.filter(
        (p) => p.sellingPrice <= parseFloat(priceRange.max)
      );
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "name") comparison = a.name.localeCompare(b.name);
      else if (sortBy === "quantity")
        comparison = a.stockQuantity - b.stockQuantity;
      else if (sortBy === "price") comparison = a.sellingPrice - b.sellingPrice;
      return sortOrder === "asc" ? comparison : -comparison;
    });
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedCategory,
    selectedStatus,
    priceRange,
    products,
    sortBy,
    sortOrder,
  ]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const theme = {
    bg: darkMode ? "bg-[#0a0a1a]" : "bg-[#f7f7fc]",
    cardBg: darkMode
      ? "bg-gradient-to-br from-[#1a1a2e]/90 to-[#16162a]/90"
      : "bg-white",
    text: darkMode ? "text-white" : "text-[#222]",
    textSecondary: darkMode ? "text-gray-400" : "text-gray-600",
    border: darkMode ? "border-[#9b5cff]/20" : "border-gray-200",
    input: darkMode
      ? "bg-[#1a1a2e] border-[#9b5cff]/30 text-white"
      : "bg-white border-gray-300 text-[#222]",
    hover: darkMode ? "hover:border-[#9b5cff]/60" : "hover:border-[#7d3cff]/60",
    glass: darkMode
      ? "backdrop-blur-xl bg-[#1a1a2e]/70 border border-[#9b5cff]/20"
      : "backdrop-blur-xl bg-white/70 border border-gray-200",
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Low Stock":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "Out of Stock":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Discontinued":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "";
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      subCategory: "",
      brand: "",
      sku: "",
      stockQuantity: 0,
      unitOfMeasure: "piece",
      costPrice: 0,
      sellingPrice: 0,
      expiryDate: "",
      description: "",
      imageUrl: "",
      status: "In Stock",
    });
  };

  const handleAddProduct = () => {
    if (!formData.name || !formData.sku || !formData.category) {
      addNotification("Please fill in all required fields", "warning");
      return;
    }
    const newProduct: Product = {
      id: Date.now().toString(),
      ...formData,
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    setProducts([...products, newProduct]);
    setShowAddModal(false);
    resetForm();
    addNotification("Product added successfully!", "success");
  };

  const handleEditProduct = () => {
    if (!selectedProduct) return;
    setProducts(
      products.map((p) =>
        p.id === selectedProduct.id
          ? {
              ...formData,
              id: p.id,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : p
      )
    );
    setShowEditModal(false);
    addNotification("Product updated successfully!", "success");
  };

  const handleDeleteProduct = () => {
    if (!selectedProduct) return;
    setProducts(products.filter((p) => p.id !== selectedProduct.id));
    setShowDeleteModal(false);
    setSelectedProduct(null);
    addNotification("Product deleted successfully!", "success");
  };

  const handleStockAdjustment = () => {
    if (!selectedProduct || stockAdjustment.quantity <= 0) {
      addNotification("Please enter a valid quantity", "warning");
      return;
    }
    let newStock = selectedProduct.stockQuantity;
    if (stockAdjustment.type === "increase")
      newStock += stockAdjustment.quantity;
    else if (stockAdjustment.type === "decrease")
      newStock -= stockAdjustment.quantity;
    else newStock = stockAdjustment.quantity;

    const newLog: StockLog = {
      id: Date.now().toString(),
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      type: stockAdjustment.type,
      quantity: stockAdjustment.quantity,
      previousStock: selectedProduct.stockQuantity,
      newStock: Math.max(0, newStock),
      reason: stockAdjustment.reason || "No reason provided",
      date: new Date().toISOString().split("T")[0],
      user: "Admin",
    };

    setStockLogs([newLog, ...stockLogs]);
    setProducts(
      products.map((p) =>
        p.id === selectedProduct.id
          ? {
              ...p,
              stockQuantity: Math.max(0, newStock),
              status:
                newStock === 0
                  ? "Out of Stock"
                  : newStock <= 10
                  ? "Low Stock"
                  : "In Stock",
            }
          : p
      )
    );
    setShowStockModal(false);
    setStockAdjustment({ type: "increase", quantity: 0, reason: "" });
    addNotification("Stock adjusted successfully!", "success");
  };

  const handleBulkUpdate = () => {
    if (!bulkUpdate.value) {
      addNotification("Please select a value to update", "warning");
      return;
    }
    const updatedProducts = products.map((p) => {
      if (selectedProducts.includes(p.id)) {
        if (bulkUpdate.field === "category")
          return { ...p, category: bulkUpdate.value };
        if (bulkUpdate.field === "status")
          return { ...p, status: bulkUpdate.value as any };
        if (bulkUpdate.field === "price")
          return { ...p, sellingPrice: parseFloat(bulkUpdate.value) };
      }
      return p;
    });
    setProducts(updatedProducts);
    setSelectedProducts([]);
    setShowBulkModal(false);
    addNotification(
      `${selectedProducts.length} products updated successfully!`,
      "success"
    );
  };

  const handleAddCategory = () => {
    if (!newCategory.name) {
      addNotification("Please enter category name", "warning");
      return;
    }
    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name,
      description: newCategory.description,
      count: 0,
    };
    setCategories([...categories, category]);
    setNewCategory({ name: "", description: "" });
    addNotification("Category added successfully!", "success");
  };

  const addNotification = (
    message: string,
    type: "warning" | "info" | "success"
  ) => {
    const id = Date.now().toString();
    setNotifications([...notifications, { id, message, type }]);
    setTimeout(
      () => setNotifications((n) => n.filter((notif) => notif.id !== id)),
      5000
    );
  };

  const exportToCSV = () => {
    const headers = [
      "Name",
      "SKU",
      "Category",
      "Brand",
      "Stock",
      "Unit",
      "Cost Price",
      "Selling Price",
      "Status",
    ];
    const rows = filteredProducts.map((p) => [
      p.name,
      p.sku,
      p.category,
      p.brand,
      p.stockQuantity,
      p.unitOfMeasure,
      p.costPrice,
      p.sellingPrice,
      p.status,
    ]);
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inventory_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    addNotification("Export completed successfully!", "success");
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split("\n");
      const imported: Product[] = [];
      for (let i = 1; i < lines.length; i++) {
        const data = lines[i].split(",");
        if (data.length >= 8) {
          imported.push({
            id: Date.now().toString() + i,
            name: data[0],
            sku: data[1],
            category: data[2],
            brand: data[3],
            stockQuantity: parseInt(data[4]) || 0,
            unitOfMeasure: data[5] || "piece",
            costPrice: parseFloat(data[6]) || 0,
            sellingPrice: parseFloat(data[7]) || 0,
            status: (data[8] as any) || "In Stock",
            subCategory: "",
            expiryDate: "",
            description: "",
            imageUrl: "",
            lastUpdated: new Date().toISOString().split("T")[0],
          });
        }
      }
      setProducts([...products, ...imported]);
      addNotification(
        `${imported.length} products imported successfully!`,
        "success"
      );
      setShowImportModal(false);
    };
    reader.readAsText(file);
  };

  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce(
      (sum, p) => sum + p.stockQuantity * p.sellingPrice,
      0
    ),
    lowStock: products.filter((p) => p.status === "Low Stock").length,
    outOfStock: products.filter((p) => p.status === "Out of Stock").length,
  };
  return (
    <div className={`min-h-screen ${theme.bg} transition-all duration-300`}>
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {darkMode && (
          <>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#9b5cff]/10 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ff3db0]/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#00eaff]/5 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            />
          </>
        )}
      </div>

      <header
        className={`${theme.glass} sticky top-0 z-40 border-b ${theme.border}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9b5cff] to-[#ff3db0] rounded-xl flex items-center justify-center shadow-lg shadow-[#9b5cff]/20">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${theme.text}`}>
                  Product Inventory Management
                </h1>
                <p className={`text-sm ${theme.textSecondary}`}>
                  {filteredProducts.length} products •{" "}
                  {products.reduce((sum, p) => sum + p.stockQuantity, 0)} total
                  units
                </p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-xl ${theme.cardBg} border ${theme.border} ${theme.hover} transition-all`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-[#00eaff]" />
              ) : (
                <Moon className="w-5 h-5 text-[#7d3cff]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {notifications.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 pt-4">
          <div className="space-y-2">
            {notifications.slice(0, 3).map((notif) => (
              <div
                key={notif.id}
                className={`${theme.glass} rounded-xl p-4 flex items-start gap-3 border ${theme.border} animate-in slide-in-from-top`}
              >
                {notif.type === "warning" && (
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-400" />
                )}
                {notif.type === "info" && (
                  <Clock className="w-5 h-5 flex-shrink-0 text-[#00eaff]" />
                )}
                {notif.type === "success" && (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                )}
                <p className={`text-sm ${theme.text} flex-1`}>
                  {notif.message}
                </p>
                <button
                  onClick={() =>
                    setNotifications(
                      notifications.filter((n) => n.id !== notif.id)
                    )
                  }
                  className={`${theme.textSecondary} hover:text-red-400 transition-colors`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div
            className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 ${theme.hover} transition-all`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-[#9b5cff]/20 rounded-xl flex items-center justify-center">
                <Boxes className="w-6 h-6 text-[#9b5cff]" />
              </div>
              <BarChart3 className={`w-5 h-5 ${theme.textSecondary}`} />
            </div>
            <h3 className={`text-sm ${theme.textSecondary} mb-1`}>
              Total Products
            </h3>
            <p className={`text-3xl font-bold ${theme.text}`}>
              {stats.totalProducts}
            </p>
          </div>

          <div
            className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 ${theme.hover} transition-all`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className={`text-sm ${theme.textSecondary} mb-1`}>
              Total Value
            </h3>
            <p className={`text-3xl font-bold ${theme.text}`}>
              ${stats.totalValue.toFixed(2)}
            </p>
          </div>

          <div
            className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 ${theme.hover} transition-all`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <h3 className={`text-sm ${theme.textSecondary} mb-1`}>
              Low Stock Items
            </h3>
            <p className={`text-3xl font-bold ${theme.text}`}>
              {stats.lowStock}
            </p>
          </div>

          <div
            className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 ${theme.hover} transition-all`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <X className="w-6 h-6 text-red-400" />
              </div>
            </div>
            <h3 className={`text-sm ${theme.textSecondary} mb-1`}>
              Out of Stock
            </h3>
            <p className={`text-3xl font-bold ${theme.text}`}>
              {stats.outOfStock}
            </p>
          </div>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.textSecondary}`}
                />
                <input
                  type="text"
                  placeholder="Search products, SKU or brand..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  resetForm();
                  setShowAddModal(true);
                }}
                className="px-6 py-3 bg-gradient-to-r from-[#9b5cff] to-[#ff3db0] text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-[#9b5cff]/30 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
              <button
                onClick={() => setShowCategoryModal(true)}
                className={`px-4 py-3 ${theme.cardBg} border ${theme.border} ${theme.hover} rounded-xl ${theme.text} flex items-center gap-2 transition-all`}
              >
                <Tag className="w-5 h-5" />
                Categories
              </button>
              <button
                onClick={() => setShowImportModal(true)}
                className={`px-4 py-3 ${theme.cardBg} border ${theme.border} ${theme.hover} rounded-xl ${theme.text} flex items-center gap-2 transition-all`}
              >
                <Upload className="w-5 h-5" />
                Import
              </button>
              <button
                onClick={exportToCSV}
                className={`px-4 py-3 ${theme.cardBg} border ${theme.border} ${theme.hover} rounded-xl ${theme.text} flex items-center gap-2 transition-all`}
              >
                <Download className="w-5 h-5" />
                Export
              </button>
              <button
                onClick={() => setShowLogsModal(true)}
                className={`px-4 py-3 ${theme.cardBg} border ${theme.border} ${theme.hover} rounded-xl ${theme.text} flex items-center gap-2 transition-all`}
              >
                <FileText className="w-5 h-5" />
                Logs
              </button>
              <button
                onClick={() => setShowColumnModal(true)}
                className={`px-4 py-3 ${theme.cardBg} border ${theme.border} ${theme.hover} rounded-xl ${theme.text} flex items-center gap-2 transition-all`}
              >
                <Settings className="w-5 h-5" />
                Columns
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-2 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={`px-4 py-2 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
            >
              <option value="all">All Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Discontinued">Discontinued</option>
            </select>
            <input
              type="number"
              placeholder="Min Price"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: e.target.value })
              }
              className={`w-32 px-4 py-2 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: e.target.value })
              }
              className={`w-32 px-4 py-2 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
            />
            {(searchQuery ||
              selectedCategory !== "all" ||
              selectedStatus !== "all" ||
              priceRange.min ||
              priceRange.max) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedStatus("all");
                  setPriceRange({ min: "", max: "" });
                }}
                className={`px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all flex items-center gap-2`}
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            )}
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-lg ${
                  viewMode === "table"
                    ? "bg-[#9b5cff] text-white"
                    : `${theme.cardBg} ${theme.text}`
                } border ${theme.border} transition-all`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${
                  viewMode === "grid"
                    ? "bg-[#9b5cff] text-white"
                    : `${theme.cardBg} ${theme.text}`
                } border ${theme.border} transition-all`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {selectedProducts.length > 0 && (
            <div
              className={`${theme.glass} rounded-xl p-4 border ${theme.border} flex flex-wrap items-center gap-4`}
            >
              <span className={`${theme.text} font-semibold`}>
                {selectedProducts.length} selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowBulkModal(true)}
                  className="px-4 py-2 bg-[#9b5cff] text-white rounded-lg hover:bg-[#8a4de6] transition-all"
                >
                  Bulk Update
                </button>
                <button
                  onClick={() => {
                    if (
                      confirm(`Delete ${selectedProducts.length} products?`)
                    ) {
                      setProducts(
                        products.filter((p) => !selectedProducts.includes(p.id))
                      );
                      setSelectedProducts([]);
                      addNotification(
                        "Products deleted successfully!",
                        "success"
                      );
                    }
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                >
                  Delete Selected
                </button>
                <button
                  onClick={() => setSelectedProducts([])}
                  className={`px-4 py-2 ${theme.cardBg} border ${theme.border} ${theme.hover} rounded-lg ${theme.text} transition-all`}
                >
                  Clear Selection
                </button>
              </div>
            </div>
          )}
        </div>

        {viewMode === "table" && (
          <div
            className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden shadow-xl`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={darkMode ? "bg-[#1a1a2e]" : "bg-gray-50"}>
                  <tr>
                    <th className="p-4 text-left">
                      <input
                        type="checkbox"
                        checked={
                          currentProducts.length > 0 &&
                          selectedProducts.length === currentProducts.length
                        }
                        onChange={(e) => {
                          if (e.target.checked)
                            setSelectedProducts(
                              currentProducts.map((p) => p.id)
                            );
                          else setSelectedProducts([]);
                        }}
                        className="w-4 h-4 rounded border-[#9b5cff]"
                      />
                    </th>
                    {visibleColumns.product && (
                      <th
                        className={`p-4 text-left text-sm font-semibold ${theme.text} cursor-pointer hover:text-[#9b5cff] transition-colors`}
                        onClick={() => {
                          setSortBy("name");
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}
                      >
                        Product{" "}
                        {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                      </th>
                    )}
                    {visibleColumns.category && (
                      <th
                        className={`p-4 text-left text-sm font-semibold ${theme.text}`}
                      >
                        Category
                      </th>
                    )}
                    {visibleColumns.sku && (
                      <th
                        className={`p-4 text-left text-sm font-semibold ${theme.text}`}
                      >
                        SKU
                      </th>
                    )}
                    {visibleColumns.stock && (
                      <th
                        className={`p-4 text-left text-sm font-semibold ${theme.text} cursor-pointer hover:text-[#9b5cff] transition-colors`}
                        onClick={() => {
                          setSortBy("quantity");
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}
                      >
                        Stock{" "}
                        {sortBy === "quantity" &&
                          (sortOrder === "asc" ? "↑" : "↓")}
                      </th>
                    )}
                    {visibleColumns.price && (
                      <th
                        className={`p-4 text-left text-sm font-semibold ${theme.text} cursor-pointer hover:text-[#9b5cff] transition-colors`}
                        onClick={() => {
                          setSortBy("price");
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}
                      >
                        Price{" "}
                        {sortBy === "price" &&
                          (sortOrder === "asc" ? "↑" : "↓")}
                      </th>
                    )}
                    {visibleColumns.status && (
                      <th
                        className={`p-4 text-left text-sm font-semibold ${theme.text}`}
                      >
                        Status
                      </th>
                    )}
                    {visibleColumns.actions && (
                      <th
                        className={`p-4 text-left text-sm font-semibold ${theme.text}`}
                      >
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
                    <tr
                      key={product.id}
                      className={`border-t ${theme.border} ${theme.hover} transition-all`}
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={(e) => {
                            if (e.target.checked)
                              setSelectedProducts([
                                ...selectedProducts,
                                product.id,
                              ]);
                            else
                              setSelectedProducts(
                                selectedProducts.filter(
                                  (id) => id !== product.id
                                )
                              );
                          }}
                          className="w-4 h-4 rounded border-[#9b5cff]"
                        />
                      </td>
                      {visibleColumns.product && (
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#9b5cff]/20 to-[#ff3db0]/20 rounded-lg flex items-center justify-center">
                              <Package className="w-5 h-5 text-[#9b5cff]" />
                            </div>
                            <div>
                              <div className={`font-semibold ${theme.text}`}>
                                {product.name}
                              </div>
                              <div className={`text-xs ${theme.textSecondary}`}>
                                {product.brand}
                              </div>
                            </div>
                          </div>
                        </td>
                      )}
                      {visibleColumns.category && (
                        <td className={`p-4 ${theme.textSecondary}`}>
                          <div>{product.category}</div>
                          <div className="text-xs">{product.subCategory}</div>
                        </td>
                      )}
                      {visibleColumns.sku && (
                        <td className={`p-4 ${theme.text} font-mono text-sm`}>
                          {product.sku}
                        </td>
                      )}
                      {visibleColumns.stock && (
                        <td className="p-4">
                          <div className={`${theme.text} font-semibold`}>
                            {product.stockQuantity}
                          </div>
                          <div className={`text-xs ${theme.textSecondary}`}>
                            {product.unitOfMeasure}
                          </div>
                        </td>
                      )}
                      {visibleColumns.price && (
                        <td className="p-4">
                          <div className={`${theme.text} font-semibold`}>
                            ${product.sellingPrice.toFixed(2)}
                          </div>
                          <div className={`text-xs ${theme.textSecondary}`}>
                            Cost: ${product.costPrice.toFixed(2)}
                          </div>
                        </td>
                      )}
                      {visibleColumns.status && (
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                              product.status
                            )}`}
                          >
                            {product.status}
                          </span>
                        </td>
                      )}
                      {visibleColumns.actions && (
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                setShowDetailsModal(true);
                              }}
                              className="p-2 rounded-lg bg-[#00eaff]/10 text-[#00eaff] hover:bg-[#00eaff]/20 transition-all"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                setFormData(product);
                                setShowEditModal(true);
                              }}
                              className="p-2 rounded-lg bg-[#9b5cff]/10 text-[#9b5cff] hover:bg-[#9b5cff]/20 transition-all"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                setShowStockModal(true);
                              }}
                              className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all"
                              title="Adjust Stock"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                setShowDeleteModal(true);
                              }}
                              className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className={`border-t ${theme.border} p-4 flex flex-col sm:flex-row items-center justify-between gap-4`}
            >
              <div className={`${theme.textSecondary} text-sm`}>
                Showing {indexOfFirstItem + 1} to{" "}
                {Math.min(indexOfLastItem, filteredProducts.length)} of{" "}
                {filteredProducts.length} products
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg ${theme.cardBg} border ${theme.border} ${theme.hover} ${theme.text} disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let page;
                  if (totalPages <= 5) page = i + 1;
                  else if (currentPage <= 3) page = i + 1;
                  else if (currentPage >= totalPages - 2)
                    page = totalPages - 4 + i;
                  else page = currentPage - 2 + i;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? "bg-gradient-to-r from-[#9b5cff] to-[#ff3db0] text-white"
                          : `${theme.cardBg} ${theme.text}`
                      } border ${theme.border} transition-all`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg ${theme.cardBg} border ${theme.border} ${theme.hover} ${theme.text} disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {viewMode === "grid" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className={`${theme.cardBg} rounded-2xl border ${theme.border} ${theme.hover} p-6 transition-all shadow-lg relative`}
                >
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={(e) => {
                      if (e.target.checked)
                        setSelectedProducts([...selectedProducts, product.id]);
                      else
                        setSelectedProducts(
                          selectedProducts.filter((id) => id !== product.id)
                        );
                    }}
                    className="absolute top-4 left-4 w-4 h-4 rounded border-[#9b5cff]"
                  />
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#9b5cff]/20 to-[#ff3db0]/20 rounded-xl flex items-center justify-center ml-8">
                      <Package className="w-8 h-8 text-[#9b5cff]" />
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold ${theme.text} mb-1`}>
                    {product.name}
                  </h3>
                  <p className={`text-sm ${theme.textSecondary} mb-4`}>
                    {product.brand}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${theme.textSecondary}`}>
                        SKU
                      </span>
                      <span className={`text-sm ${theme.text} font-mono`}>
                        {product.sku}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${theme.textSecondary}`}>
                        Category
                      </span>
                      <span className={`text-sm ${theme.text}`}>
                        {product.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${theme.textSecondary}`}>
                        Stock
                      </span>
                      <span className={`text-sm ${theme.text} font-semibold`}>
                        {product.stockQuantity} {product.unitOfMeasure}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${theme.textSecondary}`}>
                        Price
                      </span>
                      <span className={`text-lg ${theme.text} font-bold`}>
                        ${product.sellingPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowDetailsModal(true);
                      }}
                      className="py-2 rounded-lg bg-[#00eaff]/10 text-[#00eaff] hover:bg-[#00eaff]/20 transition-all font-semibold text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setFormData(product);
                        setShowEditModal(true);
                      }}
                      className="py-2 rounded-lg bg-[#9b5cff]/10 text-[#9b5cff] hover:bg-[#9b5cff]/20 transition-all font-semibold text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div
              className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4`}
            >
              <div className={`${theme.textSecondary} text-sm`}>
                Showing {indexOfFirstItem + 1} to{" "}
                {Math.min(indexOfLastItem, filteredProducts.length)} of{" "}
                {filteredProducts.length} products
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg ${theme.cardBg} border ${theme.border} ${theme.hover} ${theme.text} disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let page;
                  if (totalPages <= 5) page = i + 1;
                  else if (currentPage <= 3) page = i + 1;
                  else if (currentPage >= totalPages - 2)
                    page = totalPages - 4 + i;
                  else page = currentPage - 2 + i;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? "bg-gradient-to-r from-[#9b5cff] to-[#ff3db0] text-white"
                          : `${theme.cardBg} ${theme.text}`
                      } border ${theme.border} transition-all`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg ${theme.cardBg} border ${theme.border} ${theme.hover} ${theme.text} disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </main>
      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className={`${theme.cardBg} rounded-2xl border ${theme.border} max-w-3xl w-full my-8 shadow-2xl`}
          >
            <div className="sticky top-0 bg-gradient-to-r from-[#9b5cff] to-[#ff3db0] p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">Add New Product</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-sm font-semibold ${theme.text} mb-2`}
                  >
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${theme.text} mb-2`}
                  >
                    SKU/Item Code *
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) =>
                      setFormData({ ...formData, sku: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                    placeholder="Enter SKU"
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${theme.text} mb-2`}
                  >
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${theme.text} mb-2`}
                  >
                    Sub-category
                  </label>
                  <input
                    type="text"
                    value={formData.subCategory}
                    onChange={(e) =>
                      setFormData({ ...formData, subCategory: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                    placeholder="Enter sub-category"
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${theme.text} mb-2`}
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                    placeholder="Enter brand"
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${theme.text} mb-2`}
                  >
                    Unit of Measure
                  </label>
                  <select
                    value={formData.unitOfMeasure}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        unitOfMeasure: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                  >
                    <option value="piece">Piece</option>
                    <option value="box">Box</option>
                    <option value="kg">Kilogram</option>
                    <option value="liter">Liter</option>
                    <option value="container">Container</option>
                    <option value="pack">Pack</option>
                  </select>
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${theme.text} mb-2`}
                  >
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stockQuantity: parseInt(e.target.value) || 0,
                      })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${theme.text} mb-2`}
                  >
                    Cost Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.costPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        costPrice: parseFloat(e.target.value) || 0,
                      })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${theme.text} mb-2`}
                  >
                    Selling Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.sellingPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sellingPrice: parseFloat(e.target.value) || 0,
                      })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${theme.text} mb-2`}
                  >
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      setFormData({ ...formData, expiryDate: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                  />
                </div>
              </div>
              <div>
                <label
                  className={`block text-sm font-semibold ${theme.text} mb-2`}
                >
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                  placeholder="Enter product description"
                />
              </div>
              <div
                className={`flex gap-3 justify-end pt-4 border-t ${theme.border}`}
              >
                <button
                  onClick={() => setShowAddModal(false)}
                  className={`px-6 py-3 rounded-xl ${theme.cardBg} border ${theme.border} ${theme.hover} ${theme.text} font-semibold transition-all`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  className="px-6 py-3 bg-gradient-to-r from-[#9b5cff] to-[#ff3db0] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9b5cff]/30 transition-all flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className={`${theme.cardBg} rounded-2xl border ${theme.border} max-w-3xl w-full my-8 shadow-2xl`}
          >
            <div className="sticky top-0 bg-gradient-to-r from-[#9b5cff] to-[#ff3db0] p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">Edit Product</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-sm font-semibold ${theme.text} mb-2`}
                  >
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${theme.text} mb-2`}
                  >
                    SKU/Item Code *
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) =>
                      setFormData({ ...formData, sku: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${theme.text} mb-2`}
                  >
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${theme.text} mb-2`}
                  >
                    Sub-category
                  </label>
                  <input
                    type="text"
                    value={formData.subCategory}
                    onChange={(e) =>
                      setFormData({ ...formData, subCategory: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${theme.text} mb-2`}
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${theme.text} mb-2`}
                  >
                    Unit of Measure
                  </label>
                  <select
                    value={formData.unitOfMeasure}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        unitOfMeasure: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                  >
                    <option value="piece">Piece</option>
                    <option value="box">Box</option>
                    <option value="kg">Kilogram</option>
                    <option value="liter">Liter</option>
                    <option value="container">Container</option>
                    <option value="pack">Pack</option>
                  </select>
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${theme.text} mb-2`}
                  >
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stockQuantity: parseInt(e.target.value) || 0,
                      })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${theme.text} mb-2`}
                  >
                    Cost Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.costPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        costPrice: parseFloat(e.target.value) || 0,
                      })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${theme.text} mb-2`}
                  >
                    Selling Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.sellingPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sellingPrice: parseFloat(e.target.value) || 0,
                      })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${theme.text} mb-2`}
                  >
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as any,
                      })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Discontinued">Discontinued</option>
                  </select>
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${theme.text} mb-2`}
                  >
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      setFormData({ ...formData, expiryDate: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                  />
                </div>
              </div>
              <div>
                <label
                  className={`block text-sm font-semibold ${theme.text} mb-2`}
                >
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                />
              </div>
              <div
                className={`flex gap-3 justify-end pt-4 border-t ${theme.border}`}
              >
                <button
                  onClick={() => setShowEditModal(false)}
                  className={`px-6 py-3 rounded-xl ${theme.cardBg} border ${theme.border} ${theme.hover} ${theme.text} font-semibold transition-all`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditProduct}
                  className="px-6 py-3 bg-gradient-to-r from-[#9b5cff] to-[#ff3db0] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9b5cff]/30 transition-all flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className={`${theme.cardBg} rounded-2xl border ${theme.border} max-w-md w-full shadow-2xl`}
          >
            <div className="p-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <h2
                className={`text-2xl font-bold ${theme.text} text-center mb-2`}
              >
                Delete Product?
              </h2>
              <p className={`${theme.textSecondary} text-center mb-6`}>
                Are you sure you want to delete "
                <span className="font-semibold">{selectedProduct.name}</span>"?
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className={`flex-1 px-6 py-3 rounded-xl ${theme.cardBg} border ${theme.border} ${theme.hover} ${theme.text} font-semibold transition-all`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {showDetailsModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className={`${theme.cardBg} rounded-2xl border ${theme.border} max-w-2xl w-full my-8 shadow-2xl`}
          >
            <div className="sticky top-0 bg-gradient-to-r from-[#9b5cff] to-[#ff3db0] p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">Product Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[#9b5cff]/20 to-[#ff3db0]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Package className="w-12 h-12 text-[#9b5cff]" />
                </div>
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold ${theme.text} mb-1`}>
                    {selectedProduct.name}
                  </h3>
                  <p className={`${theme.textSecondary} mb-3`}>
                    {selectedProduct.brand} • {selectedProduct.category}
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      selectedProduct.status
                    )}`}
                  >
                    {selectedProduct.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`${theme.glass} rounded-xl p-4 border ${theme.border}`}
                >
                  <div className={`text-xs ${theme.textSecondary} mb-1`}>
                    SKU
                  </div>
                  <div className={`font-mono font-semibold ${theme.text}`}>
                    {selectedProduct.sku}
                  </div>
                </div>
                <div
                  className={`${theme.glass} rounded-xl p-4 border ${theme.border}`}
                >
                  <div className={`text-xs ${theme.textSecondary} mb-1`}>
                    Sub-Category
                  </div>
                  <div className={`font-semibold ${theme.text}`}>
                    {selectedProduct.subCategory || "N/A"}
                  </div>
                </div>
                <div
                  className={`${theme.glass} rounded-xl p-4 border ${theme.border}`}
                >
                  <div className={`text-xs ${theme.textSecondary} mb-1`}>
                    Stock Quantity
                  </div>
                  <div className={`font-semibold ${theme.text}`}>
                    {selectedProduct.stockQuantity}{" "}
                    {selectedProduct.unitOfMeasure}
                  </div>
                </div>
                <div
                  className={`${theme.glass} rounded-xl p-4 border ${theme.border}`}
                >
                  <div className={`text-xs ${theme.textSecondary} mb-1`}>
                    Selling Price
                  </div>
                  <div className={`font-bold ${theme.text} text-xl`}>
                    ${selectedProduct.sellingPrice.toFixed(2)}
                  </div>
                </div>
                <div
                  className={`${theme.glass} rounded-xl p-4 border ${theme.border}`}
                >
                  <div className={`text-xs ${theme.textSecondary} mb-1`}>
                    Cost Price
                  </div>
                  <div className={`font-semibold ${theme.text}`}>
                    ${selectedProduct.costPrice.toFixed(2)}
                  </div>
                </div>
                <div
                  className={`${theme.glass} rounded-xl p-4 border ${theme.border}`}
                >
                  <div className={`text-xs ${theme.textSecondary} mb-1`}>
                    Profit Margin
                  </div>
                  <div className={`font-semibold ${theme.text}`}>
                    {(
                      ((selectedProduct.sellingPrice -
                        selectedProduct.costPrice) /
                        selectedProduct.sellingPrice) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
                {selectedProduct.expiryDate && (
                  <div
                    className={`${theme.glass} rounded-xl p-4 border ${theme.border}`}
                  >
                    <div className={`text-xs ${theme.textSecondary} mb-1`}>
                      Expiry Date
                    </div>
                    <div className={`font-semibold ${theme.text}`}>
                      {selectedProduct.expiryDate}
                    </div>
                  </div>
                )}
                <div
                  className={`${theme.glass} rounded-xl p-4 border ${theme.border}`}
                >
                  <div className={`text-xs ${theme.textSecondary} mb-1`}>
                    Last Updated
                  </div>
                  <div className={`font-semibold ${theme.text}`}>
                    {selectedProduct.lastUpdated}
                  </div>
                </div>
              </div>
              {selectedProduct.description && (
                <div
                  className={`${theme.glass} rounded-xl p-4 border ${theme.border}`}
                >
                  <div className={`text-xs ${theme.textSecondary} mb-2`}>
                    Description
                  </div>
                  <p className={`${theme.text}`}>
                    {selectedProduct.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stock Adjustment Modal */}
      {showStockModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className={`${theme.cardBg} rounded-2xl border ${theme.border} max-w-md w-full shadow-2xl`}
          >
            <div className="sticky top-0 bg-gradient-to-r from-[#9b5cff] to-[#ff3db0] p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">Adjust Stock</h2>
              <button
                onClick={() => setShowStockModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div
                className={`${theme.glass} rounded-xl p-4 border ${theme.border}`}
              >
                <div className={`text-sm ${theme.textSecondary} mb-1`}>
                  Product
                </div>
                <div className={`font-bold ${theme.text}`}>
                  {selectedProduct.name}
                </div>
                <div className={`text-sm ${theme.textSecondary} mt-2`}>
                  Current Stock:{" "}
                  <span className={`font-semibold ${theme.text}`}>
                    {selectedProduct.stockQuantity}{" "}
                    {selectedProduct.unitOfMeasure}
                  </span>
                </div>
              </div>
              <div>
                <label
                  className={`block text-sm font-semibold ${theme.text} mb-2`}
                >
                  Adjustment Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() =>
                      setStockAdjustment({
                        ...stockAdjustment,
                        type: "increase",
                      })
                    }
                    className={`py-3 rounded-lg font-semibold transition-all ${
                      stockAdjustment.type === "increase"
                        ? "bg-emerald-500 text-white"
                        : `${theme.cardBg} ${theme.text} border ${theme.border}`
                    }`}
                  >
                    Increase
                  </button>
                  <button
                    onClick={() =>
                      setStockAdjustment({
                        ...stockAdjustment,
                        type: "decrease",
                      })
                    }
                    className={`py-3 rounded-lg font-semibold transition-all ${
                      stockAdjustment.type === "decrease"
                        ? "bg-red-500 text-white"
                        : `${theme.cardBg} ${theme.text} border ${theme.border}`
                    }`}
                  >
                    Decrease
                  </button>
                  <button
                    onClick={() =>
                      setStockAdjustment({
                        ...stockAdjustment,
                        type: "adjustment",
                      })
                    }
                    className={`py-3 rounded-lg font-semibold transition-all ${
                      stockAdjustment.type === "adjustment"
                        ? "bg-[#9b5cff] text-white"
                        : `${theme.cardBg} ${theme.text} border ${theme.border}`
                    }`}
                  >
                    Set To
                  </button>
                </div>
              </div>
              <div>
                <label
                  className={`block text-sm font-semibold ${theme.text} mb-2`}
                >
                  Quantity
                </label>
                <input
                  type="number"
                  min="0"
                  value={stockAdjustment.quantity}
                  onChange={(e) =>
                    setStockAdjustment({
                      ...stockAdjustment,
                      quantity: parseInt(e.target.value) || 0,
                    })
                  }
                  className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-semibold ${theme.text} mb-2`}
                >
                  Reason
                </label>
                <textarea
                  value={stockAdjustment.reason}
                  onChange={(e) =>
                    setStockAdjustment({
                      ...stockAdjustment,
                      reason: e.target.value,
                    })
                  }
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                  placeholder="Enter reason for adjustment"
                />
              </div>
              <div className={`flex gap-3 pt-4 border-t ${theme.border}`}>
                <button
                  onClick={() => setShowStockModal(false)}
                  className={`flex-1 px-6 py-3 rounded-xl ${theme.cardBg} border ${theme.border} ${theme.hover} ${theme.text} font-semibold transition-all`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleStockAdjustment}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#9b5cff] to-[#ff3db0] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9b5cff]/30 transition-all"
                >
                  Adjust Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Update Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className={`${theme.cardBg} rounded-2xl border ${theme.border} max-w-md w-full shadow-2xl`}
          >
            <div className="sticky top-0 bg-gradient-to-r from-[#9b5cff] to-[#ff3db0] p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">Bulk Update</h2>
              <button
                onClick={() => setShowBulkModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div
                className={`${theme.glass} rounded-xl p-4 border ${theme.border}`}
              >
                <div className={`text-sm ${theme.textSecondary}`}>
                  {selectedProducts.length} products selected
                </div>
              </div>
              <div>
                <label
                  className={`block text-sm font-semibold ${theme.text} mb-2`}
                >
                  Field to Update
                </label>
                <select
                  value={bulkUpdate.field}
                  onChange={(e) =>
                    setBulkUpdate({
                      ...bulkUpdate,
                      field: e.target.value as any,
                      value: "",
                    })
                  }
                  className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                >
                  <option value="category">Category</option>
                  <option value="status">Status</option>
                  <option value="price">Selling Price</option>
                </select>
              </div>
              <div>
                <label
                  className={`block text-sm font-semibold ${theme.text} mb-2`}
                >
                  New Value
                </label>
                {bulkUpdate.field === "category" && (
                  <select
                    value={bulkUpdate.value}
                    onChange={(e) =>
                      setBulkUpdate({ ...bulkUpdate, value: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                )}
                {bulkUpdate.field === "status" && (
                  <select
                    value={bulkUpdate.value}
                    onChange={(e) =>
                      setBulkUpdate({ ...bulkUpdate, value: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                  >
                    <option value="">Select status</option>
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Discontinued">Discontinued</option>
                  </select>
                )}
                {bulkUpdate.field === "price" && (
                  <input
                    type="number"
                    step="0.01"
                    value={bulkUpdate.value}
                    onChange={(e) =>
                      setBulkUpdate({ ...bulkUpdate, value: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                    placeholder="Enter new price"
                  />
                )}
              </div>
              <div className={`flex gap-3 pt-4 border-t ${theme.border}`}>
                <button
                  onClick={() => setShowBulkModal(false)}
                  className={`flex-1 px-6 py-3 rounded-xl ${theme.cardBg} border ${theme.border} ${theme.hover} ${theme.text} font-semibold transition-all`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkUpdate}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#9b5cff] to-[#ff3db0] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9b5cff]/30 transition-all"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stock Logs Modal */}
      {showLogsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className={`${theme.cardBg} rounded-2xl border ${theme.border} max-w-4xl w-full my-8 shadow-2xl`}
          >
            <div className="sticky top-0 bg-gradient-to-r from-[#9b5cff] to-[#ff3db0] p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">
                Stock Adjustment Logs
              </h2>
              <button
                onClick={() => setShowLogsModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                {stockLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`${theme.glass} rounded-xl p-4 border ${theme.border}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className={`font-bold ${theme.text} mb-1`}>
                          {log.productName}
                        </h3>
                        <p className={`text-sm ${theme.textSecondary}`}>
                          {log.reason}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          log.type === "increase"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : log.type === "decrease"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-[#9b5cff]/20 text-[#9b5cff]"
                        }`}
                      >
                        {log.type === "increase"
                          ? "Increased"
                          : log.type === "decrease"
                          ? "Decreased"
                          : "Adjusted"}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className={`${theme.textSecondary} text-xs mb-1`}>
                          Previous Stock
                        </div>
                        <div className={`${theme.text} font-semibold`}>
                          {log.previousStock}
                        </div>
                      </div>
                      <div>
                        <div className={`${theme.textSecondary} text-xs mb-1`}>
                          Quantity
                        </div>
                        <div className={`${theme.text} font-semibold`}>
                          {log.type === "increase"
                            ? "+"
                            : log.type === "decrease"
                            ? "-"
                            : ""}
                          {log.quantity}
                        </div>
                      </div>
                      <div>
                        <div className={`${theme.textSecondary} text-xs mb-1`}>
                          New Stock
                        </div>
                        <div className={`${theme.text} font-semibold`}>
                          {log.newStock}
                        </div>
                      </div>
                      <div>
                        <div className={`${theme.textSecondary} text-xs mb-1`}>
                          Date
                        </div>
                        <div className={`${theme.text} font-semibold`}>
                          {log.date}
                        </div>
                      </div>
                    </div>
                    <div className={`text-xs ${theme.textSecondary} mt-2`}>
                      By: {log.user}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Management Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className={`${theme.cardBg} rounded-2xl border ${theme.border} max-w-2xl w-full my-8 shadow-2xl`}
          >
            <div className="sticky top-0 bg-gradient-to-r from-[#9b5cff] to-[#ff3db0] p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">
                Category Management
              </h2>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div
                className={`${theme.glass} rounded-xl p-4 border ${theme.border}`}
              >
                <h3 className={`font-bold ${theme.text} mb-4`}>
                  Add New Category
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-semibold ${theme.text} mb-2`}
                    >
                      Category Name
                    </label>
                    <input
                      type="text"
                      value={newCategory.name}
                      onChange={(e) =>
                        setNewCategory({ ...newCategory, name: e.target.value })
                      }
                      className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                      placeholder="Enter category name"
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-semibold ${theme.text} mb-2`}
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      value={newCategory.description}
                      onChange={(e) =>
                        setNewCategory({
                          ...newCategory,
                          description: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:border-[#9b5cff] transition-all`}
                      placeholder="Enter description"
                    />
                  </div>
                  <button
                    onClick={handleAddCategory}
                    className="px-6 py-3 bg-gradient-to-r from-[#9b5cff] to-[#ff3db0] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9b5cff]/30 transition-all"
                  >
                    Add Category
                  </button>
                </div>
              </div>
              <div>
                <h3 className={`font-bold ${theme.text} mb-4`}>
                  Existing Categories
                </h3>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className={`${theme.glass} rounded-xl p-4 border ${theme.border} flex items-center justify-between`}
                    >
                      <div>
                        <div className={`font-semibold ${theme.text}`}>
                          {cat.name}
                        </div>
                        <div className={`text-sm ${theme.textSecondary}`}>
                          {cat.description}
                        </div>
                        <div className={`text-xs ${theme.textSecondary} mt-1`}>
                          {cat.count} products
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Delete category "${cat.name}"?`)) {
                            setCategories(
                              categories.filter((c) => c.id !== cat.id)
                            );
                            addNotification("Category deleted", "success");
                          }
                        }}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Column Settings Modal */}
      {showColumnModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className={`${theme.cardBg} rounded-2xl border ${theme.border} max-w-md w-full shadow-2xl`}
          >
            <div className="sticky top-0 bg-gradient-to-r from-[#9b5cff] to-[#ff3db0] p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">Column Settings</h2>
              <button
                onClick={() => setShowColumnModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className={`text-sm ${theme.textSecondary} mb-4`}>
                Select which columns to display in the table view
              </p>
              {Object.entries(visibleColumns).map(([key, value]) => (
                <label
                  key={key}
                  className={`flex items-center justify-between p-3 rounded-lg ${theme.glass} border ${theme.border} cursor-pointer hover:border-[#9b5cff]/60 transition-all`}
                >
                  <span className={`font-semibold ${theme.text} capitalize`}>
                    {key}
                  </span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setVisibleColumns({
                        ...visibleColumns,
                        [key]: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-[#9b5cff] accent-[#9b5cff]"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className={`${theme.cardBg} rounded-2xl border ${theme.border} max-w-lg w-full shadow-2xl`}
          >
            <div className="sticky top-0 bg-gradient-to-r from-[#9b5cff] to-[#ff3db0] p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">Import Products</h2>
              <button
                onClick={() => setShowImportModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div
                className={`${theme.glass} rounded-xl p-6 border ${theme.border} text-center`}
              >
                <Upload
                  className={`w-16 h-16 ${theme.textSecondary} mx-auto mb-4`}
                />
                <h3 className={`text-lg font-bold ${theme.text} mb-2`}>
                  Upload CSV File
                </h3>
                <p className={`text-sm ${theme.textSecondary} mb-4`}>
                  Upload a CSV file with the following columns:
                </p>
                <div
                  className={`text-xs ${theme.textSecondary} mb-6 text-left max-w-md mx-auto`}
                >
                  <p className="mb-1">
                    Name, SKU, Category, Brand, Stock, Unit, Cost Price, Selling
                    Price, Status
                  </p>
                </div>
                <label className="inline-block px-6 py-3 bg-gradient-to-r from-[#9b5cff] to-[#ff3db0] text-white rounded-xl font-semibold cursor-pointer hover:shadow-lg hover:shadow-[#9b5cff]/30 transition-all">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleImportCSV}
                    className="hidden"
                  />
                  Choose File
                </label>
              </div>
              <div
                className={`${theme.glass} rounded-xl p-4 border ${theme.border}`}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className={`text-sm ${theme.textSecondary}`}>
                    <p className="font-semibold text-amber-400 mb-1">
                      Important:
                    </p>
                    <p>
                      Make sure your CSV file matches the expected format.
                      Invalid rows will be skipped.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInventory;
