import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { FloatingCart } from './components/FloatingCart';
import { Home } from './pages/Home';
import { Features } from './pages/Features';
import { HowItWorks } from './pages/HowItWorks';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';
import { Cart } from './pages/Cart';
import { Coupons } from './pages/Coupons';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/features" element={<Features />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/coupons" element={<Coupons />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
            <FloatingCart />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;