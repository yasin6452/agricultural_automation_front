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
