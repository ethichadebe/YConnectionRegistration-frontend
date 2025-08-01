import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_REACT_APP_GA_ID;

export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.error("Google Analytics Measurement ID is missing");
    return;
  }
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const logPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
