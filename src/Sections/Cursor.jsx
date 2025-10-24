
import React, { useEffect, useRef } from "react";
import "../styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const cursorPosRef = useRef({ x: 0, y: 0 });
  const trailPosRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef();

  useEffect(() => {
    document.body.classList.add("no-cursor");
    
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    
    const moveCursor = (e) => {
      cursorPosRef.current = { x: e.clientX, y: e.clientY };
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    const animateTrail = () => {
      const cursorPos = cursorPosRef.current;
      const trailPos = trailPosRef.current;
      
      // Smooth trail follow with easing
      trailPos.x += (cursorPos.x - trailPos.x) * 0.2;
      trailPos.y += (cursorPos.y - trailPos.y) * 0.2;
      
      trail.style.left = trailPos.x + "px";
      trail.style.top = trailPos.y + "px";
      
      animationRef.current = requestAnimationFrame(animateTrail);
    };

    window.addEventListener("mousemove", moveCursor);
    animationRef.current = requestAnimationFrame(animateTrail);
    
    return () => {
      document.body.classList.remove("no-cursor");
      window.removeEventListener("mousemove", moveCursor);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={trailRef} className="cursor-trail"></div>
    </>
  );
};

export default Cursor;