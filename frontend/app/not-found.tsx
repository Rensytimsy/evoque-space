"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function PageNotFound() {
  return (
    <div className="h-screen flex justify-center align-center">
      <div className="mt-[50%] lg:mt-[8%]">
        <div >
        <DotLottieReact
         src="/page_not_found.json"
          loop
           autoplay 
           height={500}
           width={500}
           />
        </div>
        <div className="flex justify-center">
            <a href="/home" className="text-[var(--teal-dark-light)] underline">
                Page not found, return to home page
            </a>
        </div>
      </div>
    </div>
  );
}
