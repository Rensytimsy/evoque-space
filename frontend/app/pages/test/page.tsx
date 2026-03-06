"use client"

import { useState, useEffect, useRef } from "react";

export default function TestPage(){
    return (
        <div className="relative w-full min-h-[600px] overflow-hidden flex items-center">
      
      {/* 1. The Left/Bottom Triangle (Base Layer) */}
      <div className="absolute inset-0 bg-[var(--teal-dark-dark)]" />

      {/* 2. The Right/Top Triangle (Clipped Layer) */}
      <div 
        className="absolute inset-0 bg-[var(--teal-light)]"
        style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
      />

      {/* 3. Your Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-2">
        <div className="text-white">
          <h2 className="text-4xl font-bold">Left Content</h2>
          <p>This area sits over the dark teal.</p>
        </div>
        <div className="text-[var(--teal-dark-dark)] text-right">
          <h2 className="text-4xl font-bold">Right Content</h2>
          <p>This area sits over the light teal.</p>
        </div>
      </div>
    </div>
    )
}