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

import heroBackground from "@/assets/1635203.jpg";
import heroAnimated from "@/assets/facility1.png";

import React, { useState, useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


// ================= HERO CSS =================
const heroCss = `
.hero-section{
  position: relative;
  width:100%;
  height:100vh;
  overflow:hidden;
}

/* ================= STATIC BACKGROUND ================= */
.hero-bg-wrapper{
  position:absolute;
  inset:0;
  padding:40px;
  display:flex;
  align-items:center;
  justify-content:center;
}

/* Desktop static bg — SAME SIZE AS BEFORE */
.hero-bg{
  width:100%;
  height:78%;
  border-radius:26px;
  object-fit:cover;
  overflow:hidden;
}

/* ================= ANIMATION LAYER ================= */
.hero-anim-area{
  position:relative;
  width:100%;
  height:100vh;
}

/* Mask animated image (unchanged desktop behavior) */
.hero-anim-wrapper{
  position:absolute;
  inset:0;
  margin:auto;
  width:70vw;
  height:70vh;
  rotate:15deg;
  clip-path:polygon(37.5% 20%,62.5% 20%,62.5% 80%,37.5% 80%);
  scale:1.2;
  opacity:0;
  z-index:5;
  border-radius:26px;
  overflow:hidden;
}

.hero-anim-wrapper img{
  width:100%;
  height:100%;
  object-fit:cover;
  border-radius:inherit;
}

.big-word{
  opacity:.6;
}


/* ================== TABLET ================== */
@media (max-width: 1024px){

  .hero-bg-wrapper{
    padding:26px;
  }

  .hero-bg{
    height:82%;
    border-radius:22px;
  }

  .hero-anim-wrapper{
    width:82vw;
    height:60vh;
    rotate:12deg;
    border-radius:22px;
  }
}


/* ================== MOBILE ================== */
@media (max-width: 768px){

  .hero-bg-wrapper{
    padding:14px;
  }

  .hero-bg{
    height:88%;
    border-radius:16px;
  }

  .hero-anim-wrapper{
    width:95vw;
    height:48vh;
    rotate:10deg;
    border-radius:16px;
  }
}


/* ============= SMALL MOBILE ============= */
@media (max-width: 480px){

  .hero-bg-wrapper{
    padding:10px;
  }

  .hero-bg{
    height:90%;
    border-radius:14px;
  }

  .hero-anim-wrapper{
    width:100vw;
    height:44vh;
    rotate:8deg;
    border-radius:14px;
  }
}

`;





// ================= TEXT SCRAMBLE =================
const chars = "!<>-_\\/[]{}—=+*^?#________";
const DecryptedText = ({ text, speed = 30, start = false }: any) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!start) return;
    let i = 0;
    const max = text.length * 2;

    const interval = setInterval(() => {
      const output = text
        .split("")
        .map((c: string, index: number) =>
          index < i / 2 ? c : chars[Math.floor(Math.random() * chars.length)]
        )
        .join("");

      setDisplayed(output);
      i++;

      if (i > max) {
        setDisplayed(text);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, start]);

  return <span>{displayed}</span>;
};


const Home = () => {

  const { t } = useTranslation();
  useScrollAnimation();



  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = heroCss;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);


  // ================= DIFFERENTIATOR  =================
  const keyDifferentiators = [
    "Centralized digital health database",
    "Real-time updates",
    "Strict privacy control",
    "Chronic health tracking",
    "ERP & HRMS Integration",
    "Powerful analytics & reports"
  ];

  const [visibleDiffs, setVisibleDiffs] = useState(
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
              const arr = [...prev];
              arr[index] = true;
              return arr;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    diffRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);


  // ================= HERO SCROLL EFFECT =================
  useEffect(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-anim-area",
        start: "top top",
        end: "+=150%",
        scrub: true,
        pin: true,
        pinSpacing: true   
      }
    });

    tl.to(".hero-anim-wrapper", { opacity: 1, duration: 0.2 });

    tl.to(".hero-anim-wrapper", {
      rotation: 0,
      clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
      width: "calc(100% - 80px)",
      height: "calc(100% - 80px)",
      scale: 1,
      ease: "power2.inOut"
    });

  }, []);


  // ================= DATA =================
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


  return (
    <div className="min-h-screen bg-white">

      {/* ================= HERO ================= */}
      <section className="hero-section">

        <div className="hero-bg-wrapper">
          <img src={heroBackground} className="hero-bg" />
        </div>

        <div className="hero-anim-area">
          <h1 className="big-word absolute inset-0 flex items-center justify-center text-[18vw] font-extrabold text-white">
            KERMEDIX
          </h1>

          <div className="absolute bottom-[18%] w-full text-center z-[20]">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Kerala Digital Health Records
            </h2>
          </div>

          <div className="hero-anim-wrapper">
            <img src={heroAnimated} />
          </div>
        </div>
      </section>


      {/* ================= NEWS ================= */}
      <NewsTicker />

{/* ================= MAIN CONTENT ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Enquiry Form */}
            <div className="lg:col-span-1">
              <Card className="professional-form sticky top-8">
                <CardHeader className="bg-black text-white rounded-t-xl">
                  <CardTitle className="text-xl">Enquire Now</CardTitle>
                  <p className="text-gray-300">
                    Let's discuss your requirements
                  </p>
                </CardHeader>

                <CardContent className="p-8">
                  <form className="space-y-6">
                    <input type="text" placeholder="Your Name" className="form-input" />
                    <input type="email" placeholder="Email Address" className="form-input" />
                    <input type="tel" placeholder="Phone Number" className="form-input" />
                    <input type="text" placeholder="Organization" className="form-input" />
                    <input type="text" placeholder="Location" className="form-input" />
                    <textarea placeholder="Your Message" rows={4} className="form-input resize-none"></textarea>

                    <Button className="w-full btn-primary">
                      Submit Enquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Description */}
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">
                  Digital Health Records
                </h2>

                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  KerMedix's Digital Health Records service helps institutions maintain organized,
                  secure, and accessible medical data for migrant workers. The system captures
                  health screenings, clinic visits, chronic condition logs, vaccination records,
                  and counselling history in a centralized format.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                  Institutions benefit from simplified reporting, health trend analysis, and faster
                  decision-making during emergencies or audits. The platform supports standalone
                  use and ERP / HRMS integrations.
                </p>
              </div>

              {/* Key Differentiators */}
              <div>
                <h3 className="text-xl font-semibold text-black mb-6 italic">
                  Key differentiators:
                </h3>

                <div className="space-y-4">
                  {keyDifferentiators.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3"
                      ref={(el) => (diffRefs.current[index] = el)}
                      data-index={index}
                    >
                      <CheckCircle className="h-6 w-6 text-black mt-0.5" />
                      <DecryptedText text={point} start={visibleDiffs[index]} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-2xl font-bold text-black mb-8">
                  Key Features
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature) => (
                    <Card
                      key={feature.title}
                      className="card-shadow hover:card-shadow-lg transition-all duration-300 border-2 border-black bg-white overflow-hidden"
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <CardContent className="p-6">
                        <h4 className="font-semibold text-black text-lg mb-3">
                          {feature.title}
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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

   
      <StatsSection />
      <FeatureShowcase />
      <TestimonialSection />
    </div>
  );
};

export default Home;
