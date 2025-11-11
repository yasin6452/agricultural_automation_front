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
              path="/farmer"
              element={
                <ProtectedRoute>
                  <FarmerDashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="" element={<Navigate to="dashboard" replace />} />
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
