"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export default function GsapSetup() {
  useEffect(() => {
    const isDesktop = window.innerWidth > window.innerHeight;
    const Start = isDesktop ? "top bottom" : "top 50%";
    const End = isDesktop ? "center 60%" : "center center";

    gsap.from("#about .top .left", {
      scrollTrigger: {
        trigger: "#about",
        start: Start,
        end: End,
        scrub: true,
      },
      y: "100%",
      ease: "power1.inOut",
    });

    gsap.from("#video .heading", {
      scrollTrigger: {
        trigger: "#video ",
        start: "top bottom",
        end: "center bottom",
        scrub: true,
      },
      y: "140%",
      ease: "power1.inOut",
    });

    gsap.from("#gallery .img", {
      scrollTrigger: {
        trigger: "#gallery",
        start: Start,
        end: End,
        scrub: true,
      },
      width: 0,
      opacity: 0,
      ease: "power1.inOut",
    });

    gsap.from("#outro .card", {
      scrollTrigger: {
        trigger: "#outro",
        start: Start,
        end: End,
        scrub: true,
      },
      y: "100%",
      ease: "power1.inOut",
    });
  }, []);

  return null;
}
