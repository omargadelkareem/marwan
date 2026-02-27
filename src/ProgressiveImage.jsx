// src/components/ProgressiveImage.jsx
import React, { useEffect, useRef, useState, memo } from "react";

const ProgressiveImage = memo(function ProgressiveImage({
  thumbSrc,
  src,                // الصورة الكبيرة
  alt,
  priority = false,   // أول 6 كروت مثلاً true
  aspect = "3 / 4",   // حافظ على مكان الصورة
}) {
  const wrapperRef = useRef(null);
  const [inView, setInView] = useState(priority); // لو priority نحمّل فورًا
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (priority) return; // حمّل فورًا
    const el = wrapperRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "200px 0px" } // ابدأ بدري شوية
    );
    io.observe(el);
    return () => io.disconnect();
  }, [priority]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: aspect,
        overflow: "hidden",
        background: "#f2f2f2",
      }}
    >
      {/* LQIP */}
      <img
        src={thumbSrc}
        alt={alt}
        decoding="async"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: loaded ? "blur(0px)" : "blur(12px)",
          transform: "scale(1.02)",
          transition: "filter .5s ease",
        }}
      />

      {/* الصورة الكبيرة — لا نضيفها إلا لما تكون inView */}
      {inView && (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchpriority={priority ? "high" : "low"}
          // دعم صيغ حديثة لو متوفرة عندك:
          srcSet={`${src}?w=480 480w, ${src}?w=768 768w, ${src}?w=1080 1080w`}
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={(e) => setLoaded(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: loaded ? 1 : 0,
            transition: "opacity .5s ease",
          }}
        />
      )}
    </div>
  );
});

export default ProgressiveImage;
