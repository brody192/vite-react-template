// src/App.jsx
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import OrderPage from './pages/OrderPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import Footer from "./components/Footer.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactUsPage from "./pages/ContactUsPage.jsx";
import UpdateProfilePage from "@/pages/UpdateProfilePage.jsx";
import {useAuth} from "@/contexts/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth(); // Access the user from the AuthContext
    // Check if the user is authenticated and has the 'admin' role
    // Adjust the role check as necessary based on your application's requirements
    const isAdmin = user && user.role === 'admin';

    return isAdmin ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactUsPage />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/profile" element={<UpdateProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
