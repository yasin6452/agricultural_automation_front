import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import faIR from 'antd/locale/fa_IR';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { PhoneLogin } from './pages/auth/PhoneLogin';
import { VerifyOTP } from './pages/auth/VerifyOTP';
import { CompleteProfile } from './pages/auth/CompleteProfile';
import { Dashboard } from './pages/Dashboard';
import { SelectRole} from './pages/auth/SelectRole'

function App() {
  return (
    <ConfigProvider
      locale={faIR}
      direction="rtl"
      theme={{
        token: {
          colorPrimary: '#328E6E',
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

            {/* مسیرهای محافظت شده */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Redirect از صفحه اصلی */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* صفحه 404 */}
            <Route
              path="*"
              element={
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  fontSize: '24px'
                }}>
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