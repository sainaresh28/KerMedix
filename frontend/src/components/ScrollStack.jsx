import { useEffect, useRef, useCallback } from "react";
import "./ScrollStack.css";

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);
  const cardsRef = useRef([]);
  const lenisRef = useRef(null);
  const animationFrameRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const cachedValuesRef = useRef({
    stackPositionPx: 0,
    scaleEndPositionPx: 0,
    containerHeight: 0,
    endElementTop: 0,
    cardPositions: [],
  });

  /* ---------------- Utilities ---------------- */

  const parsePercentage = useCallback((value, height) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * height;
    }
    return parseFloat(value);
  }, []);

  const calculateProgress = (scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  };

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      };
    }

    const scroller = scrollerRef.current;
    if (!scroller) return { scrollTop: 0, containerHeight: 0 };

    return {
      scrollTop: scroller.scrollTop,
      containerHeight: scroller.clientHeight,
    };
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (el) => {
      if (!el) return 0;
      if (useWindowScroll) {
        const rect = el.getBoundingClientRect();
        return rect.top + window.scrollY;
      }
      return el.offsetTop;
    },
    [useWindowScroll]
  );

  /* ---------------- Cached Geometry ---------------- */

  const updateCachedValues = useCallback(() => {
    const { containerHeight } = getScrollData();

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(
      scaleEndPosition,
      containerHeight
    );

    const endElement = useWindowScroll
      ? document.querySelector(".scroll-stack-end")
      : scrollerRef.current?.querySelector(".scroll-stack-end");

    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    const cardPositions = cardsRef.current.map((card) =>
      card ? getElementOffset(card) : 0
    );

    cachedValuesRef.current = {
      stackPositionPx,
      scaleEndPositionPx,
      containerHeight,
      endElementTop,
      cardPositions,
    };
  }, [
    getScrollData,
    parsePercentage,
    stackPosition,
    scaleEndPosition,
    useWindowScroll,
    getElementOffset,
  ]);

  /* ---------------- Animation Logic ---------------- */

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop } = getScrollData();
    const {
      stackPositionPx,
      scaleEndPositionPx,
      containerHeight,
      endElementTop,
      cardPositions,
    } = cachedValuesRef.current;

    let topCardIndex = 0;
    if (blurAmount) {
      for (let i = 0; i < cardsRef.current.length; i++) {
        const trigger = cardPositions[i] - stackPositionPx - itemStackDistance * i;
        if (scrollTop >= trigger) topCardIndex = i;
      }
    }

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardPositions[i];
      const triggerStart =
        cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(
        scrollTop,
        triggerStart,
        triggerEnd
      );

      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount
        ? i * rotationAmount * scaleProgress
        : 0;

      let blur = 0;
      if (blurAmount && i < topCardIndex) {
        blur = (topCardIndex - i) * blurAmount;
      }

      let translateY = 0;
      if (scrollTop >= triggerStart && scrollTop <= pinEnd) {
        translateY =
          scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY =
          pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const last = lastTransformsRef.current.get(i);
      const changed =
        !last ||
        Math.abs(last.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(last.scale - newTransform.scale) > 0.001 ||
        Math.abs(last.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(last.blur - newTransform.blur) > 0.1;

      if (changed) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale})${
          rotation ? ` rotate(${newTransform.rotation}deg)` : ""
        }`;
        card.style.filter =
          newTransform.blur > 0
            ? `blur(${newTransform.blur}px)`
            : "none";

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const inView = scrollTop >= triggerStart && scrollTop <= pinEnd;
        if (inView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        }
        if (!inView) stackCompletedRef.current = false;
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    getScrollData,
  ]);

  const handleScroll = useCallback(() => {
    if (!isUpdatingRef.current) updateCardTransforms();
  }, [updateCardTransforms]);

  /* ---------------- Lenis Setup (SAFE) ---------------- */

  const setupLenis = useCallback(async () => {
    if (typeof window === "undefined") return;

    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }

    if (!useWindowScroll) {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      scroller.addEventListener("scroll", handleScroll, { passive: true });
      lenisRef.current = {
        destroy: () =>
          scroller.removeEventListener("scroll", handleScroll),
      };
      return;
    }

    const { default: Lenis } = await import("lenis/dist/lenis.mjs");


    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1,
      smoothWheel: true,
      touchMultiplier: 2,
      syncTouch: true,
      syncTouchLerp: 0.075,
    });

    lenis.on("scroll", handleScroll);

    const raf = (time) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };

    animationFrameRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;
  }, [handleScroll, useWindowScroll]);

  /* ---------------- Effect ---------------- */

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scroller = scrollerRef.current;
    if (!scroller && !useWindowScroll) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll(".scroll-stack-card")
        : scroller.querySelectorAll(".scroll-stack-card")
    );

    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.transform = "translateZ(0)";
    });

    updateCachedValues();
    setupLenis();
    updateCardTransforms();

    const onResize = () => {
      updateCachedValues();
      updateCardTransforms();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      stackCompletedRef.current = false;
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    useWindowScroll,
    setupLenis,
    updateCachedValues,
    updateCardTransforms,
  ]);

  return (
    <div
      className={`scroll-stack-scroller ${className}`.trim()}
      ref={scrollerRef}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" style={{ height: "50vh" }} />
      </div>
    </div>
  );
};

export default ScrollStack;
