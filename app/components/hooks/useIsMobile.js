// hooks/useIsMobile.js
"use client";

import { useState, useEffect } from "react";

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsMobile(window.innerHeight > window.innerWidth);
    };

    checkOrientation(); 
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  return isMobile;
}
