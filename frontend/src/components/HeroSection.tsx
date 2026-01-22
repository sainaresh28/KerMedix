import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';


import healthWorkers from '@/assets/prognosis-icon-2803190_1280.png';
import smartHealthcare from '@/assets/stethoscope-icon-2316460_1280.png';
import sideVideo from '@/assets/1uEgB20NU24EH65gog.mp4';


const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

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

  return (

    
    <section 
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, hsl(152 45% 22%) 0%, hsl(152 38% 28%) 50%, hsl(152 32% 18%) 100%)',
      }}
    >

        {/* ================= MOBILE CSS ================= */}
        <style>
        {`
        /* =====================================================
          HERO VISIBILITY
        ===================================================== */
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

        /* =====================================================
          MOBILE HERO 
        ===================================================== */
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
            -webkit-text-stroke: 2px rgba(232, 228, 214, 0.65); /* desktop HEALTH stroke */
          }

          .title-records {
            color: #e8e4d6; /* desktop RECORDS warm beige */
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
            top: 300px;
            right: -5px;
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
            bottom: -20px;
            right: 180px;
            width: 140px;
            height: 140px;
            border-radius: 50%;
            background: #5fa1b9; /* unchanged */
            padding: 1.6rem;
          }

          /* ---------- KERMEDIX ---------- */
          .kermedix-text {
            margin-top: 18rem;
            text-align: center;
            font-size: 2.8rem;
            font-weight: 900;
            letter-spacing: 0.08em;
            color: rgba(255, 255, 255, 0.18); /* desktop faded watermark */
          }

          /* ---------- STATS CARD ---------- */
          .hero-stats-mobile {
            margin: 1.8rem auto 2.2rem;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            background: rgba(255, 255, 255, 0.08); /* desktop glass feel */
            backdrop-filter: blur(10px);
            border-radius: 16px;
            overflow: hidden;
            max-width: 100%;
          }

          .hero-stats-mobile .stat-item {
            padding: 1.2rem 0.5rem;
            text-align: center;
          }

          .hero-stats-mobile strong {
            font-size: 1.05rem;
            font-weight: 700;
            color: #ffffff;
          }

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
            font-size: 0.65rem;
            letter-spacing: 0.25em;
            color: rgba(255, 255, 255, 0.5);
          }

          .cta-subtitle-mobile {
            font-size: 0.65rem;
            letter-spacing: 0.18em;
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

        `}
        </style>


   <div className="hero-main">

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex">
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
                className="absolute right-0 lg:right-[8%] top-[20%] -translate-y-1/2 z-20 flex items-center gap-6"

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
                    transformStyle: 'preserve-3d',
                    transform: `${isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'} translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
                    transition: 'transform 0.8s cubic-bezier(0.2, 0, 0.2, 1)',
                  }}
                >
                  {/* Front */}
                  <div style={{ backfaceVisibility: 'hidden' }}>
                    <img
                      src={healthWorkers}
                      className="w-[160px] sm:w-[200px] lg:w-[240px]"

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
                     className="w-[160px] sm:w-[200px] lg:w-[240px]"

                    />
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

              <div 
                className="flex flex-wrap items-center gap-4"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.8s ease-out 0.6s',
                }}
              >
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-20"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1s ease-out 0.9s',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">

          {/* Stats Preview */}
         <div className="hidden md:flex items-center justify-center gap-8 text-center w-full pl-64">


            {[
              { value: '3.5M+', label: 'Citizens' },
              { value: '850+', label: 'Health Centers' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-wider text-white/40">{stat.label}</div>
              </div>
            ))}
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


    </section>
  );
};

export default HeroSection;
