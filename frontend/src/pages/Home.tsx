import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsSection from "@/components/StatsSection";
import FeatureShowcase from "@/components/FeatureShowcase";
import TestimonialSection from "@/components/TestimonialSection";
import NewsTicker from "@/components/NewsTicker";
import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Heart, Users, Clock, CheckCircle, FileText } from "lucide-react";
import digitalRecordsImg from "@/assets/digital-records.jpg";
import healthScreeningImg from "@/assets/health-screening.jpg";
import telemedicineImg from "@/assets/telemedicine.jpg";
import vaccinationImg from "@/assets/vaccination.jpg";
import backVideo from "@/assets/back.mp4";
import introVideo from "@/assets/intro.mp4";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------- Decrypted Text Component ----------------------
const chars = "!<>-_\\/[]{}—=+*^?#________";

const DecryptedText = ({
  text,
  speed = 30,
  start = false,
}: {
  text: string;
  speed?: number;
  start?: boolean;
}) => {
  const [displayed, setDisplayed] = useState("");
  const [active, setActive] = useState(start);

  useEffect(() => {
    if (!active) return;
    let iteration = 0;
    const maxIterations = text.length * 2;
    const interval = setInterval(() => {
      const output = text
        .split("")
        .map((c, i) =>
          i < iteration / 2 ? c : chars[Math.floor(Math.random() * chars.length)]
        )
        .join("");
      setDisplayed(output);

      iteration++;
      if (iteration > maxIterations) {
        setDisplayed(text);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, active]);

  useEffect(() => {
    if (start) setActive(true);
  }, [start]);

  return (
    <span className="font-mono text-gray-700 bg-black/5 px-2 py-1 rounded-md tracking-wider">
      {displayed}
    </span>
  );
};

// ---------------------- Home Component ----------------------
const Home = () => {
  const { t } = useTranslation();
  const visibleElements = useScrollAnimation();

  const [showMainContent, setShowMainContent] = useState(false);
  const [fadeOutIntro, setFadeOutIntro] = useState(false);
  const introRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoEnd = () => {
    setFadeOutIntro(true);
    setTimeout(() => setShowMainContent(true), 800);
  };

 
  useEffect(() => {
    const fallback = setTimeout(() => {
      if (!showMainContent) handleVideoEnd();
    }, 5500);
    return () => clearTimeout(fallback);
  }, [showMainContent]);

  const keyDifferentiators = [
    "Centralized digital recordkeeping for all health interactions",
    "Real-time updates by trained healthcare staff",
    "Role-based access with privacy controls",
    "Chronic case logs, vaccinations, and visit history",
    "Integration options with ERP or HRMS platforms",
    "Reporting and analytics for institutional insights",
  ];

  const [visibleDiffs, setVisibleDiffs] = useState<boolean[]>(
    new Array(keyDifferentiators.length).fill(false)
  );
  const diffRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleDiffs((prev) => {
              const newArr = [...prev];
              newArr[index] = true;
              return newArr;
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    diffRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ---------------------- HERO SECTION ---------------------- */}
      <section className="relative bg-black text-white h-screen overflow-hidden">
        {/* Intro Video */}
        <AnimatePresence>
          {!showMainContent && (
            <motion.div
              className="absolute inset-0 z-20"
              initial={{ opacity: 1 }}
              animate={{ opacity: fadeOutIntro ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <video
                ref={introRef}
                src={introVideo}
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                className="absolute inset-0 w-full h-full object-cover"
                preload="auto"
              />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background looping video */}
        {showMainContent && (
          <motion.video
            src={backVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            preload="metadata"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}

        {/* Overlay Gradient */}
        {showMainContent && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          />
        )}

        {/* Text Overlay after Intro */}
        {showMainContent && (
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-center h-full">
            <motion.h2
              className="text-5xl md:text-7xl font-extrabold mb-4 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              KerMedix
            </motion.h2>

            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Kerala Digital Health Records
            </motion.h1>

            <motion.p
              className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              {t(
                "KerMedix’s Digital Health Records platform ensures secure, organized, and real-time medical data access for communities and institutions."
              )}
            </motion.p>
          </div>
        )}
      </section>

      {/* ---------------------- MAIN CONTENT ---------------------- */}
      {showMainContent && (
        <>
          <NewsTicker />

          {/* Enquiry + Differentiators Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Form */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardHeader className="bg-black text-white rounded-t-xl">
                    <CardTitle className="text-xl">Enquire Now</CardTitle>
                    <p className="text-gray-300">Let’s discuss your requirements</p>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form className="space-y-6">
                      <input type="text" placeholder="Your Name" className="form-input" />
                      <input type="email" placeholder="Email Address" className="form-input" />
                      <input type="tel" placeholder="Phone Number" className="form-input" />
                      <input type="text" placeholder="Organization" className="form-input" />
                      <input type="text" placeholder="Location" className="form-input" />
                      <textarea
                        placeholder="Your Message"
                        rows={4}
                        className="form-input resize-none"
                      ></textarea>
                      <Button className="w-full btn-primary">Submit Enquiry</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h2 className="text-3xl font-bold text-black mb-6">
                    Digital Health Records
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    KerMedix’s Digital Health Records service helps institutions maintain
                    organized, secure, and accessible medical data for migrant workers
                    and communities.
                  </p>
                </div>

                {/* Differentiators */}
                <div>
                  <h3 className="text-xl font-semibold text-black mb-6 italic">
                    Key Differentiators:
                  </h3>
                  <div className="space-y-4">
                    {keyDifferentiators.map((point, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3"
                        ref={(el) => (diffRefs.current[index] = el)}
                        data-index={index}
                      >
                        <CheckCircle className="h-6 w-6 text-black mt-0.5 flex-shrink-0" />
                        <DecryptedText
                          text={point}
                          speed={30}
                          start={visibleDiffs[index]}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <StatsSection />
          <FeatureShowcase />
          <TestimonialSection />
        </>
      )}
    </div>
  );
};

export default Home;
