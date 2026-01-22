import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import HeroSection from "@/components/HeroSection";
import NewsTicker from "@/components/NewsTicker";
import StatsSection from "@/components/StatsSection";
import FlowingStats from "@/components/FlowingStats";
import InteractiveMap from "@/components/InteractiveMap";
import BentoShowcase from "@/components/BentoShowcase";
import TestimonialSection from "@/components/TestimonialSection";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import DigitalHealthSection from "@/components/DigitalHealthSection";
import ScrollStackFeatures from "@/components/ScrollStackFeatures";
import ScrollStackShowcase from "@/components/ScrollStackShowcase";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Heart, Users, Clock, FileText } from "lucide-react";

import digitalRecordsImg from "@/assets/digital-records.jpg";
import healthScreeningImg from "@/assets/health-screening.jpg";
import telemedicineImg from "@/assets/telemedicine.jpg";
import vaccinationImg from "@/assets/vaccination.jpg";



/* ================= HOME ================= */
const Home = () => {
  useScrollAnimation();
  
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
    <div className="w-full overflow-x-hidden" style={{ backgroundColor: "#F9EFE3" }}>


      <HeroSection />
      <NewsTicker />

{/* ================= MAIN CONTENT ================= */}
      <section className="py-20" style={{ backgroundColor: "#F9EFE3" }}>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Enquiry Form */}
            <div className="lg:col-span-1">
                <Card className="sticky top-8 rounded-[28px] border-[3px] border-[#000000] shadow-[0_25px_60px_rgba(0,0,0,0.18)] overflow-hidden bg-[#FBF7F2]">
                  
                  {/* Header */}
                  <CardHeader className="bg-gradient-to-br from-[#0B0B0F] to-[#1A1A22] px-8 py-6">
                    <CardTitle className="text-2xl font-bold text-white">
                      Enquire Now
                    </CardTitle>

                    <p className="text-gray-300 text-sm mt-1">
                      Let&apos;s discuss your requirements
                    </p>

                    <span className="block w-20 h-[8px] bg-[#f5c945] rounded-full mt-3" />
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
                        className="w-full h-12 px-4 rounded-xl border-2 border-[#010105]
                                  text-gray-700 placeholder-gray-400
                                  focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/40
                                  transition"
                      />
                    ))}

                    <textarea
                      rows={4}
                      placeholder="Your Message"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#090815]
                                text-gray-700 placeholder-gray-400 resize-none
                                focus:outline-none focus:ring-2 focus:ring-[#7B6EF6]/40
                                transition"
                    />

                    {/* Button */}
                    <button
                      className="w-full h-14 mt-2 rounded-xl 
                                bg-gradient-to-r from-[#5A4FD9] to-[#1f11eb]
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
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[28px]
                  border-2 border-black
                  bg-[#F9EFE3]
                  p-10
                  text-center
                  shadow-[0_28px_70px_rgba(0,0,0,0.25)]
                  transition-transform
                  duration-300
                  hover:-translate-y-1
                "
              >
                {/* Accent Line */}
                <div className="w-16 h-[4px] bg-black mx-auto mb-6 rounded-full" />

                <h3
                  className="text-3xl mb-4"
                  style={{
                    fontFamily: "Clash Display, sans-serif",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Ready to Get Started?
                </h3>

                <p
                  className="text-lg text-gray-700 max-w-xl mx-auto mb-8"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Transform your healthcare management with our secure, scalable
                  digital health platform.
                </p>

                <Link to="/register">
                  <Button
                    className="
                      px-10
                      py-4
                      text-lg
                      font-semibold
                      rounded-xl
                      bg-black
                      text-white
                      border-2
                      border-black
                      shadow-[0_8px_0_#FFCC33]
                      transition-all
                      duration-150
                      hover:translate-y-[1px]
                      hover:shadow-[0_6px_0_#FFCC33]
                      active:translate-y-[2px]
                    "
                  >
                    Make Appointment
                  </Button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>
      
      <StatsSection />
      <FlowingStats />
      <ScrollStackShowcase/>
      <BentoShowcase />
      <TestimonialSection />
      <InteractiveMap />
    </div>
  );
};

export default Home;
