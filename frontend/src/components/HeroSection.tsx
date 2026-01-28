import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Download, Smartphone } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import healthWorkers from '@/assets/prognosis-icon-2803190_1280.png';
import smartHealthcare from '@/assets/stethoscope-icon-2316460_1280.png';
import sideVideo from '@/assets/1uEgB20NU24EH65gog.mp4';
import bottomImage from "@/assets/houseboat_silhouette.png";


  const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [showInstallInfo, setShowInstallInfo] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { isInstallable, isIOS, isStandalone, installApp } = usePWAInstall();
  const bottomImageRef = useRef<HTMLDivElement>(null);
  const [imageScale, setImageScale] = useState(1.3);
  const [isMobile, setIsMobile] = useState(false);

 
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const flipInterval = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 1000);
    return () => clearInterval(flipInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!bottomImageRef.current) return;

      const rect = bottomImageRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

 
    const progress = 1 - Math.min(
      Math.max(rect.top / windowHeight, 0),
      1
    );

    const scale = 1.3 - progress * 0.3;

    setImageScale(scale);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();

      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 900);
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);


  return (
    <section 
      ref={heroRef}
     className="relative min-h-[120vh] w-full overflow-hidden"

      style={{
        background: 'linear-gradient(135deg, hsl(152 45% 22%) 0%, hsl(152 38% 28%) 50%, hsl(152 32% 18%) 100%)',
      }}
    >

        {/* ================= MOBILE CSS ================= */}
      <style>
        {`
        .hero-main {
          display: block;
        }
        .hero-mobile {
          display: none;
        }

        @media (max-width: 900px) {
          .hero-main {
            display: none;
          }
          .hero-mobile {
            display: block;
            position: relative;
            padding: 2rem 1.2rem 2.5rem;
          }
        }

        /* =================================MOBILE HERO=================================== */
       
        @media (max-width: 900px) {

          /* ---------- TITLES ---------- */
          .hero-title {
            
            text-align: left;
            margin-bottom: 1rem;
          }

          .title-digital,
          .title-records {
            font-size: 3.2rem;
            font-weight: 900;
            line-height: 1;
          }

          .title-digital {
            color: #ffffff; /* desktop text-white */
          }

          .title-health {
            font-size: 3.2rem;
            font-weight: 900;
            line-height: 1;
            color: transparent;
            -webkit-text-stroke: 2px rgba(232, 228, 214, 0.65); 
          }

          .title-records {
            color: #e8e4d6; 
          }

          /* ---------- DESCRIPTION ---------- */
          .hero-description {
            max-width: 62%;
            font-size: 0.95rem;
            line-height: 1.6;
            margin-bottom: 2.5rem;
            color: rgba(255, 255, 255, 0.6); /* desktop text-white/60 */
          }

          /* ---------- LARGE CIRCLE (RIGHT) ---------- */
          .illustrations-mobile {
            position: absolute;
            top: 285px;
            right: 26px;
            width: 230px;
            height: 230px;
            z-index: 2;
          }

          .illustration-circle {
            width: 230px;
            height: 230px;
            border-radius: 50%;
            overflow: hidden;
            background: #ffffff;
          }

          .illustration-circle video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          /* ---------- SMALL CIRCLE (OVERLAP) ---------- */
          .placeholder-image {
            position: absolute;
            top: 105px;
            bottom: -20px;
            right: 190px;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: #5fa1b9; /* unchanged */
            
          }

          /* ---------- KERMEDIX ---------- */
          .kermedix-text {
            margin-top: 15.5rem;
            text-align: center;
            font-size: 2.8rem;
            font-weight: 900;
            letter-spacing: 0.08em;
            color: rgba(255, 255, 255, 0.2); 
          }

          /* ---------- STATS CARD ---------- */
          .hero-stats-mobile {
            margin: 1.8rem auto 2.2rem;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            overflow: hidden;
            max-width: 100%;
          }

          /* Each stat */
          .hero-stats-mobile .stat-item {
            padding: 1.2rem 0.5rem;
            text-align: center;
            position: relative;
          }

          /* Vertical divider line */
          .hero-stats-mobile .stat-item:not(:last-child)::after {
            content: "";
            position: absolute;
            top: 5%;
            right: 0;
            width: 2px;
            height: 90%;
            background: linear-gradient(
              to bottom,
              transparent,
              rgba(255, 255, 255, 0.3),
              transparent
            );
          }

          /* Number */
          .hero-stats-mobile strong {
            font-size: 1.05rem;
            font-weight: 700;
            color: #ffffff;
          }

          /* Label */
          .hero-stats-mobile span {
            display: block;
            font-size: 0.6rem;
            letter-spacing: 0.14em;
            margin-top: 0.3rem;
            color: rgba(255, 255, 255, 0.5);
          }


          /* ---------- FOOTER TEXT ---------- */
          .cta-section-mobile {
            text-align: center;
            margin-top: 1.5rem;
          }

          .cta-title-mobile {
            font-size: 0.7rem;
            letter-spacing: 0.25em;
            color: rgba(255, 255, 255, 0.5);
          }

          .cta-subtitle-mobile {
            font-size: 0.6rem;
            letter-spacing: 0.7em;
            margin-top: 0.3rem;
            color: rgba(255, 255, 255, 0.85);
          }
        }
          

        @media (max-width: 900px) {

          .hero-mobile {
            perspective: 1000px; /* REQUIRED for 3D */
          }

          .flip-container img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

/* ===============================  HERO  ECG ================================ */
             
        .hero-ecg-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 60px;
          pointer-events: none;
          z-index: 5;
        }

        .hero-ecg-line path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: ecg-flow-wide 3.5s linear infinite;
        }

        @keyframes ecg-flow-wide {
          to {
            stroke-dashoffset: -1000;
          }
        }


        /* ========= MOBILE ECG ==================== */
 
        /* Center wrapper */
        .kermedix-pulse-wrapper.mobile {
          display: flex;
          justify-content: center;
          width: 100%;
          margin-top: 0.1rem;
        }

        /* SVG sizing */
        .kermedix-pulse {
          display: block;
        }

        /* ANIMATION — THIS MUST MATCH THE PATH CLASS */
        .ecg-flow-mobile {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: ecg-flow-mobile 3.5s linear infinite;
        }

        /* Keyframes */
        @keyframes ecg-flow-mobile {
          to {
            stroke-dashoffset: -400;
          }
        }

/* ======================================= WATER WAVES ========================================== */

        .water-exact {
          position: absolute;
          bottom: -18px;
          left: 0;
          width: 100%;
          height: 220px;
          pointer-events: none;
          z-index: 6;
          overflow: hidden;
        }

        /* SVG motion */
        .water-exact-svg {
          width: 200%;
          height: 100%;
          animation: water-slide 16s linear infinite;
        }

        /* Base wave */
        .exact-wave {
          fill: none;
          stroke: rgba(255, 255, 255, 0.9);
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* Desktop depth */
        .w0 { opacity: 0.25; }
        .w1 { opacity: 0.3; }
        .w2 { opacity: 0.35; }
        .w3 { opacity: 0.4; }
        .w4 { opacity: 0.45; }
        .w5 { opacity: 0.45; }
        .w6 { opacity: 0.4; }
        .w7 { opacity: 0.35; }
        .w8 { opacity: 0.3; }
        .w9 { opacity: 0.25; }

        /* Horizontal flow */
        @keyframes water-slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        /* =====================================================
          MOBILE OPTIMIZATION (CRITICAL)
        ===================================================== */

        @media (max-width: 768px) {
          .water-exact {
            height: 150px;
            bottom: -10px;
          }

          .water-exact-svg {
            width: 220%;
            animation-duration: 14s;
          }

          .exact-wave {
            stroke-width: 1.4;
          }
        }

        @media (max-width: 600px) {
          .water-exact {
            height: 140px;
          }

          /* Mobile brightness falloff */
          .w0 { opacity: 0.12; }
          .w1 { opacity: 0.16; }
          .w2 { opacity: 0.2; }
          .w3 { opacity: 0.25; }
          .w4 { opacity: 0.3; }
          .w5 { opacity: 0.28; }
          .w6 { opacity: 0.24; }
          .w7 { opacity: 0.2; }
          .w8 { opacity: 0.16; }
          .w9 { opacity: 0.12; }
          .w10 { opacity: 0.1; }
          .w11 { opacity: 0.08; }
          .w12 { opacity: 0.06; }
          .w13 { opacity: 0.04; }
        }
      `}
      </style>

   <div className="hero-main">
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex pb-[28vh]">

        {/* Left Sidebar Decoration */}
        <div 
          className="hidden lg:flex flex-col justify-center pr-8 py-20"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateX(0)' : 'translateX(-40px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
          }}
        >
          {/* Side decoration */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-white/20" />
            
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col justify-center py-20 lg:py-0">
          {/* Top Badge */}
          <div 
            className="mb-6"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >

          </div>

          {/* Giant Typography */}
          <div className="relative">
            {/* Main Headline */}
            <div className="space-y-0 leading-none pt-12 lg:pt-20">

              <h1 
                className="font-black tracking-[-0.04em] text-white"
                style={{
                  fontSize: 'clamp(3rem, 12vw, 9rem)',
                  lineHeight: 1,
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(60px)',
                  transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
                }}
              >
                DIGITAL
              </h1>
              
              <div className="relative">
                <h1 
                  className="font-black tracking-[-0.04em]"
                  style={{
                    fontSize: 'clamp(3rem, 12vw, 9rem)',
                    lineHeight: 1,
                    color: 'transparent',
                    WebkitTextStroke: '2px hsl(40 30% 85% / 0.6)',
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'translateY(0)' : 'translateY(60px)',
                    transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
                  }}
                >
                  HEALTH
                </h1>

              {/* Side Video + Flipping Image */}
              <div 
                className="absolute right-0 lg:right-[4%] top-[20%] -translate-y-1/2 z-20 flex items-center gap-6"

                style={{
                  perspective: '1000px',
                  opacity: isLoaded ? 1 : 0,
                  transition: 'opacity 1s ease-out 0.5s',
                }}
              >
                {/* Circular Side Video */}
                <div className="w-[160px] sm:w-[200px] lg:w-[240px] aspect-square rounded-full overflow-hidden border border-white/20 shadow-lg">

                  <video
                    src={sideVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Flipping Image */}
              <div
                className="relative"
                style={{
                  perspective: '1200px',
                }}
              >
                <div
                  className="relative"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `
                      rotateY(${isFlipped ? 180 : 0}deg)
                      translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px, 0)
                    `,
                    transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
                    willChange: 'transform',
                  }}
                >
                  {/* Front */}
                  <div style={{ backfaceVisibility: 'hidden' }}>
                    <img
                      src={healthWorkers}
                      className="w-[160px] sm:w-[200px] lg:w-[240px] select-none"
                      draggable={false}
                    />
                  </div>

                  {/* Back */}
                  <div
                    className="absolute top-0 left-0"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <img
                      src={smartHealthcare}
                      className="w-[160px] sm:w-[200px] lg:w-[240px] select-none"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
              </div>   
              </div>
       
              <div className="flex items-end gap-4 lg:gap-8 flex-wrap">
                <h1 
                  className="font-black tracking-[-0.04em]"
                  style={{
                    fontSize: 'clamp(3rem, 12vw, 9rem)',
                    lineHeight: 1,
                    paddingRight: '0.02em',
                    background: 'linear-gradient(135deg, hsl(40 35% 92%) 0%, hsl(40 25% 75%) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'translateY(0)' : 'translateY(60px)',
                    transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
                  }}
                >
                  RECORDS
                </h1>
                
                {/* KERMEDIX */}
                <span 
                  className="font-black text-white/10 leading-none hidden lg:block"
                  style={{
                    fontSize: 'clamp(2rem, 8vw, 7rem)',
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 1s ease-out 0.7s',
                  }}
                >
                  KERMEDIX
                  {/* FULL-WIDTH ECG LINE */}
                <div className="hero-ecg-line hidden lg:block">
                  <svg
                    viewBox="0 0 1200 40"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                  >
                    <path
                      d="
                        M0 20 
                        H150 
                        L180 6 
                        L210 34 
                        L240 20 
                        H420 
                        L450 10 
                        L480 30 
                        L510 20 
                        H760 
                        L790 8 
                        L820 32 
                        L850 20 
                        H1200
                      "
                      fill="none"
                      stroke="rgba(255,255,255,0.35)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                </span>
              </div>
            </div>

            {/* Subtext and CTA */}
            <div className="mt-10 lg:mt-14 max-w-lg">
              <p 
                className="text-base lg:text-lg text-white/60 font-light leading-relaxed mb-8"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.8s ease-out 0.5s',
                }}
              >
                Experience the future of healthcare. Secure, unified, and citizen-centric digital health records for Kerala.
              </p>              
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div 
        className="absolute bottom-[125vh] left-0 right-0 z-20"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1s ease-out 0.9s',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">

          {/* Stats Preview */}
      <div className="hidden md:flex justify-center w-full pl-80 mt-6">
        <div
          className="
            grid grid-cols-3 gap-x-3 bg-white/1 backdrop-blur-md rounded-xl overflow-hidden max-w-[220px] w-full
          "
        >
          {[
            { value: "3.5M+", label: "Citizens" },
            { value: "850+", label: "Health Centers" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat, i) => (
            <div
              key={i}
              className="relative text-center py-4 px-2"
            >
              {/* Divider */}
              {i !== 2 && (
                <span
                  className="
                    absolute top-[16%] right-0
                    h-[76%] w-[1px]
                    bg-gradient-to-b
                    from-transparent
                    via-white/30
                    to-transparent
                  "
                />
              )}

              <div className="text-base font-semibold text-white">
                {stat.value}
              </div>
              <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/45">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

          {/* Bottom Right Text */}
          <div className="text-right hidden sm:block">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              Step into the future
            </p>
            <p className="text-[12px] uppercase tracking-[0.5em] text-white/90 font-medium">
              Kerala • Healthcare
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="hero-mobile">

      {/* TITLES */}
      <div className="hero-title">
        <h1 className="title-digital">DIGITAL</h1>
        <h1 className="title-health">HEALTH</h1>
        <h1 className="title-records">RECORDS</h1>
      </div>

      {/* DESCRIPTION */}
      <div className="hero-description">
        <p>
          Experience the future of healthcare. Secure, unified, and citizen-centric
          digital health records for Kerala.
        </p>
      </div>

      {/* ILLUSTRATIONS */}
      <div className="illustrations-mobile">
        <div className="illustration-circle">
          <video
            src={sideVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-full"
          />
        </div>

    <div
      className="placeholder-image flip-container"
      style={{
        transformStyle: 'preserve-3d',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        transition: 'transform 0.8s cubic-bezier(0.2, 0, 0.2, 1)',
      }}
    >
      {/* FRONT */}
      <div style={{ backfaceVisibility: 'hidden' }}>
        <img src={healthWorkers} alt="Front" />
      </div>

      {/* BACK */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: 'rotateY(180deg)',
          backfaceVisibility: 'hidden',
        }}
      >
        <img src={smartHealthcare} alt="Back" />
      </div>
    </div>

      </div>

      {/* KERMEDIX */}
      <div className="kermedix-text">KERMEDIX</div>
    <div className="kermedix-pulse-wrapper mobile">
      <svg
        className="kermedix-pulse"
        viewBox="0 0 400 40"
        preserveAspectRatio="none"
      >
        <path
          className="ecg-flow-mobile"
          d="M0 20 H80 L100 5 L120 35 L140 20 H200 L220 10 L240 30 L260 20 H400"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>

    {/* STATS */}
      <div className="hero-stats-mobile">
        <div className="stat-item">
          <strong>3.5M+</strong>
          <span>Citizens</span>
        </div>
        <div className="stat-item">
          <strong>850+</strong>
          <span>Health Centers</span>
        </div>
        <div className="stat-item">
          <strong>99.9%</strong>
          <span>Uptime</span>
        </div>
      </div>
      

      {/*  FOOTER TEXT */}
      <div className="cta-section-mobile">
        <div className="cta-title-mobile">STEP INTO THE FUTURE</div>
        <div className="cta-subtitle-mobile">KERALA • HEALTHCARE</div>
      </div>

    </div>

      {/* ================= SCROLL ZOOM IMAGE ================= */}
    <div
      ref={bottomImageRef}
      className={`relative w-full overflow-hidden ${
        isMobile ? "-mt-[10vh]" : "-mt-[20vh]"
      }`}
      style={{ height: isMobile ? "60vh" : "120vh" }}
    >
      {/* IMAGE */}
      <img
        src={bottomImage}
        alt="KerMedix Platform"
        className="w-full h-full object-cover block"
        style={{
          transform: `scale(${imageScale})`,
          transformOrigin: isMobile ? "center center" : "center top",
          transition: "transform 0.1s linear",
          willChange: "transform",
        }}
      />

    {/* ================= CONNECTED WATER WAVES ================= */}
    <div className="water-exact">
      <svg
        className="water-exact-svg"
        viewBox="0 0 1200 240"
        preserveAspectRatio="none"
      >
        {Array.from({ length: isMobile ? 14 : 10 }).map((_, i) => (
          <path
            key={i}
            className={`exact-wave w${i}`}
            d={
              isMobile
                ? `
                  M0 ${30 + i * 14}
                  C 60 ${20 + i * 14},
                    120 ${40 + i * 14},
                    180 ${30 + i * 14}
                  S 300 ${20 + i * 14},
                    360 ${30 + i * 14}
                  S 480 ${40 + i * 14},
                    540 ${30 + i * 14}
                  S 660 ${20 + i * 14},
                    720 ${30 + i * 14}
                  S 840 ${40 + i * 14},
                    900 ${30 + i * 14}
                  S 1020 ${20 + i * 14},
                    1080 ${30 + i * 14}
                  S 1140 ${40 + i * 14},
                    1200 ${30 + i * 14}
                `
                : `
                  M0 ${30 + i * 18}
                  C 100 ${10 + i * 18},
                    200 ${50 + i * 18},
                    300 ${30 + i * 18}
                  S 500 ${10 + i * 18},
                    600 ${30 + i * 18}
                  S 800 ${50 + i * 18},
                    900 ${30 + i * 18}
                  S 1100 ${10 + i * 18},
                    1200 ${30 + i * 18}
                `
            }
          />
        ))}
      </svg>
    </div>
    </div>


      {/* ================= PWA Install-ware button HOVER ================= */}
      {!isStandalone && (isInstallable || isIOS) && (
        <>
          {/* INFO CARD */}
          {showInstallInfo && (
            <div
              className="
                fixed bottom-20 right-4
                z-50
                w-64
                bg-white text-gray-800
                rounded-xl
                shadow-2xl
                p-4
                text-sm
              "
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setShowInstallInfo(false)}
                className="
                  absolute top-2 right-2
                  h-6 w-6
                  flex items-center justify-center
                  rounded-full
                  font-bold
                  text-[#046913]
                  hover:bg-gray-100
                  transition
                "
                aria-label="Close"
              >
                ✕
              </button>

              <div className="font-semibold mb-1 pr-6">
                {isIOS ? "Add to Home Screen" : "Go App Mode"}
              </div>

              <div className="text-xs text-gray-600 leading-relaxed mb-3">
                {isIOS ? (
                  <>
                    Tap <strong>Share</strong> →{" "}
                    <strong>Add to Home Screen</strong> to use KerMedix like an app.
                  </>
                ) : (
                  <>
                    Install KerMedix for a faster, fullscreen,
                    app-like experience.
                  </>
                )}
              </div>

              {!isIOS && (
                <button
                  onClick={() => {
                    setShowInstallInfo(false);
                    installApp();
                  }}
                  className="
                    w-full py-2
                    rounded-lg
                    bg-emerald-600
                    text-white text-xs font-semibold
                    hover:bg-emerald-700
                    transition
                  "
                >
                  Enable App Mode
                </button>
              )}
            </div>
          )}

          {/* FAB BUTTON  */}
          <div
            onClick={() => setShowInstallInfo(prev => !prev)}
            className="
              fixed bottom-4 right-4 z-50
              h-12 w-12
              flex items-center justify-center
              rounded-full
              bg-emerald-600
              text-white
              shadow-xl
              cursor-pointer
              hover:scale-110
              transition
            "
            title="Use KerMedix as App"
          >
            <Download className="h-5 w-5" />
          </div>
        </>
      )}

    </section>
  );
};

export default HeroSection;
