import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsSection from "@/components/StatsSection";
import FeatureShowcase from "@/components/FeatureShowcase";
import TestimonialSection from "@/components/TestimonialSection";
import NewsTicker from "@/components/NewsTicker";
import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { 
  Heart, 
  Users, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  FileText
} from "lucide-react";
import heroImage from "@/assets/hero-healthcare.jpg";
import digitalRecordsImg from "@/assets/digital-records.jpg";
import healthScreeningImg from "@/assets/health-screening.jpg";
import telemedicineImg from "@/assets/telemedicine.jpg";
import vaccinationImg from "@/assets/vaccination.jpg";
import backVideo from "@/assets/back.mp4";
import React, { useState, useEffect, useRef } from "react";

//Decrypted Text Component 
const chars = "!<>-_\\/[]{}—=+*^?#________";

const DecryptedText = ({ text, speed = 30, start = false }: { text: string; speed?: number; start?: boolean }) => {
  const [displayed, setDisplayed] = useState("");
  const [active, setActive] = useState(start);

  useEffect(() => {
    if (!active) return;
    let iteration = 0;
    const maxIterations = text.length * 2;
    const interval = setInterval(() => {
      const output = text
        .split("")
        .map((c, i) => (i < iteration / 2 ? c : chars[Math.floor(Math.random() * chars.length)]))
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

// Home Component 
const Home = () => {
  const { t } = useTranslation();
  const visibleElements = useScrollAnimation();

  const features = [
    {
      title: "Centralized Digital Recordkeeping",
      description: "All health interactions recorded and maintained in one secure digital platform",
      image: digitalRecordsImg,
    },
    {
      title: "Real-time Updates",
      description: "Healthcare staff can update records instantly during consultations and visits",
      image: healthScreeningImg,
    },
    {
      title: "Role-based Access Controls",
      description: "Privacy-compliant access controls ensure data security and authorized viewing",
      image: telemedicineImg,
    },
    {
      title: "Integration Ready",
      description: "Seamlessly integrate with existing ERP, HRMS, or management systems",
      image: vaccinationImg,
    },
  ];

  const keyDifferentiators = [
    "Centralized digital recordkeeping for all health interactions",
    "Real-time updates by trained healthcare staff", 
    "Role-based access with privacy controls",
    "Chronic case logs, vaccinations, and visit history",
    "Integration options with ERP or HRMS platforms",
    "Reporting and analytics for institutional insights"
  ];

  const stats = [
    { label: "Active Profiles", value: "50,000+", icon: Users },
    { label: "Health Records", value: "200,000+", icon: FileText },
    { label: "Healthcare Facilities", value: "150+", icon: Heart },
    { label: "Real-time Updates", value: "24/7", icon: Clock }
  ];


  const [visibleDiffs, setVisibleDiffs] = useState<boolean[]>(new Array(keyDifferentiators.length).fill(false));
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
      {/* Hero Section */}
      <section className="relative bg-black text-white py-32 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroImage}
          className="absolute inset-0 w-full h-full object-cover brightness-125"
        >
          <source src={backVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/30"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white">
            KerMedix
          </h1>

          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Kerala Digital Health Records
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed">
            KerMedix's Digital Health Records service helps institutions maintain organized, secure, and accessible medical data for migrant workers and communities.
          </p>
        </div>
      </section>
      
      {/* News Ticker */}
      <NewsTicker />
      
      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              <Card className="professional-form sticky top-8">
                <CardHeader className="bg-black text-white rounded-t-xl">
                  <CardTitle className="text-xl">Enquire Now</CardTitle>
                  <p className="text-gray-300">Let's discuss your requirements</p>
                </CardHeader>
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <input type="text" placeholder="Your Name" className="form-input" />
                    <input type="email" placeholder="Email Address" className="form-input" />
                    <input type="tel" placeholder="Phone Number" className="form-input" />
                    <input type="text" placeholder="Organization" className="form-input" />
                    <input type="text" placeholder="Location" className="form-input" />
                    <textarea placeholder="Your Message" rows={4} className="form-input resize-none"></textarea>
                    <Button className="w-full btn-primary">Submit Enquiry</Button>
                  </form>
                </CardContent>
              </Card>
            </div>

           
            <div className="lg:col-span-2 space-y-12">
              
              {/* Description */}
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">Digital Health Records</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  KerMedix's Digital Health Records service helps institutions maintain organized, secure, 
                  and accessible medical data for migrant workers. The system captures health screenings, clinic visits, 
                  chronic condition logs, vaccination records, and counselling history in a centralized format. 
                  Records are structured by individual profiles and updated in real time by authorized medical personnel. 
                  Access is role-based and compliant with data privacy norms.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  Institutions benefit from simplified reporting, health trend analysis, and faster decision-making 
                  during emergencies or audits. The platform can operate as a standalone system or be integrated 
                  with existing ERP, HRMS, or school management tools. With this service, institutions move away 
                  from paper logs and fragmented tracking toward accountable, data-driven healthcare management.
                </p>
              </div>

              {/* Key Differentiators */}
              <div>
                <h3 className="text-xl font-semibold text-black mb-6 italic">Key differentiators:</h3>
                <div className="space-y-4">
                  {keyDifferentiators.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3"
                      ref={(el) => (diffRefs.current[index] = el)}
                      data-index={index}
                    >
                      <CheckCircle className="h-6 w-6 text-black mt-0.5 flex-shrink-0" />
                      <DecryptedText text={point} speed={30} start={visibleDiffs[index]} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-2xl font-bold text-black mb-8">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature) => (
                    <Card key={feature.title} className="card-shadow hover:card-shadow-lg transition-all duration-300 border-2 border-black bg-white overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={feature.image} 
                          alt={feature.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-black text-lg mb-3">{feature.title}</h4>
                        <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gray-100 rounded-xl p-8 text-center border-2 border-black">
                <h3 className="text-2xl font-bold text-black mb-4">Ready to Get Started?</h3>
                <p className="text-gray-600 mb-6">
                  Transform your healthcare management with our digital platform
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/register">
                    <Button className="bg-black hover:bg-gray-900 text-white px-6 py-2 font-medium border-2 border-black">
                      Make Appointment
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-black mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <StatsSection />
      <FeatureShowcase />
      <TestimonialSection />

    </div>
  );
};

export default Home;
