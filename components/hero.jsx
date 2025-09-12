"use client"
import React, { useEffect } from "react";
import { useRef } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
const HeroSection = () => {
    const ImageRef = useRef(null);

    useEffect(() => {
        const imageElement = ImageRef.current;
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;
            if (scrollPosition > scrollThreshold) {
                imageElement.classList.add("scrolled");
            }else{
                imageElement.classList.remove("scrolled");
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);
    return (
        <section className="w-full pt-36 md:pt-48 pb-10">
            <div className="space-y-6 text-center">
                <div className="space-y-6 mx-auto">
                    <h1 className="gradient-text font-extrabold tracking-tighter text-5xl md:text-6xl lg:text-7xl xl:text-8xl pb-2 pr-2">
                        Your AI Carrer Coach for
                        <br />
                        Proffesional Growth
                    </h1>
                    <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                        Advance your career with AI-powered tools for resume building, cover letter creation, and interview preparation.
                    </p>
                </div>
                <Link href="/dashboard">
                    <Button size="lg" className="px-8">
                        Get Started
                    </Button>
                </Link>
            </div>
            <div className="hero-image-wrapper mt-5 md:mt-0">
                <div ref={ImageRef} className="hero-image">
                    <Image
                        src="/banner.jpeg"
                        width={1280}
                        height={720}
                        alt="Banner Image"
                        className="rounded-lg shadow-2xl border mx-auto mt-10"
                        priority={true}
                    />
                </div>
            </div>
        </section>
    );
}
export default HeroSection;