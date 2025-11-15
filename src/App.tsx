// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import faIR from 'antd/locale/fa_IR';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';

// صفحات عمومی
import { PhoneLogin } from './pages/auth/PhoneLogin';
import { VerifyOTP } from './pages/auth/VerifyOTP';
import { CompleteProfile } from './pages/auth/CompleteProfile';
import { SelectRole } from './pages/auth/SelectRole';
import { CompleteFarmerForm } from './pages/farmer/CompleteFarmerProfile';

// داشبورد کشاورز
import { FarmerDashboardLayout } from './pages/farmer/dashbord/FarmerDashboardLayout';
import  Overview  from "./pages/farmer/dashbord/Overview";
import { Marketplace } from "./pages/farmer/dashbord/Marketplace";
import { MarketRates } from "./pages/farmer/dashbord/MarketRates";
import { MyLands } from "./pages/farmer/dashbord/MyLands";
import { Consultation } from "./pages/farmer/dashbord/Consultation";
import { LabTests } from "./pages/farmer/dashbord/LabTests";
import { Messages } from "./pages/farmer/dashbord/Messages";
import { Settings } from "./pages/farmer/dashbord/Settings";


// Buyer Dashboard
import { BuyerDashboardLayout } from "./pages/buyer/BuyerDashboardLayout";
import BuyerOverview from "./pages/buyer/Overview";
import { MyOrders } from "./pages/buyer/MyOrders";
import { MarketRates as BuyerMarketRates } from "./pages/buyer/MarketRates";
import { SavedAds } from "./pages/buyer/SavedAds";
import { Messages as BuyerMessages } from "./pages/buyer/Messages";
import { Settings as BuyerSettings } from "./pages/buyer/Settings";


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
            <Route path="/login" element={<PhoneLogin />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/select-role" element={<SelectRole />} />
            <Route path="/complete-profile/farmer" element={<CompleteFarmerForm />} />

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
                <Route path="consultation" element={<Consultation />} />
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
              <Route path="rates" element={<BuyerMarketRates />} />
              <Route path="messages" element={<BuyerMessages />} />
              <Route path="settings" element={<BuyerSettings />} />
            </Route>

            {/* Redirect پیش‌فرض */}
            <Route path="/" element={<Navigate to="/farmer/dashboard" replace />} />

            {/* صفحه 404 */}
            <Route
              path="*"
              element={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#555',
                  }}
                >
                  صفحه پیدا نشد!
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
