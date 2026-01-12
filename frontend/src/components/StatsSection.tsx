import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  const stats = [
    { value: "1,100+", label: "Registered Workers", img: "/images/facility1.png" },
    { value: "80", label: "Healthcare Providers", img: "/images/facility2.png" },
    { value: "2,400+", label: "Digital Health Records", img: "/images/facility3.png" },
    { value: "750+", label: "Vaccinations Tracked", img: "/images/facility4.png" },
    { value: "14", label: "Districts Covered", img: "/images/facility5.png" },
    { value: "500+", label: "Emergency Accesses", img: "/images/facility6.png" },
  ];

  useEffect(() => {
    if (!ref.current) return;
    const section = ref.current;

    // wait for images (critical)
    const images = Array.from(section.querySelectorAll("img"));
    const waitForImages = Promise.all(
      images.map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) resolve();
            else img.onload = () => resolve();
          })
      )
    );

    let ctx: gsap.Context;

    waitForImages.then(() => {
      ctx = gsap.context(() => {
        gsap.set(section, { visibility: "visible" });


        gsap.set(".letter-wrapper", { y: 400 });
        gsap.set(".item-copy-wrapper p", { y: 50, opacity: 0 });


        gsap.set(".stat-card", {
          scale: 1.08,
          transformOrigin: "center center",
        });

        const tl = gsap.timeline({
          defaults: { duration: 1, ease: "power3.out" },
        });

        tl.to(".letter-wrapper", { y: 0, stagger: 0.1 })
          .to(".header-item-1", { left: "10vw" })
          .to(".header-item-2", { right: "6vw" }, "<")
          .to(
            ".item-main img",
            {
              clipPath: "polygon(0% 100%,100% 100%,100% 0%,0% 0%)",
            },
            "<"
          )
          .to(".header-item-1", { left: 0, scale: 1 })
          .to(".header-item-2", { right: 0, scale: 1 }, "<")
          .to(".header-item-1", { x: -18, duration: 0.6 }, ">")
          .to(".header-item-2", { x: 18, duration: 0.6 }, "<")
          .to(".item-main img", { scale: 1 }, "<")

   
          .to(
            ".stat-card",
            {
              scale: 1,
              duration: 1,
              ease: "power3.out",
              stagger: {
                each: 0.08,
                from: "center",
              },
            },
            "<"
          )

          .to(
            ".item-side img",
            {
              clipPath: "polygon(0% 100%,100% 100%,100% 0%,0% 0%)",
              stagger: 0.1,
            },
            "<"
          )
          .to(".header", { bottom: "0" }, "<")
          .to(
            ".item-copy-wrapper p",
            {
              y: 0,
              opacity: 1,
              stagger: 0.05,
            },
            "<"
          );

        ScrollTrigger.create({
          trigger: section,
          start: "top 85%",
          end: "bottom 20%",
          animation: tl,
          toggleActions: "restart none none reset",
        });

        // 🔢 COUNT-UP NUMBERS
        gsap.utils.toArray<HTMLElement>(".stat-number").forEach((el) => {
          const raw = el.dataset.value || "0";
          const hasPlus = raw.includes("+");
          const target = parseInt(raw.replace(/[^0-9]/g, ""), 10);

          gsap.fromTo(
            el,
            { innerText: "0" },
            {
              innerText: target,
              duration: 1.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
              },
              snap: { innerText: 1 },
              onUpdate: () => {
                const val = Math.floor(Number(el.innerText));
                el.innerText =
                  val.toLocaleString() + (hasPlus ? "+" : "");
              },
            }
          );
        });

        ScrollTrigger.refresh(true);
      }, section);
    });

    return () => ctx && ctx.revert();
  }, []);

  return (
    <section ref={ref} className="stats-section">
      <style>{css}</style>

      <div className="top-text">
        <h2>Making Healthcare Accessible</h2>
        <p>
          Our platform has empowered thousands of migrant workers with digital
          health records, ensuring healthcare continuity across Kerala.
        </p>
      </div>

      <div className="container">
        <div className="items">
          <div className="items-col">
            {stats.slice(0, 2).map((s, i) => (
              <div className="item item-side stat-card" key={i}>
                <img src={s.img} alt="" />
                <div className="stat-overlay">
                  <div className="item-copy-wrapper">
                    <p className="stat-number" data-value={s.value}>0</p>
                  </div>
                  <div className="item-copy-wrapper">
                    <p>{s.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="items-col center">
            {stats.slice(2, 4).map((s, i) => (
              <div className="item-main stat-card" key={i}>
                <img src={s.img} alt="" />
                <div className="stat-overlay">
                  <div className="item-copy-wrapper">
                    <p className="stat-number" data-value={s.value}>0</p>
                  </div>
                  <div className="item-copy-wrapper">
                    <p>{s.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="items-col">
            {stats.slice(4, 6).map((s, i) => (
              <div className="item item-side stat-card" key={i}>
                <img src={s.img} alt="" />
                <div className="stat-overlay">
                  <div className="item-copy-wrapper">
                    <p className="stat-number" data-value={s.value}>0</p>
                  </div>
                  <div className="item-copy-wrapper">
                    <p>{s.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="header">
          <div className="header-item header-item-1">
            {"OUR".split("").map((l, i) => (
              <div className="letter" key={i}>
                <div className="letter-wrapper">{l}</div>
              </div>
            ))}
          </div>

          <div className="header-item header-item-2">
            {"STATS".split("").map((l, i) => (
              <div className="letter" key={i}>
                <div className="letter-wrapper">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

/* ================= CSS ================= */

const css = `
.stats-section{
  width:100vw;
  height:100vh;
  background:#f5f6f7;
  overflow:hidden;
  position:relative;
  font-family:Inter, sans-serif;
  visibility:hidden;
  perspective:1200px;
}

.top-text{
  text-align:center;
  padding-top:1.5rem;
}

.top-text h2{
  font-size:2.6rem;
  font-weight:700;
}

.top-text p{
  margin-top:.5rem;
  max-width:640px;
  margin-inline:auto;
  color:#555;
}

.container{display:flex;width:100%;height:100%}
.items{display:flex;width:100%}
.items-col{flex:1;display:flex}
.center{justify-content:center}

.item,.item-main{
  position:relative;
  top:8vh;
  height:300px;
  flex:1;
  overflow:hidden;
  border-radius:22px;
  background:rgba(255,255,255,.35);
  backdrop-filter:blur(18px) saturate(140%);
  border:1px solid rgba(255,255,255,.45);
  box-shadow:0 30px 60px rgba(0,0,0,.18),
             inset 0 1px 1px rgba(255,255,255,.45);
  transform:translateZ(80px);
  transition:transform .6s ease, box-shadow .6s ease;
}

.item-main{width:300px;height:450px}

.stat-card:hover{
  transform:translateZ(120px) scale(1.03);
}

.stat-card img{
  width:100%;
  height:100%;
  object-fit:cover;
  filter:saturate(105%) contrast(102%);
}

.stat-overlay{
  position:absolute;
  inset:0;
  padding:1.3rem;
  display:flex;
  flex-direction:column;
  justify-content:flex-end;
  background:linear-gradient(
    to top,
    rgba(0,0,0,.55),
    rgba(0,0,0,.25),
    transparent
  );
}

.stat-overlay::after{
  content:"";
  position:absolute;
  inset:0;
  background:linear-gradient(
    120deg,
    rgba(255,255,255,.35),
    rgba(255,255,255,.12),
    transparent
  );
  opacity:.25;
}

.item-copy-wrapper p{
  color:white;
  font-weight:700;
}

.item-copy-wrapper p:first-child{
  font-size:2.4rem;
  font-weight:800;
  letter-spacing:-0.03em;
}

.item-copy-wrapper p:last-child{
  font-size:1.05rem;
  font-weight:600;
  color:#f0f0f0;
}

.header{
  position:absolute;
  bottom:35%;
  width:75%;
  display:flex;
  opacity:.55;
  transform:translateX(-3vw);
  pointer-events:none;
}

.header-item{
  flex:1;
  display:flex;
  justify-content:center;
  transform:scale(.25);
}

.header-item-1{left:5vw;position:relative}
.header-item-2{right:5vw;position:relative}

.letter{
  font-size:17vw;
  color:white;
  text-shadow:0 10px 30px rgba(0,0,0,.3);
}

.letter-wrapper{position:relative}



/* ================= MOBILE CAROUSEL  ================= */
@media (max-width: 768px) {

  /* Allow section to expand */
  .stats-section{
    height:auto;
    min-height:100vh;
    overflow:visible;
    padding-bottom:3rem;
  }

  .container{
    height:auto;
  }

  /* Horizontal carousel */
  .items{
    display:flex;
    flex-direction:row;
    overflow-x:auto;
    overflow-y:visible;

    gap:1rem;
    padding:1.5rem 1rem;

    scroll-snap-type:x mandatory;
    -webkit-overflow-scrolling:touch;
  }

  /* Each CARD is a slide (not column) */
  .items-col{
    display:contents; 
  }

  .item,
  .item-main{
    flex:0 0 85%;
    max-width:85%;
    height:260px;

    top:0;
    transform:translateZ(0);
    scroll-snap-align:center;
  }

  /* Disable hover zoom on touch */
  .stat-card:hover{
    transform:none;
  }

  /* OUR STATS — SAME animation, just resized */
  .header{
    position:relative;
    bottom:auto;
    width:100%;
    margin-top:1.5rem;
    transform:none;
    justify-content:center;
  }

  .header-item{
    transform:scale(.45);
  }

  .letter{
    font-size:22vw;
  }

  /* Text sizing */
  .top-text h2{
    font-size:2rem;
  }

  .top-text p{
    font-size:.95rem;
    padding:0 .5rem;
  }

  /* Hide scrollbar */
  .items::-webkit-scrollbar{
    display:none;
  }
  .items{
    scrollbar-width:none;
  }
}


`;

