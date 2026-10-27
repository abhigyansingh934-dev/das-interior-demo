import React from "react";
import { motion } from "motion/react";
import PortfolioNav from "../Portfolio/PortfolioNav";
import GlassmorphicFooter from "../../components/Footer/GlassmorphicFooter";

interface AboutSectionProps {
  variant?: "home" | "page";
  onNavigate?: (route: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  variant = "home",
  onNavigate,
}) => {
  const handleNav = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.history.pushState({ route }, "", route);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-[#3B0D1A] flex flex-col z-10" id="about">
      {variant === "page" && <PortfolioNav onNavigate={handleNav} activeRoute="/about" />}

      {/* 1. Centered Content */}
      <div className="flex-1 flex flex-col items-center w-full pt-[100px] md:pt-[400px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center w-full px-8 text-center z-20 relative max-w-[900px] h-auto md:h-[620px] mx-auto"
        >
          {/* a) Logo SVG -- white fill, 80x80, mb-12 */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-12"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M60 120C26.8629 120 0 93.1371 0 60V0C22.5654 0 42.2213 12.4569 52.4662 30.8691C38.4788 34.2089 28.0787 46.7902 28.0787 61.8006V63.1443C28.0787 79.9648 41.7146 93.6006 58.5353 93.6006H59.8789L59.8785 61.8006C59.8785 79.3633 74.1159 93.6006 91.6787 93.6006L91.6787 61.8006C91.6787 44.2783 77.5071 30.0661 60 30.0008L60 0H62.5352C94.2722 0 120 25.7279 120 57.4648V60C120 93.1371 93.1371 120 60 120Z"
              fill="white"
            />
          </svg>

          {/* b) Mission statement */}
          <p className="text-white text-[15px] md:text-[16px] h-auto w-full max-w-[560px] leading-[1.65] mb-[36px] uppercase tracking-wider mx-auto font-medium">
            We believe architecture should be calm, climate-responsive, and grounded in purpose — crafting homes and workspaces that elevate daily life in Purnia and Eastern Bihar.
          </p>

          {/* c) Studio mark / signature */}
          <div className="font-marck text-white text-[80px] md:text-[110px] leading-none mb-[28px]">
            Das Architects
          </div>

          {/* d) Two paragraphs (architectural philosophy) */}
          <div className="text-white leading-[1.7] mb-[80px] md:mb-20 w-full flex flex-col items-center font-light">
            <p className="mb-[20px] text-[15px] md:text-[16px] w-[540px] max-w-full text-center opacity-95">
              Architecture in our region demands a thoughtful balance between material endurance and spatial openness. We design spaces that celebrate natural daylight, facilitate passive airflow, and respond to regional climate realities with understated contemporary elegance.
            </p>
            <p className="text-[15px] md:text-[16px] w-[540px] max-w-full text-center opacity-90">
              From standalone family residences to modern commercial interiors across Purnia and nearby districts, every commission is approached with disciplined planning, honest detailing, and close personal attention.
            </p>
          </div>
        </motion.div>
      </div>

      {/* 2. Bottom Video with Red Gradient Blend */}
      <div className="relative w-full shrink-0">
        <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-[#FF0000] to-transparent z-10 pointer-events-none" />
        <video autoPlay loop muted playsInline className="w-full h-auto block object-contain">
          <source
            src="https://res.cloudinary.com/daklr2whx/video/upload/v1778602552/track-video_2_s9lp53.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {variant === "page" && <GlassmorphicFooter />}
    </section>
  );
};

export default AboutSection;
