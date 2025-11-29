// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import faIR from 'antd/locale/fa_IR';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';

// صفحات عمومی
import { Login } from './pages/auth/login';
import { Register } from './pages/auth/Register';

// داشبورد کشاورز
import { FarmerDashboardLayout } from './pages/farmer/dashbord/FarmerDashboardLayout';
import { Overview } from "./pages/farmer/dashbord/Overview";
import { Marketplace } from "./pages/farmer/dashbord/Marketplace";
import { MarketRates } from "./pages/farmer/dashbord/MarketRates";
import { MyLands } from "./pages/farmer/dashbord/MyLands";
import { Services } from "./pages/farmer/dashbord/Services";
import { LabTests } from "./pages/farmer/dashbord/LabTests";
import { Messages } from "./pages/farmer/dashbord/Messages";
import { Settings } from "./pages/farmer/dashbord/Settings";

// Buyer Dashboard
import BuyerDashboardLayout from "./pages/buyer/BuyerDashboardLayout";
import BuyerOverview from "./pages/buyer/Overview";
import MyOrders from "./pages/buyer/MyOrders";
import SavedAds from "./pages/buyer/SavedAds";
import Suppliers from "./pages/buyer/Suppliers";
import MarketPlace from "./pages/buyer/MarketPlace";
import BuyRequests from "./pages/buyer/BuyRequests";
import Analytics from "./pages/buyer/Analytics";
import PriceComparison from "./pages/buyer/PriceComparison";
import Bayer_Messages from "./pages/buyer/Bayer_Messages";
import Buyer_Settings from "./pages/buyer/Buyer_Settings";

// Services Dashboard
import ServicesLayout from "./pages/services/ServicesLayout";
import ServicesDashboard from "./pages/services/ServicesDashboard";
import ManageServices from "./pages/services/ManageServices";
import ServiceRequests from "./pages/services/ServiceRequests";
import ServicesMessages from "./pages/services/ServicesMessages";
import ServicesAnalytics from "./pages/services/ServicesAnalytics";
// ✅ اصلاح شده - import صحیح
import  ServicesSettings  from "./pages/services/ServicesSettings";



import NotFound404 from './pages/NotFound404';


// استایل مپ
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <ConfigProvider
      locale={faIR}
      direction="rtl"
      theme={{
        token: {
          colorPrimary: '#328E6E', // رنگ اصلی پروژه
          borderRadius: 8,
          fontFamily: 'IRANSans, Tahoma, Arial',
        },
      }}
    >
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* مسیرهای عمومی - احراز هویت */}
            <Route path="/login" element={<Login />} />
            <Route path="/Register" element={<Register />} />

            {/* مسیرهای محافظت‌شده کشاورز */}
            <Route
              path="/farmer/dashboard"
              element={
                <ProtectedRoute>
                  <FarmerDashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Overview />} />
              <Route path="products" element={<Marketplace />} />
              <Route path="rates" element={<MarketRates />} />
              <Route path="lands" element={<MyLands />} />
              <Route path="services" element={<Services />} />
              <Route path="lab-tests" element={<LabTests />} />
              <Route path="messages" element={<Messages />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* مسیرهای داشبورد خریدار */}
            <Route
              path="/buyer/dashboard"
              element={
                <ProtectedRoute>
                  <BuyerDashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<BuyerOverview />} />
              <Route path="orders" element={<MyOrders />} />
              <Route path="saved" element={<SavedAds />} />
              <Route path="bayerMessages" element={<Bayer_Messages />} />
              <Route path="bayersetting" element={<Buyer_Settings />} />
              <Route path="suppliers" element={<Suppliers />} />
              <Route path="marketplace" element={<MarketPlace />} />
              <Route path="buy-requests" element={<BuyRequests />} />
              <Route path="MyOrders" element={<MyOrders />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="PriceComparison" element={<PriceComparison />} />
            </Route>

            {/* پنل خدمات */}
            <Route path="/services" element={<ServicesLayout />}>
              <Route path="dashboard" element={<ServicesDashboard />} />
              <Route path="manage" element={<ManageServices />} />
              <Route path="requests" element={<ServiceRequests />} />
              <Route path="messages" element={<ServicesMessages />} />
              <Route path="analytics" element={<ServicesAnalytics />} />
              {/* ✅ حالا به کامپوننت صحیح اشاره می‌کند */}
              <Route path="settings" element={<ServicesSettings />} />
            </Route>

            {/* Redirect پیش‌فرض */}
            <Route path="/" element={<Navigate to="/farmer/dashboard" replace />} />

            {/* صفحه 404 */}
          
            <Route path="*" element={<NotFound404 />} />
 
          
    
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;