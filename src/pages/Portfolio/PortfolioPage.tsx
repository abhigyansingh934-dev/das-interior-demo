import React from "react";
import SpatialSpherePortfolio from "./SpatialSpherePortfolio";
import ProjectDetailPage from "./ProjectDetailPage";

interface PortfolioPageProps {
  onNavigate?: (route: string) => void;
  projectId?: string;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onNavigate,
  projectId,
}) => {
  if (projectId) {
    return <ProjectDetailPage projectId={projectId} onNavigate={onNavigate} />;
  }
  return <SpatialSpherePortfolio onNavigate={onNavigate} />;
};

export default PortfolioPage;
