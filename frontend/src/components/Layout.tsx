import { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Phone, MapPin, Mail, ChevronDown, X } from "lucide-react";

import { Home, User, Users, Shield, UserPlus} from 'lucide-react';
import { Stethoscope } from 'lucide-react'; 
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
  const user = null; 
const logout = () => {};

  const { t } = useTranslation();
  const location = useLocation();
  useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}, [location.pathname]);

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

      const UserPortalDropdown = ({
        onItemClick,
      }: {
        onItemClick?: () => void;
      }) => (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button className={`w-full ${orangePortalBtn}`}>
              User Portal <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="end"
        sideOffset={12}
        className="
          w-72
          rounded-2xl
          bg-white
          border border-gray-200
          shadow-[0_20px_40px_rgba(0,0,0,0.12)]
          p-3
          z-[9999]
        "
      >
        {/* ========= NAVIGATION ========= */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Navigation
          </p>

          <DropdownMenuItem asChild onSelect={onItemClick}>
            <Link
              to="/"
              className="
                flex items-center gap-3 px-4 py-2.5 rounded-xl
                text-sm font-medium text-gray-900
                hover:bg-gray-100
              "
            >
              <Home className="w-4 h-4 text-gray-600" />
              Home
            </Link>
          </DropdownMenuItem>
        </div>

        <div className="my-3 h-px bg-gray-200" />

        {/* ========= USER ACCESS ========= */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
            User Access
          </p>

          <DropdownMenuItem asChild onSelect={onItemClick}>
            <Link
              to="/login?role=migrant"
              className="
                flex items-center gap-3 px-4 py-2.5 rounded-xl
                text-sm text-gray-800
                hover:bg-gray-100
              "
            >
              <Users className="w-4 h-4 text-gray-600" />
              Migrant Login
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild onSelect={onItemClick}>
            <Link
              to="/login?role=doctor"
              className="
                flex items-center gap-3 px-4 py-2.5 rounded-xl
                text-sm text-gray-800
                hover:bg-gray-100
              "
            >
              <Stethoscope className="w-4 h-4 text-gray-600" />
              Doctor Login
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild onSelect={onItemClick}>
            <Link
              to="/login?role=admin"
              className="
                flex items-center gap-3 px-4 py-2.5 rounded-xl
                text-sm text-gray-800
                hover:bg-gray-100
              "
            >
              <Shield className="w-4 h-4 text-gray-600" />
              Admin Login
            </Link>
          </DropdownMenuItem>

          {/* REGISTER — PRIMARY ACTION */}
          <DropdownMenuItem asChild onSelect={onItemClick}>
            <Link
              to="/register"
              className="
                flex items-center gap-3 px-4 py-2.5 rounded-xl
                text-sm font-semibold
                text-[#1f11eb]
                hover:bg-[#1f11eb]/10
              "
            >
              <UserPlus className="w-4 h-4" />
              Register New User
            </Link>
          </DropdownMenuItem>
        </div>

        <div className="my-4 h-px bg-gray-200" />

        {/* ========= LANGUAGE ========= */}
        <div>
          <p className="px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Language
          </p>

          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="focus:bg-transparent cursor-default"
          >
            <div className="w-full flex justify-center py-1">
              <LanguageSwitcher />
            </div>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>



        </DropdownMenu>
      );


  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F9EFE3" }}>

      {/* Header  */}
        <header
          className="
            relative lg:fixed
            top-0 left-0 w-full
            z-50

            bg-gradient-to-r
            from-[#1b5338]
            via-[#24583b]
            to-[#2e5a44]

            lg:bg-none lg:bg-transparent

            lg:px-8
            lg:pt-4
            lg:pb-4
          "
        >

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

         
        {/* ================= MOBILE NAVBAR ================= */}
        <nav className="lg:hidden sticky top-0 z-50 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
       <Link to="/" className="flex items-center gap-2">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-white shrink-0">
            <img
              src={logoImage}
              alt="KerMedix Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center leading-none">
            <span
              className="
                text-[20px]
                font-extrabold
                tracking-tight
                text-white
              "
            >
              KerMedix
            </span>
          <span className="text-sm text-white/80 tracking-wide">
            Health Services
          </span>
          </div>
        </Link>



    {/* RIGHT SIDE ACTIONS */}
    <div className="flex items-center gap-2">

      {/* USER PORTAL */}
      <UserPortalDropdown onItemClick={() => setMobileMenuOpen(false)} />

      {/* HAMBURGER */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="text-white border-2 border-white p-2 rounded-md"
      >
        ☰
        
      </button>

    </div>
  </div>
</div>

  {/* ================= MOBILE DRAWER ================= */}
  <div
    className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 transform ${
      mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
    } transition-transform duration-300`}
    
  >
    
    <div className="w-72 bg-white h-full shadow-lg p-6 overflow-y-auto">

      {/* ===== HEADER (UNCHANGED AS REQUESTED) ===== */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl font-bold text-black">KerMedix Menu</div>
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="text-black p-2 rounded-md border border-black"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="space-y-8">
                
      <div className="mt-6"> <UserPortalDropdown onItemClick={() => setMobileMenuOpen(false)} /></div>

        {/* Navigation */}
        <div className="bg-emerald-50 rounded-2xl p-4 space-y-3">
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
            Navigation
          </p>

          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="
                flex items-center gap-4 px-4 py-3 rounded-xl
                bg-white border border-emerald-200
                hover:bg-emerald-100 transition
              "
            >
              <Users className="w-4 h-4 text-emerald-600" />
              <span className="font-medium text-black">{item.name}</span>
            </Link>
          ))}
        </div>


        {/* Services */}
        <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            Services
          </p>

          {services.map((s) => (
            <Link
              key={s.name}
              to={s.href}
              onClick={() => setMobileMenuOpen(false)}
              className="
                flex items-center gap-4 px-4 py-3 rounded-xl
                bg-white border shadow-sm
                hover:shadow-md active:scale-[0.98]
                transition
              "
            >
              <Stethoscope className="w-4 h-4 text-[#355f4a]" />
              <span className="text-black">{s.name}</span>
            </Link>
          ))}
        </div>

        {/* Miscellaneous */}
        <div className="bg-gray-100 rounded-2xl p-4 space-y-3">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">
            Miscellaneous
          </p>

          {miscellaneous.map((m) => (
            <Link
              key={m.name}
              to={m.href}
              onClick={() => setMobileMenuOpen(false)}
              className="
                flex items-center justify-between px-4 py-3 rounded-xl
                bg-white border hover:bg-gray-50 transition
              "
            >
              <span className="text-black">{m.name}</span>
              <ChevronDown className="w-4 h-4 rotate-[-90deg] text-gray-400" />
            </Link>
          ))}
        </div>

        {/* Downloads */}
        <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wide">
            Downloads
          </p>

          {downloads.map((d) => (
            <Link
              key={d.name}
              to={d.href}
              onClick={() => setMobileMenuOpen(false)}
              className="
                flex items-center gap-4 px-4 py-3 rounded-xl
                bg-white border hover:bg-slate-100 transition
              "
            >
              <Shield className="w-4 h-4 text-slate-600" />
              <span className="text-black">{d.name}</span>
            </Link>
          ))}
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
        {/* Animated Background Grid */}
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

        {/* Ambient Glow */}
        <motion.div
          className="absolute -top-40 left-1/2 -translate-x-1/2
                    w-[500px] h-[500px] bg-gray-500/10
                    rounded-full blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-7 ">

          {/* Divider */}
          <motion.div
            className="h-[2px] w-full bg-gradient-to-r
                      from-transparent via-white to-transparent
                      mb-16 pointer-events-none"
            animate={{ opacity: [0.35, 0.8, 0.35] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

            {/* Brand Section */}
            <motion.div
              className="md:col-span-2 space-y-7"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 160 }}
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
                  <h2 className="text-3xl font-extrabold">KerMedix</h2>
                  <p className="text-l text-gray-400 hover:text-[#ff6200]">
                    Digital Public Health Platform
                  </p>
                </div>
              </div>

              <p className="text-white max-w-xl leading-relaxed ">
                
                Empowering inclusive healthcare access for migrant workers
                through secure digital health records and telemedicine.
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 text-white">
                  <Phone className="w-6 h-6 text-emerald-400 mt-1" />
                  <div className="flex flex-col">
                    <a href="tel:+917848091884" className="hover:text-emerald-400">
                      +91-7848091884
                    </a>
                    <a href="tel:+917847810210" className="hover:text-emerald-400">
                      +91-7847810210
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-white">
                  <Mail className="w-6 h-6 text-orange-400" />
                  <a
                    href="mailto:kermedix.Dhrms@gmail.com?subject=Support%20Request&body=Hello%20Kermedix%20Team,"
                    className="hover:text-orange-400"
                  >
                    kermedix.Dhrms@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-3 text-white">
                  <MapPin className="w-6 h-6 text-blue-400" />
                  <a
                    href="https://maps.app.goo.gl/6BxwSDMjFTmbcNLr8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#3083ff] transition-colors font-medium"
                  >
                     Kerala, India
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div className="space-y-6">
              <h4 className="text-3xl font-semibold tracking-wide">
                Services
              </h4>

              <ul className="space-y-3">
                {services.map((s) => (
                  <li key={s.name}>
                    <Link
                      to={s.href}
                      onClick={scrollToTop}
                      className="footer-link"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div className="space-y-6">
              <h4 className="text-3xl font-semibold tracking-wide">
                Quick Links
              </h4>

              <ul className="space-y-3">
                {[
                  { name: "Help", href: "/help" },
                  { name: "FAQs", href: "/faq" },
                  { name: "Contact", href: "/contact" },
                  { name: "User Portal", href: "/login" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={scrollToTop}
                      className="footer-link"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>

        {/* Built with Love – Liquid Capsule */}
        <div className="relative z-10 max-w-7xl mx-auto px-50 py-8 flex justify-center">
          <div className="relative w-fit overflow-hidden rounded-full border border-white/20 shadow-xl">

            
            <motion.div
              className="absolute inset-0 liquid-wave"
              animate={{
                backgroundPositionX: ["0%", "200%"],
                backgroundPositionY: ["0%", "20%", "0%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            
            <div className="relative px-10 py-4 backdrop-blur-xl bg-black/40 rounded-full">
              <div className="flex items-center gap-3 text-sm sm:text-base text-gray-200">

                <span>Built with</span>

                <motion.span
                  className="text-red-500 font-semibold"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  ♥
                </motion.span>

                <span>by</span>
                <span className="text-white font-medium">Sai</span>
                <span className="text-white">×</span>
                <span className="text-white font-medium">Ashu</span>

              </div>
            </div>
          </div>
        </div>        
       

        {/* Marquee */}
        <div className="w-full bg-black border-t border-gray-700
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
          .footer-link {
            position: relative;
            color: #9ca3af;
            font-size: 15px;
            transition: color 0.25s ease, transform 0.25s ease;
          }

          .footer-link::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -4px;
            width: 0%;
            height: 1px;
            background: white;
            transition: width 0.25s ease;
          }

          .footer-link:hover {
            color: white;
            transform: translateX(6px);
          }

          .footer-link:hover::after {
            width: 100%;
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
