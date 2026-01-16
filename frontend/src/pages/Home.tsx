import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsSection from "@/components/StatsSection";
import FeatureShowcase from "@/components/FeatureShowcase";
import TestimonialSection from "@/components/TestimonialSection";
import InteractiveMap from "@/components/InteractiveMap";
import NewsTicker from "@/components/NewsTicker";
import BentoShowcase from "@/components/BentoShowcase";

import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Heart, Users, Clock, CheckCircle, FileText } from "lucide-react";
import { useMediaQuery } from "react-responsive";

import digitalRecordsImg from "@/assets/digital-records.jpg";
import healthScreeningImg from "@/assets/health-screening.jpg";
import telemedicineImg from "@/assets/telemedicine.jpg";
import vaccinationImg from "@/assets/vaccination.jpg";

import heroBackground from "@/assets/1635203.jpg";
import heroBackground_L from "@/assets/1635203-L.jpg";
import heroBackground_R from "@/assets/1635203-R.jpg";
import ScrollStackFeatures from "@/components/ScrollStackFeatures";
import DigitalHealthSection from "@/components/DigitalHealthSection";

import heroAnimated from "@/assets/overlay.png";

/* ================= HERO CSS ================= */
const heroCss = `
.hero-section{
  position:relative;
  width:100%;
  overflow:hidden;
}

.hero-bg-wrapper{
  position:absolute;
  inset:0;
  padding:20px;
  display:flex;
  align-items:center;
  justify-content:center;
}

.hero-bg{
  width:100%;
  height:90%;
  border-radius:26px;
  object-fit:cover;
}

.hero-anim-wrapper{
  position:absolute;
  inset:0;
  margin:auto;
  border-radius:36px;
  overflow:hidden;
  z-index:5;
}

.hero-anim-wrapper img{
  width:100%;
  height:100%;
  object-fit:cover;
}

.kermedix-title{
  font-family: Inter, Poppins, system-ui, sans-serif;
  font-weight:900;
  letter-spacing:-0.08em;
  color:rgba(255,255,255,0.65);
  text-shadow:
    0 1px 0 rgba(255,255,255,0.15),
    0 2px 8px rgba(0,0,0,0.35);
  pointer-events:none;
}


@media (max-width:768px){
  .hero-anim-wrapper{
    width:72vw;
    height:52vw; 
    max-height:52vh;
    aspect-ratio:16/9;
    border-radius:16px;
  }
}

@media (max-width:480px){
  .hero-anim-wrapper{
    width:88vw;
    height:84vw; 
    max-height:50vh;
    aspect-ratio:16/9;
    border-radius:14px;
  }
}
`;

/* ================= TEXT SCRAMBLE ================= */
const chars = "!<>-_\\/[]{}—=+*^?#________";


const DecryptedText = ({ text, start }: { text: string; start: boolean }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!start) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(
        text
          .split("")
          .map((c, idx) =>
            idx < i / 2 ? c : chars[Math.floor(Math.random() * chars.length)]
          )
          .join("")
      );
      i++;
      if (i > text.length * 2) {
        setDisplayed(text);
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text, start]);

  return <span>{displayed}</span>;
};


/* ================= HERO ================= */

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  /* ---------- MOBILE DETECTION (SSR SAFE) ---------- */
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ---------- SCROLL ---------- */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 22,
    mass: 1,
  });

  /* ---------- SPLIT ---------- */
  const split = useTransform(smooth, [0, 0.35], [0, 1]);

  const leftX = useTransform(split, [0, 1], ["0%", "-24.5%"]);
  const rightX = useTransform(split, [0, 1], ["0%", "24.5%"]);

  const textOpacity = useTransform(split, [0, 0.6], [1, 0]);
  const textScale = useTransform(split, [0, 0.6], [1, 0.9]);

  /* ---------- CENTER IMAGE ---------- */
  const centerWidth = useTransform(
    smooth,
    [0.4, 0.65],
    isMobile ? ["0%", "100%"] : ["0%", "50%"]
  );

  const centerOpacity = useTransform(smooth, [0.4, 0.5], [0, 1]);

  /* ---------- FINAL TEXT ---------- */
  const finalTextOpacity = useTransform(smooth, [0.55, 0.7], [0, 1]);
  const finalTextY = useTransform(smooth, [0.55, 0.7], ["14%", "0%"]);

  /* ---------- MOBILE SIDE FADE ---------- */
  const sideOpacity = useTransform(
    smooth,
    [0.45, 0.6],
    isMobile ? [1, 0] : [1, 1]
  );

  return (
    <section ref={ref} className="relative h-[260vh] bg-[#F9EFE3]">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-full max-w-[96%] h-[90%]">
          <div className="relative w-full h-full overflow-hidden rounded-[28px]">

            {/* LEFT IMAGE */}
            <motion.div
              style={{ x: leftX, opacity: sideOpacity }}
              className="absolute inset-y-0 left-0 w-[50.5%] overflow-hidden rounded-l-[28px]"
            >
              <img src={heroBackground_L} className="w-full h-full object-cover" />

              <motion.div
                style={{ opacity: textOpacity, scale: textScale }}
                className="absolute inset-0 flex items-center justify-center px-12"
              >
                <span className="kermedix-title text-[9vw] whitespace-nowrap">
                  KERMEDIX
                </span>
              </motion.div>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
              style={{ x: rightX, opacity: sideOpacity }}
              className="absolute inset-y-0 right-0 w-[50.5%] overflow-hidden rounded-r-[28px]"
            >
              <img src={heroBackground_R} className="w-full h-full object-cover" />

              <motion.div
                style={{ opacity: textOpacity, scale: textScale }}
                className="absolute inset-0 flex items-center justify-center px-12"
              >
                <span className="kermedix-title text-[9vw] whitespace-nowrap">
                  PLATFORM
                </span>
              </motion.div>
            </motion.div>

            {/* CENTER IMAGE */}
            <motion.div
              style={{
                width: centerWidth,
                opacity: centerOpacity,
              }}
              className="
                absolute inset-y-0
                left-1/2 -translate-x-1/2
                z-20
                overflow-hidden
              "
            >
              <img src={heroAnimated} className="w-full h-full object-cover" />
            </motion.div>

            {/* FINAL TEXT */}
            <motion.div
              style={{ opacity: finalTextOpacity, y: finalTextY }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center pointer-events-none"
            >
              <h1 className="kermedix-title text-[18vw] md:text-[12vw] text-white leading-none">

                KERMEDIX
              </h1>

              <p className="mt-4 text-3xl md:text-5xl font-semibold text-white">
                Kerala Digital Health Records
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};





/* ================= HOME ================= */
const Home = () => {
  useScrollAnimation();
  useTranslation();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = heroCss;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const keyDifferentiators = [
    "Centralized digital health database",
    "Real-time updates",
    "Strict privacy control",
    "Chronic health tracking",
    "ERP & HRMS Integration",
    "Powerful analytics & reports",
  ];

  const features = [
    { title: "Centralized Digital Recordkeeping", description: "All health interactions recorded securely", image: digitalRecordsImg },
    { title: "Real-time Updates", description: "Instant medical record updates", image: healthScreeningImg },
    { title: "Role-based Access", description: "Privacy compliant secure access", image: telemedicineImg },
    { title: "Integration Ready", description: "ERP & HRMS integration support", image: vaccinationImg },
  ];

  const stats = [
    { label: "Active Profiles", value: "50,000+", icon: Users },
    { label: "Health Records", value: "200,000+", icon: FileText },
    { label: "Healthcare Facilities", value: "150+", icon: Heart },
    { label: "Real-time Updates", value: "24/7", icon: Clock },
  ];

  const [visibleDiffs, setVisibleDiffs] = useState(
    new Array(keyDifferentiators.length).fill(false)
  );
  const diffRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const i = Number(e.target.getAttribute("data-index"));
          if (e.isIntersecting) {
            setVisibleDiffs((p) => {
              const a = [...p];
              a[i] = true;
              return a;
            });
          }
        }),
      { threshold: 0.3 }
    );

    diffRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F9EFE3" }}>

      <HeroSection />
      <NewsTicker />

{/* ================= MAIN CONTENT ================= */}
      <section className="py-20" style={{ backgroundColor: "#F9EFE3" }}>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Enquiry Form */}
            <div className="lg:col-span-1">
                <Card className="sticky top-8 rounded-[28px] border-[3px] border-[#5A4FD9] shadow-[0_25px_60px_rgba(0,0,0,0.18)] overflow-hidden bg-[#FBF7F2]">
                  
                  {/* Header */}
                  <CardHeader className="bg-gradient-to-br from-[#0B0B0F] to-[#1A1A22] px-8 py-6">
                    <CardTitle className="text-2xl font-bold text-white">
                      Enquire Now
                    </CardTitle>

                    <p className="text-gray-300 text-sm mt-1">
                      Let&apos;s discuss your requirements
                    </p>

                    <span className="block w-10 h-[3px] bg-[#F4C430] rounded-full mt-3" />
                  </CardHeader>

                  {/* Form */}
                  <CardContent className="p-8 space-y-5">
                    {[
                      "Your Name",
                      "Email Address",
                      "Phone Number",
                      "Organization",
                      "Location",
                    ].map((placeholder) => (
                      <input
                        key={placeholder}
                        type="text"
                        placeholder={placeholder}
                        className="w-full h-12 px-4 rounded-xl border-2 border-[#7B6EF6]
                                  text-gray-700 placeholder-gray-400
                                  focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/40
                                  transition"
                      />
                    ))}

                    <textarea
                      rows={4}
                      placeholder="Your Message"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#7B6EF6]
                                text-gray-700 placeholder-gray-400 resize-none
                                focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/40
                                transition"
                    />

                    {/* Button */}
                    <button
                      className="w-full h-14 mt-2 rounded-xl
                                bg-gradient-to-r from-[#5A4FD9] to-[#6D62FF]
                                text-white font-semibold text-lg
                                shadow-[0_6px_0_#F4C430]
                                hover:translate-y-[1px]
                                hover:shadow-[0_4px_0_#F4C430]
                                active:translate-y-[2px]
                                transition-all duration-150"
                    >
                      Submit Enquiry
                    </button>
                  </CardContent>
                </Card>

            </div>

            {/* Right Content */}
            <div className="lg:col-span-2 space-y-12">

             <DigitalHealthSection />

              {/* Features */}
              <div>
                <h3 className="text-2xl font-bold text-black mb-8">
                  Key Features
                </h3>
                <ScrollStackFeatures features={features} />
               </div>

              {/* CTA */}
              <div className="bg-gray-100 rounded-xl p-8 text-center border-2 border-black">
                <h3 className="text-2xl font-bold text-black mb-4">
                  Ready to Get Started?
                </h3>

                <p className="text-gray-600 mb-6">
                  Transform your healthcare management with our digital platform
                </p>

                <Link to="/register">
                  <Button className="bg-black hover:bg-gray-900 text-white px-6 py-2 font-medium border-2 border-black">
                    Make Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <StatsSection />
      
      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <div className="text-3xl font-bold text-black mb-2">
                    {stat.value}
                  </div>

                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FeatureShowcase />
       <BentoShowcase />
      <TestimonialSection />
      <InteractiveMap />
    </div>
  );
};

export default Home;
