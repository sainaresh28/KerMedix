import { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Phone, MapPin, Mail, ChevronDown, X } from "lucide-react";
// import { HoverDropdownMenu } from "@/components/ui/dropdown-menu";
import { User, Users, Shield, UserPlus} from 'lucide-react';
import { Stethoscope } from 'lucide-react'; // or use Activity icon if Stethoscope is not available
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoImage from '@/assets/logo.png'; 

import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = null; // temporary stub
const logout = () => {};

  const { t } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (location.pathname.startsWith('/dashboard')) {
    return <>{children}</>;
  }

  const navigation = [
    { name: t('nav.home'), href: "/" },
    { name: t('nav.about'), href: "/about" },
    { name: "News", href: "/news" },
    { name: "Gallery", href: "/gallery" },
    { name: t('nav.contact'), href: "/contact" },
  ];

  const services = [
    { name: "Digital Health Records", href: "/services/health-records" },
    { name: "Health Screening", href: "/services/screening" },
    { name: "Telemedicine", href: "/services/telemedicine" },
    { name: "Vaccination Services", href: "/services/vaccination" },
  ];

  const miscellaneous = [
    { name: "Policies", href: "/policies" },
    { name: "Guidelines", href: "/guidelines" },
    { name: "Resources", href: "/resources" },
    { name: "Forms", href: "/forms" },
  ];

  const downloads = [
    { name: "User Manual", href: "/downloads/manual" },
    { name: "Health Forms", href: "/downloads/forms" },
    { name: "Reports", href: "/downloads/reports" },
    { name: "Certificates", href: "/downloads/certificates" },
  ];
const orangePortalBtn =
    "bg-orange-500 hover:bg-orange-600 text-black font-extrabold tracking-wide border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:scale-105 transition-all font-[Poppins]";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F9EFE3" }}>

      {/* Header - Glassmorphic on desktop only */}
      <header className="lg:px-8 lg:py-4 sticky top-0 z-50" style={{ backgroundColor: "#F9EFE3" }}>

        {/* Desktop capsule header */}
        <div className="hidden lg:block">
          <nav className="max-w-8xl mx-auto bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-black-200 px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-white">
                    <img 
                      src={logoImage} 
                      alt="KerMedix Logo" 
                      className="min-w-full min-h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-black">KerMedix</div>
                    <div className="text-sm text-gray-600">Health Services</div>
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="flex ml-10 items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors relative ${
                      location.pathname === item.href
                        ? "text-black font-bold border-b-2 border-black"
                        : "text-black hover:text-gray-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Dropdowns */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="px-3 py-2 text-sm font-medium text-black hover:text-gray-700 flex items-center gap-1">
                    Services <ChevronDown className="h-3 w-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border-2 border-black z-50">
                    {services.map((service) => (
                      <DropdownMenuItem key={service.name} asChild>
                        <Link to={service.href} className="text-black hover:bg-gray-100 cursor-pointer">
                          {service.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="px-3 py-2 text-sm font-medium text-black hover:text-gray-700 flex items-center gap-1">
                    Miscellaneous <ChevronDown className="h-3 w-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border-2 border-black z-50">
                    {miscellaneous.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link to={item.href} className="text-black hover:bg-gray-100 cursor-pointer">
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="px-3 py-2 text-sm font-medium text-black hover:text-gray-700 flex items-center gap-1">
                    Downloads <ChevronDown className="h-3 w-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border-2 border-black z-50">
                    {downloads.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link to={item.href} className="text-black hover:bg-gray-100 cursor-pointer">
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Right Side - Language & Portal */}
              <div className="flex items-center space-x-4">
                <LanguageSwitcher />

                {user ? (
                  // User is logged in - single dropdown with name
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white rounded-full">
                        {user.name} <ChevronDown className="ml-1 h-4 w-4" />  
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border-2 border-black z-50 w-48">
                      <DropdownMenuItem disabled className="text-500 text-xs font-semibold">
                        logged in as {user.role.charAt(0).toUpperCase() + user.role.slice(1)} 
                      </DropdownMenuItem>
                      <div className="border-t border-gray-300 my-1"></div>
                      <DropdownMenuItem asChild>
                        <Link to={`/dashboard/${user.role}`} className="text-black hover:bg-gray-100 cursor-pointer font-medium">
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <button onClick={logout} className="w-full text-left text-black hover:bg-gray-100 cursor-pointer font-medium">
                          Logout
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  // User is not logged in - show login portal
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button className={orangePortalBtn}>
                      User Portal <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border-2 border-black z-50 w-48">
                      <DropdownMenuItem asChild>
                        <Link to="/login?role=migrant" className="text-black hover:bg-gray-100 cursor-pointer font-medium">
                          Migrant Login
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/login?role=doctor" className="text-black hover:bg-gray-100 cursor-pointer font-medium">
                          Doctor Login
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/login?role=admin" className="text-black hover:bg-gray-100 cursor-pointer font-medium">
                          Admin Login
                        </Link>
                      </DropdownMenuItem>
                      <div className="border-t border-gray-300 my-1"></div>
                      <DropdownMenuItem asChild>
                        <Link to="/register" className="text-black hover:bg-gray-100 cursor-pointer font-medium">
                          Register New User
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </nav>
        </div>

        {/* Mobile header - unchanged */}
        <nav className="lg:hidden shadow-sm sticky top-0 z-50" style={{ backgroundColor: "#F9EFE3" }} >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-white">
                    <img 
                      src={logoImage} 
                      alt="KerMedix Logo" 
                      className="min-w-full min-h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-black">KerMedix</div>
                    <div className="text-sm text-gray-600">Health Services</div>
                  </div>
                </Link>
              </div>

              {/* Mobile Hamburger */}
              <div className="flex items-center">
                <button
                  className="text-black border-2 border-black p-2 rounded-md"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  ☰
                </button>
              </div>
            </div>

            {/* Mobile Drawer */}
            <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
              <div className="w-72 bg-white h-full shadow-lg p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-xl font-bold text-black">KerMedix Menu</div>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-black p-2 rounded-md border border-black">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Navigation */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">Navigation</h4>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block py-2 px-2 text-black hover:bg-gray-100 rounded"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Services */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">Services</h4>
                    {services.map((s) => (
                      <Link
                        key={s.name}
                        to={s.href}
                        className="block py-2 px-2 text-black hover:bg-gray-100 rounded"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>

                  {/* Miscellaneous */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">Miscellaneous</h4>
                    {miscellaneous.map((m) => (
                      <Link
                        key={m.name}
                        to={m.href}
                        className="block py-2 px-2 text-black hover:bg-gray-100 rounded"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {m.name}
                      </Link>
                    ))}
                  </div>

                  {/* Downloads */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">Downloads</h4>
                    {downloads.map((d) => (
                      <Link
                        key={d.name}
                        to={d.href}
                        className="block py-2 px-2 text-black hover:bg-gray-100 rounded"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {d.name}
                      </Link>
                    ))}
                  </div>

                  {/* Language & User Portal */}
                  <div className="mt-6 border-t border-gray-300 pt-4 space-y-4">
                    <LanguageSwitcher />

                    {user ? (
                      // User is logged in
                      <div className="flex flex-col items-start gap-2">
                        <span className="font-medium text-black">
                          {user.name} - <span className="text-gray-600">Logged in as {user.role}</span>
                        </span>
                        <Button
                          variant="outline"
                          className="w-full border-2 border-black text-black hover:bg-black hover:text-white"
                          onClick={logout}
                        >
                          Logout
                        </Button>
                      </div>
                    ) : (
                      // User is not logged in
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                      <Button className={`w-full ${orangePortalBtn}`}>
                        User Portal <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white border-2 border-black z-50 w-full">
                          <DropdownMenuItem asChild>
                            <Link
                              to="/login?role=migrant"
                              className="text-black hover:bg-gray-100 cursor-pointer font-medium"
                            >
                              Migrant Login
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              to="/login?role=doctor"
                              className="text-black hover:bg-gray-100 cursor-pointer font-medium"
                            >
                              Doctor Login
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              to="/login?role=admin"
                              className="text-black hover:bg-gray-100 cursor-pointer font-medium"
                            >
                              Admin Login
                            </Link>
                          </DropdownMenuItem>
                          <div className="border-t border-gray-300 my-1"></div>
                          <DropdownMenuItem asChild>
                            <Link
                              to="/register"
                              className="text-black hover:bg-gray-100 cursor-pointer font-medium"
                            >
                              Register New User
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">{children}</main>

 {/* ================= FOOTER ================= */}
      <footer
        className="
          relative bg-black text-white overflow-hidden
          mx-4 mt-12 mb-6 rounded-3xl
        "
        style={{ clipPath: "inset(0 round 1.5rem)" }}
      >
        {(() => {
          const scrollToTop = () => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          };

          return (
            <>
              {/*Animated Background Grid */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: "60px 60px",
                }}
              />

              {/*Ambient Glow */}
              <motion.div
                className="absolute -top-40 left-1/2 -translate-x-1/2
                          w-[500px] h-[500px] bg-gray-500/10
                          rounded-full blur-3xl pointer-events-none"
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
              />

              {/* CONTENT */}
              <div className="relative z-10 max-w-7xl mx-auto px-7 py-14">

                {/* Divider */}
                <motion.div
                  className="h-[2px] w-full bg-gradient-to-r
                            from-transparent via-white to-transparent
                            mb-16 pointer-events-none"
                  animate={{ opacity: [0.35, 0.8, 0.35] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                  {/* Brand */}
                  <motion.div
                    className="md:col-span-2 space-y-6"
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 180 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-white
                                      flex items-center justify-center shadow-xl">
                        <img
                          src={logoImage}
                          alt="KerMedix Logo"
                          className="w-10 h-10"
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl font-extrabold">KerMedix</h2>
                        <p className="text-sm text-gray-400">
                          Digital Public Health Platform
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-400 max-w-lg leading-relaxed">
                      Empowering inclusive healthcare access for migrant workers
                      through secure digital health records and telemedicine.
                    </p>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3 text-gray-300">
                        <Phone className="w-4 h-4 text-emerald-400 mt-1" />
                        <div className="flex flex-col">
                          <a href="tel:+917848091884" className="hover:text-emerald-400">
                            +91-7848091884
                          </a>
                          <a href="tel:+7847810210" className="hover:text-emerald-400">
                            +91-7847810210
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-gray-300">
                        <Mail className="w-4 h-4 text-orange-400" />
                        <a
                          href="mailto:kermedix.Dhrms@gmail.com?subject=Support%20Request&body=Hello%20Kermedix%20Team,"
                          className="hover:text-orange-400"
                        >
                          kermedix.Dhrms@gmail.com
                        </a>
                      </div>

                      <div className="flex items-center gap-3 text-gray-300">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        Kerala, India
                      </div>
                    </div>
                  </motion.div>

                  {/* Services Card */}
                  <motion.div className="footer-card" whileHover={{ y: -6 }}>
                    <h4 className="footer-card-title">Services</h4>
                    <ul className="footer-card-list">
                      {services.map((s) => (
                        <li key={s.name}>
                          <Link
                            to={s.href}
                            onClick={scrollToTop}
                            className="footer-card-link"
                          >
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Quick Links Card */}
                  <motion.div className="footer-card" whileHover={{ y: -6 }}>
                    <h4 className="footer-card-title">Quick Links</h4>
                    <ul className="footer-card-list">
                      <li>
                        <Link to="/help" onClick={scrollToTop} className="footer-card-link">
                          Help
                        </Link>
                      </li>
                      <li>
                        <Link to="/faq" onClick={scrollToTop} className="footer-card-link">
                          FAQs
                        </Link>
                      </li>
                      <li>
                        <Link to="/contact" onClick={scrollToTop} className="footer-card-link">
                          Contact
                        </Link>
                      </li>
                      <li>
                        <Link to="/login" onClick={scrollToTop} className="footer-card-link">
                          User Portal
                        </Link>
                      </li>
                    </ul>
                  </motion.div>

                </div>
              </div>

              {/* Built with Love  */}
              <div className="relative z-10 max-w-7xl mx-auto px-6 py-4">
                <div className="border-t border-white/10 pt-3 flex justify-center">
                  <div className="flex items-center gap-2 text-sm sm:text-base text-gray-300">

                    <span>Built with</span>

                    <motion.span
                      aria-label="love"
                      className="text-red-500 font-semibold"
                      animate={{ scale: [1, 1.12, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                   >
                      ♥
                    </motion.span>
                    <span>by</span>

                    <span className="text-white font-medium">Sai</span>
                    <span className="text-gray-500">×</span>
                    <span className="text-white font-medium">Ashu</span>

                  </div>
                </div>
              </div>

              {/* Marquee */}
              <div className="w-full bg-black border-t-2 border-gray-700
                              overflow-hidden relative h-32">
                <div className="absolute top-1/2 -translate-y-1/2
                                flex animate-marquee whitespace-nowrap
                                pointer-events-none">
                  <span
                    className="text-white text-5xl"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    © 2026 KerMedix Health Services. All rights reserved. &nbsp;
                    © 2026 KerMedix Health Services. All rights reserved. &nbsp;
                  </span>
                </div>
              </div>

              {/* Styles */}
              <style>{`
                .footer-card {
                  background: rgba(255,255,255,0.06);
                  backdrop-filter: blur(12px);
                  border: 1px solid rgba(255,255,255,0.12);
                  border-radius: 18px;
                  padding: 28px;
                  transition: transform 0.3s ease;
                }

                .footer-card-title {
                  font-size: 18px;
                  font-weight: 700;
                  margin-bottom: 18px;
                }

                .footer-card-list {
                  display: flex;
                  flex-direction: column;
                  gap: 14px;
                }

                .footer-card-link {
                  position: relative;
                  color: #9ca3af;
                  padding-left: 14px;
                  transition: color 0.25s ease, padding-left 0.25s ease;
                }

                .footer-card-link::before {
                  content: "›";
                  position: absolute;
                  left: 0;
                  opacity: 0;
                  transform: translateX(-4px);
                  transition: all 0.25s ease;
                  color: white;
                }

                .footer-card-link:hover {
                  color: white;
                  padding-left: 18px;
                }

                .footer-card-link:hover::before {
                  opacity: 1;
                  transform: translateX(0);
                }
              `}</style>
            </>
          );
        })()}
      </footer>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, -50%, 0);
          }
          100% {
            transform: translate3d(-50%, -50%, 0);
          }
        }
        
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        
        .animate-marquee span {
          display: inline-block;
        }
      `}</style>
    </div>
  );
};


export default Layout;
