import React from "react";
import { AboutSection } from "./AboutSection";

interface AboutPageProps {
  onNavigate?: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="about-page-root">
      <AboutSection variant="page" onNavigate={onNavigate} />
    </div>
  );
};

export default AboutPage;
