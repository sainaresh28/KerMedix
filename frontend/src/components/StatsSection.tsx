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
    const ctx = gsap.context(() => {
      gsap.set(".letter-wrapper", { y: 400 });
      gsap.set(".item-copy-wrapper p", { y: 50 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 1, ease: "power3.out" },
      });

      tl.to(".letter-wrapper", { y: 0, stagger: 0.1 })
        .to(".header-item-1", { left: "12vw" })
        .to(".header-item-2", { right: "8vw" }, "<")
        .to(".item-main img", {
          clipPath: "polygon(0% 100%,100% 100%,100% 0%,0% 0%)",
        }, "<")
        .to(".header-item-1", { left: 0, scale: 1 })
        .to(".header-item-2", { right: 0, scale: 1 }, "<")
        .to(".item-main img", { scale: 1 }, "<")
        .to(".item-side img", {
          clipPath: "polygon(0% 100%,100% 100%,100% 0%,0% 0%)",
          stagger: 0.1,
        }, "<")
        .to(".header", { bottom: "0" }, "<")
        .to(".item-copy-wrapper p", { y: 0, stagger: 0.05 }, "<");

      ScrollTrigger.create({
        trigger: ".stats-section",
        start: "top 70%",
        onEnter: () => tl.restart(),
        onLeaveBack: () => tl.pause(0),
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="stats-section">
      <style>{css}</style>

      {/* TOP TEXT */}
      <div className="top-text">
        <h2>Making Healthcare Accessible</h2>
      </div>

      <div className="container">
        <div className="items">

          <div className="items-col">
            {stats.slice(0, 2).map((s, i) => (
              <div className="item item-side stat-card" key={i}>
                <img src={s.img} />
                <div className="stat-overlay">
                  <div className="item-copy-wrapper"><p>{s.value}</p></div>
                  <div className="item-copy-wrapper"><p>{s.label}</p></div>
                </div>
              </div>
            ))}
          </div>

          <div className="items-col center">
            {stats.slice(2, 4).map((s, i) => (
              <div className="item-main stat-card" key={i}>
                <img src={s.img} />
                <div className="stat-overlay">
                  <div className="item-copy-wrapper"><p>{s.value}</p></div>
                  <div className="item-copy-wrapper"><p>{s.label}</p></div>
                </div>
              </div>
            ))}
          </div>

          <div className="items-col">
            {stats.slice(4, 6).map((s, i) => (
              <div className="item item-side stat-card" key={i}>
                <img src={s.img} />
                <div className="stat-overlay">
                  <div className="item-copy-wrapper"><p>{s.value}</p></div>
                  <div className="item-copy-wrapper"><p>{s.label}</p></div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* HEADER */}
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
}

.top-text{
  text-align:center;
  padding-top:3rem;
  max-width:800px;
  margin:0 auto;
}

.top-text h2{
  font-size:2.6rem;
  font-weight:700;
  color:#000;
}

.container{display:flex;width:100%;height:100%}
.items{display:flex;width:100%}
.items-col{flex:1;display:flex}
.center{justify-content:center}

.item,.item-main{
  position:relative;
  top:15vh;
  height:300px;
  flex:1;
  display:flex;
  flex-direction:column;
  overflow:hidden;
  border-radius:16px;
  box-shadow:0 12px 30px rgba(0,0,0,.08);
}

.item-main{width:300px;height:450px}

.stat-card img{
  width:100%;
  height:100%;
  object-fit:cover;
  clip-path:polygon(0 0,100% 0,100% 0,0 0);
}

.item-main img{
  transform:scale(.5);
  clip-path:polygon(50% 50%,50% 50%,50% 50%,50% 50%);
}

.stat-overlay{
  position:absolute;
  inset:0;
  background:linear-gradient(to top, rgba(0,0,0,.65), transparent);
  display:flex;
  flex-direction:column;
  justify-content:flex-end;
  padding:1.2rem;
}

.item-copy-wrapper{
  clip-path:polygon(0 0,100% 0,100% 100%,0 100%);
}

.item-copy-wrapper p{
  color:white;
  font-weight:600;
  line-height:1.1;
}

.item-copy-wrapper p:first-child{
  font-size:2rem;
}

.item-copy-wrapper p:last-child{
  font-size:1rem;
  color:#e0e0e0;
}

.header{
  position:absolute;
  bottom:35%;
  width:75%;
  display:flex;
  opacity:.55;
}

.header-item{
  flex:1;
  display:flex;
  justify-content:center;
  transform:scale(.25);
}

.header-item-1{left:10vw;position:relative}
.header-item-2{right:10vw;position:relative}

.letter{
  font-size:17vw;
  display:flex;
  justify-content:center;
  color:white;
  text-shadow:0 10px 30px rgba(0,0,0,.3);
}

.letter-wrapper{position:relative}
`;
