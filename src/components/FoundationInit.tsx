"use client";

import { useEffect } from "react";
import $ from "jquery";

export default function FoundationInit() {
  useEffect(() => {
    // Import Foundation JS dynamically only on client-side
    const loadFoundation = async () => {
      if (typeof window !== "undefined") {
        // Assign jQuery to window for Foundation to use
        window.$ = window.jQuery = $;
        
        // Import Foundation
        const foundation = await import("foundation-sites");
        
        // Initialize Foundation
        $(document).foundation();
      }
    };
    
    loadFoundation();
  }, []);
  
  return null;
}