"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const AOSProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    AOS.init({
      once: true,
      easing: "ease-out-cubic",
      offset: 50,
      duration: 800,
    });
  }, []);

  return <>{children}</>;
};
