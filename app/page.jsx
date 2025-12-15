"use client";
import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import headPhone from "../public/images/brown.png";
import headPhone1 from "../public/images/green.png";
import headPhone3 from "../public/images/black.png";
import gallery1 from "../public/images/img1.jpeg";
import gallery2 from "../public/images/img1.jpeg";
import gallery3 from "../public/images/img2.jpeg";
import outro from "../public/images/img4.jpg";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import GsapSetup from "./components/GsapSetup";
import { SplitText } from "gsap/all";

const page = () => {
  const textRef = useRef(null);
  const movingRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const movingAboutRef = useRef(null);
  const videoRef = useRef(null);
  const movingVideoRef = useRef(null);
  const galleryRef = useRef(null);
  const movingGalleryRef = useRef(null);
  const productRef = useRef(null);
  const movingProductRef = useRef(null);

  const [isDesktop, setIsDesktop] = useState(false);

  useGSAP(() => {
    if (window.innerWidth > window.innerHeight) {
      setIsDesktop(true);
    }

    const Start = isDesktop ? "top bottom" : "top bottom";
    const End = isDesktop ? "center 60%" : "center 60%";

    const parentRect = movingRef.current.parentNode.getBoundingClientRect();
    const hero = heroRef.current.getBoundingClientRect();
    const about = aboutRef.current.getBoundingClientRect();
    const video = videoRef.current.getBoundingClientRect();
    const gallery = galleryRef.current.getBoundingClientRect();
    const product = productRef.current.getBoundingClientRect();

    //  initial position
    {
      gsap.set(movingRef.current, {
        x: hero.left - parentRect.left,
        y: hero.top,
        width: hero.width,
        height: hero.height,
      });

      gsap.set(movingAboutRef.current, {
        x: about.left - parentRect.left,
        y: about.top - parentRect.top,
        width: about.width,
        height: about.height,
        rotate: 90,
      });

      gsap.set(movingVideoRef.current, {
        x: video.left - parentRect.left + (video.width / 100) * 15,
        y: video.top - parentRect.top + (video.height / 100) * 15,
        width: (video.width / 100) * 70,
        height: (video.height / 100) * 70,
        rotate: 45,
      });

      gsap.set(movingGalleryRef.current, {
        x: gallery.left - parentRect.left,
        y: gallery.top - parentRect.top,
        width: gallery.width,
        height: gallery.height,
      });

      gsap.set(movingProductRef.current, {
        x: product.left - parentRect.left,
        y: product.top - parentRect.top,
        width: product.width,
        height: product.height,
      });
    }

    //main animation
    {
      gsap.fromTo(
        movingRef.current,
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          immediateRender: false,
        }
      );

      const split = new SplitText(textRef.current, {
        type: "lines",
      });

      // IMPORTANT
      gsap.set(textRef.current, { visibility: "visible" });

      gsap.fromTo(
        split.lines,
        { y: "100%", opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.6,
          delay: 0.3,
          ease: "power1.inOut",
        }
      );

      gsap.to(movingRef.current, {
        scrollTrigger: {
          trigger: "#about",
          start: Start,
          end: End,
          scrub: true,
        },
        x: about.left - parentRect.left,
        y: about.top - parentRect.top,
        width: about.width,
        height: about.height,
        ease: "power1.inOut",
        rotate: 90,
        onComplete: () => {
          gsap.set(movingRef.current, {
            opacity: 0,
          });
          gsap.set(movingAboutRef.current, {
            opacity: 1,
          });
        },
      });

      gsap.to(movingAboutRef.current, {
        scrollTrigger: {
          trigger: "#video",
          start: Start,
          end: End,
          scrub: true,
        },
        x: video.left - parentRect.left + (video.width / 100) * 15,
        y: video.top - parentRect.top + (video.height / 100) * 15,
        width: (video.width / 100) * 70,
        height: (video.height / 100) * 70,
        ease: "power1.inOut",
        rotate: 45,
        onReverseComplete: () => {
          gsap.set(movingRef.current, {
            opacity: 1,
          });
          gsap.set(movingAboutRef.current, {
            opacity: 0,
          });
        },
        onComplete: () => {
          gsap.set(movingAboutRef.current, {
            opacity: 0,
          });
          gsap.set(movingVideoRef.current, {
            opacity: 1,
          });
        },
      });

      gsap.to(movingVideoRef.current, {
        scrollTrigger: {
          trigger: "#gallery",
          start: Start,
          end: End,
          scrub: true,
        },
        x: gallery.left - parentRect.left,
        y: gallery.top - parentRect.top,
        width: gallery.width,
        height: gallery.height,
        ease: "power1.inOut",
        rotate: 0,
        onReverseComplete: () => {
          gsap.set(movingAboutRef.current, {
            opacity: 1,
          });
          gsap.set(movingVideoRef.current, {
            opacity: 0,
          });
        },
        onComplete: () => {
          gsap.set(movingVideoRef.current, {
            opacity: 0,
          });
          gsap.set(movingGalleryRef.current, {
            opacity: 1,
          });
        },
      });

      gsap.to(movingGalleryRef.current, {
        scrollTrigger: {
          trigger: "#products",
          start: Start,
          end: End,
          scrub: true,
        },
        x: product.left - parentRect.left,
        y: product.top - parentRect.top,
        width: product.width,
        height: product.height,
        ease: "power1.inOut",
        rotate: 0,
        onReverseComplete: () => {
          gsap.set(movingVideoRef.current, {
            opacity: 1,
          });
          gsap.set(movingGalleryRef.current, {
            opacity: 0,
          });
        },
      });
    }
  }, []);
  return (
    <div className="max-w-360 mx-auto relative px-1 sm:px-3 2xl:px-0 text-[2.2dvh] sm:text-lg font-Dm">
      <GsapSetup />
      <Header />
      <div className="moving-images">
        <Image
          ref={movingRef}
          src={headPhone}
          id="moving-headphone"
          alt=""
          className="absolute z-40 will-change-transform opacity-0 scale-0"
        />
        <Image
          ref={movingAboutRef}
          src={headPhone}
          alt="headphone-image"
          className="opacity-0 absolute z-40 will-change-transform"
        />
        <Image
          ref={movingVideoRef}
          src={headPhone}
          alt="headphone-image"
          className="opacity-0 absolute z-40 will-change-transform"
        />
        <Image
          ref={movingGalleryRef}
          src={headPhone}
          alt="headphone-image"
          className="opacity-0 absolute z-40 will-change-transform"
        />
        <Image
          ref={movingProductRef}
          src={headPhone}
          alt="headphone-image"
          className="opacity-0 absolute z-40 will-change-transform"
        />
      </div>

      {/* Hero section */}
      <section
        id="hero"
        className={` flex flex-col xl:flex-row justify-center items-center relative w-full landscape:h-dvh portrait:h-screen gap-20 sm:gap-0 md:gap-20 `}
      >
        <Image
          ref={heroRef}
          src={headPhone}
          id="headphone"
          alt="headphone-image"
          className="opacity-0 max-w-[60%]  xl:absolute aspect-square  sm:absolute md:static"
        />
        <h1
          ref={textRef}
          className="heading text-center font-Outfit font-bold text-[20vw] leading-[80%] 2xl:text-[18rem] text-primary invisible"
        >
          <span className="block">Modern</span>
          <span className="block">Harmony</span>
        </h1>
      </section>

      {/* About section */}
      <section
        id="about"
        className="w-full landscape:h-dvh portrait:h-screen xl:py-20 2xl:py-32 relative flex md:flex flex-col justify-around md:justify-between  visible sm:invisible md:visible "
      >
        <div className="top text-center md:text-left">
          <div className="left max-w-lg flex flex-col gap-y-3 md:gap-y-7  items-center md:items-start ">
            <h2 className="heading text-[15vw] sm:text-[10vw] md:text-[14vw] leading-[80%] xl:text-[10rem] font-bold font-Dm text-primary uppercase">
              true
              <br />
              carity
            </h2>
            <p className="  w-4/5 md:w-auto ">
              Engineered for clarity, comfort, and immersive sound — Audira
              redefines your listening experience with style and performance in
              perfect harmony.
            </p>
            <div className="hidden md:flex ">
              <button className=" bg-secondary py-2 px-1.5 sm:py-2.5 sm:px-5 rounded-[10px] font-Dm flex justify-center items-center font-medium text-white sm:text-lg ">
                <a href=""> Buy Now</a>
              </button>
            </div>
          </div>

          <Image
            ref={aboutRef}
            src={headPhone}
            alt="headphone-image"
            className="opacity-0 max-w-[40%] absolute right-1/2 translate-x-1/2 md:translate-x-full xl:translate-x-0 xl:right-0 top-1/2 xl:top-0 -translate-y-2/3 md:-translate-y-1/3 xl:translate-y-0 rotate-90 "
          />
        </div>
        <div className="bottom flex flex-col md:flex-row gap-y-5 sm:gap-3 xl:gap-6 items-center xl:items-start ">
          <div className="list w-11/12 xl:w-full flex flex-col p-1 lg:p-4 md:border-2 xl:border-4 rounded-xl gap-1">
            <h2 className="uppercase font-Outfit text-lg lg:text-2xl font-bold">
              crystal clear audio
            </h2>
            <p className="text-xs sm:text-sm">
              Hear every detail with balanced bass and studio-quality mids and
              highs.
            </p>
          </div>
          <div className="list w-11/12 xl:w-full  flex-col p-1 lg:p-4 md:border-2 xl:border-4 rounded-xl gap-1 text-right sm:text-left ">
            <h2 className="uppercase font-Outfit text-lg lg:text-2xl font-bold">
              crystal clear audio
            </h2>
            <p className="text-xs sm:text-sm">
              Hear every detail with balanced bass and studio-quality mids and
              highs.
            </p>
          </div>
          <div className="list w-11/12 xl:w-full  flex-col p-1 lg:p-4 md:border-2 xl:border-4 rounded-xl gap-1">
            <h2 className="uppercase font-Outfit text-lg lg:text-2xl font-bold">
              crystal clear audio
            </h2>
            <p className="text-xs sm:text-sm">
              Hear every detail with balanced bass and studio-quality mids and
              highs.
            </p>
          </div>
        </div>
      </section>

      {/* video */}
      <section
        id="video"
        className="landscape:h-dvh portrait:h-screen relative flex flex-col justify-evenly xl:justify-between py-5 md:py-20 overflow-clip"
      >
        <h2 className="heading text-center font-Outfit font-bold text-[14vw] leading-[80%]  uppercase 2xl:text-[13rem] text-primary">
          masterbeat
        </h2>
        <div className="video px-2 xl:px-0 relative">
          <video
            loop
            autoPlay
            muted
            src="/videos/video.mp4"
            className=" sm:w-1/3"
          ></video>
          {!isDesktop && (
            <Image
              ref={videoRef}
              src={headPhone}
              id="headphone"
              alt="headphone-image"
              className="opacity-0 max-w-[50%] absolute top-1/2 left-1/2 -translate-1/2  rotate-45 "
            />
          )}
        </div>
        <div className="text text-center text-lg lg:text-right flex flex-col gap-y-3 items-end ">
          <p className=" lg:w-2/3 xl:w-1/2">
            Crafted for the modern audiophile, Audira headphones deliver sound
            so rich, it pulses through your senses. From crisp highs to deep,
            rolling bass—you don’t just hear it, you feel it.
          </p>
          <p className=" lg:w-2/3 xl:w-1/2 hidden md:block ">
            Whether you're in focus mode or free flow, the precision-tuned audio
            adapts to your pace. With Masterbeat, music becomes your personal
            soundtrack—bold, immersive, unforgettable.
          </p>
        </div>
        {isDesktop && (
          <Image
            ref={videoRef}
            src={headPhone}
            id="headphone"
            alt="headphone-image"
            className="opacity-0 max-w-[50%] absolute top-1/3 left-1/2 -translate-y-1/3 sm:-translate-x-1/2 -translate-x-1/2 xl:translate-x-0 rotate-45 "
          />
        )}
      </section>

      {/* gallery */}
      <section
        id="gallery"
        className="landscape:h-dvh portrait:h-screen  relative flex flex-col justify-between py-5 md:py-20 "
      >
        <div className="img w-2/3 sm:w-4/12 xl:w-3xs absolute top-1/12 xl:top-1/6 left-[5%] lg:left-1/12 rotate-15 border-4 border-primary">
          <Image
            src={gallery1}
            alt="headphone-image"
            className=" h-full w-full border-4 border-white"
          />
        </div>
        <div className="img  w-3/5  sm:w-3/12 xl:w-2xs absolute bottom-1/6 right-[5%] lg:left-1/10 -rotate-12 border-4 border-primary">
          <Image
            src={isDesktop ? gallery2 : gallery3}
            alt="headphone-image"
            className=" h-full w-full border-4 border-white"
          />
        </div>
        <div className="img hidden lg:flex w-2/5 sm:w-4/12 xl:w-sm absolute top-1/4 right-[5%] lg:right-1/12 rotate-14 border-4 border-primary">
          <Image
            src={gallery3}
            alt="headphone-image"
            className=" h-full w-full border-4 border-white"
          />
        </div>
        <Image
          ref={galleryRef}
          src={headPhone}
          id="headphone"
          alt="headphone-image"
          className="opacity-0 max-w-[50%] absolute top-1/2 left-1/2 -translate-1/2  "
        />
      </section>

      {/* products */}
      <section
        id="products"
        className="landscape:h-dvh portrait:h-[75vh] relative flex flex-col justify-center items-center"
      >
        <div className="w-full flex flex-col items-center gap-y-20">
          <h2 className="heading text-center font-Outfit font-bold text-[14vw] leading-[80%]  uppercase xl:text-[9rem] text-primary">
            top picks
          </h2>
          <div className="list flex gap-5 md:gap-10 lg:gap-x-20 xl:w-2/3">
            <div className="w-1/3 flex flex-col justify-center items-center gap-4">
              <Image src={headPhone1} alt="headphone-image" className="" />
              <div className="text flex flex-col justify-center items-center gap-1 w-full">
                <h2 className="font-bold">Audira One</h2>
                <p>$250</p>
              </div>
            </div>
            <div className="w-1/3 flex flex-col justify-center items-center gap-4">
              <Image
                ref={productRef}
                src={headPhone}
                alt="headphone-image"
                className="opacity-0"
              />
              <div className="text flex flex-col justify-center items-center gap-1 w-full">
                <h2 className="font-bold">Audira Plus</h2>
                <p>$450</p>
              </div>
            </div>
            <div className="w-1/3 flex flex-col justify-center items-center gap-4">
              <Image src={headPhone3} alt="headphone-image" />
              <div className="text flex flex-col justify-center items-center gap-1 w-full">
                <h2 className="font-bold">Audira Max </h2>
                <p>$650</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* outro */}
      <section
        id="outro"
        className=" relative landscape:h-dvh portrait:h-[60vh] overflow-hidden flex rounded-xl  items-center px-4 sm:px-10 "
      >
        {/* Background Image */}
        <Image
          src={outro}
          alt="outro"
          fill
          priority
          className="object-cover  "
        />

        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Glass Text Card */}
        <div className="card relative max-w-xl ml-auto p-5 sm:p-8 rounded-2xl backdrop-blur-sm bg-white/10 border border-white/20 shadow-2xl text-white ">
          <h2 className="heading font-Outfit font-bold text-[14vw] leading-[80%] uppercase xl:text-[5rem]">
            pure
            <br />
            escape
          </h2>

          <div className="flex flex-col gap-y-4 mt-4 text-sm sm:text-base">
            <p>
              Step into a world where every note feels alive. Audira headphones
              are engineered to create a sound experience that surrounds
              you—deep, rich, and breathtaking.
            </p>
            <p>
              Whether you're working, relaxing, or moving, our design blends
              comfort and clarity for every lifestyle. You don’t just listen —
              you feel the moment.
            </p>
          </div>
        </div>
      </section>

      <footer className="w-full flex justify-between py-2 md:py-5 ">
        <img src="/images/logo.png" className="logo" />
        <div className="social flex gap-5 items-center">
          <a href="">
            <img src="/images/fb.png" />
          </a>
          <a href="">
            <img src="/images/insta.png" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default page;
