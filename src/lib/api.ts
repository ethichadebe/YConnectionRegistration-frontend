declare global {
  interface Window { YC_API?: string; }
}

export const API =
  (typeof window !== "undefined" && window.YC_API) ||
  "https://yconnectionregistration-backend.onrender.com";
