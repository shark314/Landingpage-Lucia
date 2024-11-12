"use client";

import PageIllustration from "@/components/page-illustration";
import BusinessCategories from "@/components/business-categories";
import LogoSection from "@/components/logoSection";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from 'three'; // Import Three.js types
import { PointerEvent as ReactPointerEvent } from 'react';

import Spline from '@splinetool/react-spline';


export default function HeroHome() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const sectionStyle = {
    backgroundImage: `url('../images/bg_img.svg')`,
    backgroundSize: "cover", // Adjust background size
    backgroundPosition: "center", // Adjust position
    backgroundRepeat: "no-repeat", // Ensure it doesn't repeat
  };

  // Define the type for the pointer prop
  type Pointer = {
    x: number;
    y: number;
  };

  const Logo3D = ({ pointer }: { pointer: Pointer }) => {
    const logoRef = useRef<THREE.Group | null>(null); // Define the type of ref to be a THREE.Group
    const { scene } = useGLTF("../models/logo.glb"); // Load your 3D model from the public folder
  
    useFrame(() => {
      if (logoRef.current) {
        // Log pointer values to debug
        console.log("Pointer X (RotatingCube):", pointer.x, "Pointer Y (RotatingCube):", pointer.y);
  
        // Scale up the pointer effect to make rotation more noticeable
        logoRef.current.rotation.y = pointer.x * 0.1; // Increase the multiplier for more rotation
        logoRef.current.rotation.x = pointer.y * 0.1;
      }
    });
  
    return (
      <primitive ref={logoRef} object={scene} scale={0.175} />
    );
  };

  // Handle pointer movement
  const handlePointerMove = (event: ReactPointerEvent) => {
    const { clientX, clientY, currentTarget } = event;
    const { width, height } = currentTarget.getBoundingClientRect();

    // Normalize pointer values between -1 and 1
    const x = (clientX / width) * 2 - 1;
    const y = -(clientY / height) * 2 + 1;

    console.log("Pointer X (handlePointerMove):", x, "Pointer Y (handlePointerMove):", y); // Debugging

    setPointer({ x, y });
  };

  // Scanning Light effect component
  const ScanningLight = () => {
    const lightRef = useRef<THREE.DirectionalLight | null>(null);

    useFrame(({ clock }) => {
      if (lightRef.current) {
        // Create a scanning effect by moving the light position over time
        const time = clock.getElapsedTime(); // Get the elapsed time in seconds
        lightRef.current.position.x = Math.sin(time) * 5; // Move light in the x-direction
        lightRef.current.position.z = Math.cos(time) * 5; // Move light in the z-direction
        // lightRef.current.position.y = Math.cos(time) * 5; // Move light in the y-direction
      }
    });

    return (
      <directionalLight
        ref={lightRef}
        color={"#ffffff"} // Light color (you can adjust this)
        intensity={10}   // Light intensity (adjust as needed)
        position={[5, 5, 5]} // Initial position of the light
        castShadow
      />
    );
  };

  return (
    <section className="relative" style={sectionStyle}>
      <PageIllustration />
      {/* <div
        style={{ position: "relative", height: "100vh", overflow: "hidden", pointerEvents: "auto" }}
        onPointerMove={handlePointerMove}
      > */}
        {/* 3D Logo Container */}
        {/* <div className="absolute z-1 h-1/5 w-6/12 left-0 top-20">
          <Spline
            scene="https://prod.spline.design/jZ9pmRNBxzmrlmYH/scene.splinecode" 
          />
        </div> */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {/* Hero content */}
            <div className="pb-12 pt-32 md:pb-20 md:pt-40">
              {/* Section header */}
              <div className="pb-12 text-center md:pb-16">
                <div
                  className="mb-6 border-y [border-image:linear-gradient(to_right,transparent,theme(colors.stone.300/.8),transparent)1]"
                  data-aos="zoom-y-out"
                >
                  <div className="-mx-0.5 flex justify-center -space-x-3">
                    <span className="rounded-full bg-gradient-to-r from-orange-400/80 to-orange-600/80 px-2 text-white">
                      AI model coming soon!
                    </span>
                  </div>
                </div>
                <h1
                  className="mb-6 border-y text-5xl font-semibold [border-image:linear-gradient(to_right,transparent,theme(colors.stone.300/.8),transparent)1] md:text-6xl"
                  data-aos="zoom-y-out"
                  data-aos-delay={150}
                >
                  Web3 Attribution <br className="max-lg:hidden" />
                  <span className="font-light">Powered by AI</span>
                </h1>
                <div className="mx-auto max-w-3xl">
                  <p
                    className="mb-8 text-lg font-light text-gray-700"
                    data-aos="zoom-y-out"
                    data-aos-delay={300}
                  >
                    Know where your users came from, what they're doing, and
                    why.
                  </p>
                  <div className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.stone.300/.8),transparent)1]">
                    <div
                      className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                      data-aos="zoom-y-out"
                      data-aos-delay={450}
                    >
                      <a
                        className="btn group mb-4 w-full bg-gradient-to-r from-orange-400 to-orange-600 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                        href="https://ads.clickinsights.xyz/contact"
                      >
                        <span className="relative inline-flex items-center">
                          Request Demo{" "}
                          <span className="ml-1 tracking-normal text-orange-100 transition-transform group-hover:translate-x-0.5">
                            <svg
                              width={20}
                              height={20}
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 18L15 12L9 6"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </span>
                        </span>
                      </a>
                      <a
                        className="btn w-full bg-white text-stone-800 shadow hover:bg-stone-50 sm:ml-4 sm:w-auto"
                        href="https://ads.clickinsights.xyz"
                        target="_blank"
                      >
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* Hero image */}
              <div
                className="mx-auto max-w-3xl"
                data-aos="zoom-y-out"
                data-aos-delay={600}
              >
                <div className="relative aspect-video rounded-2xl bg-stone-900 px-5 py-3 shadow-xl before:pointer-events-none before:absolute before:-inset-5 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.stone.300/.8),transparent)1] after:absolute after:-inset-5 after:-z-10 after:border-x after:[border-image:linear-gradient(to_bottom,transparent,theme(colors.stone.300/.8),transparent)1]">
                  <div className="relative mb-8 flex items-center justify-between before:block before:h-[9px] before:w-[41px] before:bg-[length:16px_9px] before:[background-image:radial-gradient(circle_at_4.5px_4.5px,_theme(colors.stone.600)_4.5px,_transparent_0)] after:w-[41px]">
                    <span className="text-[13px] font-medium text-white">
                      luciaprotocol.com
                    </span>
                  </div>
                  <div className="font-mono text-gray-500 [&_span]:opacity-0">
                    <span className="animate-[code-1_10s_infinite] text-gray-400">
                      // terminal
                    </span>
                    <br />
                    <span className="animate-[code-1_10s_infinite] text-gray-200">
                      npm install luciasdk-t3
                    </span>
                    <br />
                    <span className="animate-[code-2_10s_infinite]">
                      Package successfully installed.
                    </span>
                    <br />
                    <br />
                    <span className="animate-[code-3_10s_infinite] text-gray-400">
                      // app.js
                    </span>
                    <br />
                    <span className="animate-[code-3_10s_infinite] text-gray-200 flex flex-inline gap-2">
                      <div className="text-orange-400">import</div>
                      <div className="text-green-300">'lucia.js'</div>;
                    </span>
                    <br />
                    <br />
                    <span className="animate-[code-4_10s_infinite] text-gray-400">
                      // page.js
                    </span>
                    <br />
                    <span className="animate-[code-4_10s_infinite] text-gray-200 flex flex-inline gap-2">
                      <div className="text-orange-400">import</div> LuciaSDK
                      <div className="text-orange-400">from</div>
                      <div className="text-green-300">'lucia-t3'</div>;
                    </span>
                    <br />
                    <span className="animate-[code-5_10s_infinite] text-gray-200 flex flex-inline">
                      {"LuciaSDK"}
                      <div className="text-orange-400">.</div>
                      <div className="text-orange-300">init</div>
                      <div className="text-yellow-400">{"("}</div>
                      <div className="text-purple-400">{"{"}</div>
                    </span>
                    <br />
                    <span className="animate-[code-6_10s_infinite] text-gray-200 flex flex-inline gap-2">
                      baseURL:
                      <div className="text-green-300">
                        'https://api.clickinsights.xyz'
                      </div>
                      ,
                    </span>
                    <br />
                    <span className="animate-[code-6_10s_infinite]">
                      // Get your API Key from https://ads.clickinsights.xyz
                    </span>
                    <br />
                    <span className="animate-[code-6_10s_infinite] text-gray-200 flex flex-inline gap-2">
                      api_key:
                      <div className="text-green-300">'your-api-here'</div>,
                    </span>
                    <br />
                    <span className="animate-[code-5_10s_infinite] text-gray-200 flex flex-inline">
                      <div className="text-purple-400">{"}"}</div>
                      <div className="text-yellow-400">{")"}</div>;
                    </span>
                  </div>
                </div>
              </div>
              {/* Read docs button */}
              <div className="relative mt-8 before:absolute before:inset-0">
                <div
                  className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay={450}
                >
                  <a
                    className="btn w-full outline outline-offset-2 outline-1 outline-slate-300 bg-transparent text-stone-800 shadow hover:drop-shadow-lg hover:outline-4 hover:outline-orange-500 hover:bg-orange-50 sm:ml-4 sm:w-auto"
                    href="https://docs.luciaprotocol.com/"
                    target="_blank"
                  >
                    Read Docs
                  </a>
                </div>
              </div>
              <BusinessCategories />
            </div>
          </div>
          <LogoSection />
        </div>
      {/* </div> */}
    </section>
  );
}
